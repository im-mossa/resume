const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const ALLOWED_ORIGINS = new Set([
    'http://localhost:3000',
    'http://localhost:9090'
]);
let todos = [];

// تابع تنظیم هدرهای CORS
function setCommonHeaders(res, origin) {
    if (ALLOWED_ORIGINS.has(origin)) {
        // 'access-control-allow-origin': '*' //به همه ی دامنه ها اجازه می دهد که پاسخ را دریافت کنند. توصیه می شود این کار را نکنید
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// ارسال پاسخ خطای جیسون
function sendJson(res, statusCode, payload) {
    const str = JSON.stringify(payload);
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(str)
    });
    res.end(str);
}

// کوچکترین روتر برای ای پی آی
function handleApi(req, res, parsedUrl) {
    const { method } = req;
    const pathname = parsedUrl.pathname;

    // 1. پاسخ به درخواست preflight (OPTIONS)
    if (method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    // API: GET /todos
    if (method === 'GET' && pathname === '/todos') {
        return sendJson(res, 200, todos);
    }

    // API: POST /todos
    if (method === 'POST' && pathname === '/todos') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const newTodo = JSON.parse(body);
                newTodo.id = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
                todos.push(newTodo);
                return sendJson(res, 201, todos);
            } catch {
                return sendJson(res, 400, { error: 'Invalid JSON' });
            }
        });
        return;
    }

    // API: PUT /todos
    const match = pathname.match(/^\/todos\/(\d+)$/);
    if (method === 'PUT' && match) {
        const id = Number(match[1]);
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
                const updates = JSON.parse(body);
                const idx = todos.findIndex(t => t.id === id);
                if (idx < 0) {
                    return sendJson(res, 404, { error: 'Todo not found!' });
                }
                todos[idx] = { ...todos[idx], ...updates };
                return sendJson(res, 200, todos);
            } catch (error) {
                return sendJson(res, 400, { error: 'Invalid JSON' });
            }
        });
        return;
    }
    return false;
}

// ارسال فایل استاتیک
function serveStatic(req, res, requestedPath) {
    const filePath = path.normalize(path.join(PUBLIC_DIR, requestedPath));
    if (!filePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403);
        return res.end('Forbidden');
    }

    fs.stat(filePath, (err, stats) => {
        // 1. خطاهای I/O
        if (err) {
            if (err.code === 'ENOENT') {
                // 404 صفحه
                const notFoundPage = path.join(PUBLIC_DIR, '404.html');
                return fs.readFile(notFoundPage, (nfErr, nfData) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(nfData || '<h1>404 Not Found</h1>');
                });
            }
            // 500 خطای داخلی
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end(`Server Error: ${err.message}`);
        }

        // 2. بررسی اینکه مسیر فایل است
        if (!stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end('<h1>404 Not Found</h1>');
        }

        // 3. تعیین MIME و هدرها
        const contentType = mime.lookup(filePath) || 'application/octet-stream';
        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=86400',
            'Content-Length': stats.size
            // حذف Set-Cookie از فایل‌های استاتیک در موارد production توصیه می‌شود
        });

        // 4. استریم فایل
        fs.createReadStream(filePath).pipe(res);
    });
}

const server = http.createServer((req, res) => {
    const origin = req.headers.origin || '';
    setCommonHeaders(res, origin);
    // parse URL
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    // 2. ریدایرکت مسیر خاص
    if (req.method === 'GET' && pathname === '/aboutUs.html') {
        res.writeHead(301, { Location: '/about.html' });
        return res.end();
    }

    // API handle
    if (handleApi(req, res, parsedUrl) !== false) {
        return;
    }

    // 3. تعیین مسیر فایل استاتیک
    const reqPath = (pathname === '/' ? '/index.html' : pathname);
    serveStatic(req, res, reqPath);
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
