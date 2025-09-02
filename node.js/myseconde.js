const http = require('http');
const fs = require('fs');
const path = require('path');
const { url } = require('inspector');
const { error } = require('console');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:9090'
];

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg'
};

let todos = [];

// تابع تنظیم هدرهای CORS
function applyCORS(res, origin) {
    if (!ALLOWED_ORIGINS.includes(origin)) return;
    // 'access-control-allow-origin': '*' //به همه ی دامنه ها اجازه می دهد که پاسخ را دریافت کنند. توصیه می شود این کار را نکنید
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
}

const server = http.createServer((req, res) => {
    const { method, url, headers } = req;
    const origin = headers.origin;
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    applyCORS(res, origin);

    // 1. پاسخ به درخواست preflight (OPTIONS)
    if (method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    // 2. ریدایرکت مسیر خاص
    if (method === 'GET' && url === '/aboutUs.html') {
        res.writeHead(301, { Location: '/about.html' });
        return res.end();
    }

    // API: GET /todos
    if (method === 'GET' && url === '/todos') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(todos));
    }

    // API: POST /todos
    if (method === 'POST' && url === '/todos') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            try {
                const newTodo = JSON.parse(body);
                newTodo.id = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
                todos.push(newTodo);
                res.writeHead(201, { 'content-type': 'application/json' });
                return res.end(JSON.stringify(todos));
            } catch {
                res.writeHead(400, { 'content-type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        return;
    }


    // API: PUT /todos
    if (method === 'PUT' && parsedUrl.pathname.startsWith('/todos/')) {
        const id = Number(parsedUrl.pathname.split('/')[2]);
        if (isNaN(id)) {
            console.log('id not a number!');
            return;
        }
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            try {
                const updatedTodo = JSON.parse(body);
                const index = todos.findIndex(t => t.id === id);
                if (index === -1) {
                    res.writeHead(400, { 'content-type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Todo not found!' }));
                } else {
                    todos[index] = { ...todos[index], ...updatedTodo };
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(todos));
                }
            } catch (error) {
                res.writeHead(400, { 'content-type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }

    // 3. تعیین مسیر فایل استاتیک
    let requestedPath = url === '/' ? '/index.html' : url;
    let filePath = path.join(PUBLIC_DIR, requestedPath);
    let ext = path.extname(filePath) || '.html';
    let contentType = MIME_TYPES[ext] || 'application/octet-stream';
    if (!filePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403);
        return res.end('Forbidden');
    }

    // 4. خواندن و ارسال فایل
    fs.readFile(filePath, (err, data) => {
        // 4.1 خطای فایل پیدا نشد
        if (err && err.code === 'ENOENT') {
            const notFoundPage = path.join(PUBLIC_DIR, '404.html');
            return fs.readFile(notFoundPage, (nfErr, nfData) => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(nfData || '<h1>404 Not Found</h1>');
            });
        }

        // 4.2 خطای داخلی سرور
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end(`Server Error: ${err.message}`);
        }

        if (method === 'GET') {
            // 4.3 ارسال موفق پاسخ
            res.writeHead(200, {
                'Content-Type': contentType,
                'Content-Length': Buffer.byteLength(data),
                // 'transfer-encoding': 'chunked',  //اگر نوع ارتباط به صورت استریم باشد یا مقدار دیتا به صورت لحظه ای تغییر کند به جای کانتنت لنز از این استیتمنت استفاده می کنیم
                'Cache-Control': 'public, max-age=86400',
                'X-Powered-By': 'node.js',  //توصیه می شود که این بخش در بخش پروداکشن نباشد چون اطلاعاتی مفیدی به هکر می دهد که حمله ی هدفمند انجام دهد
                'Set-Cookie': 'sessionid=abc123; HttpOnly; Secure; SameSite=Strict; Max-Age=3600'
            });
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
