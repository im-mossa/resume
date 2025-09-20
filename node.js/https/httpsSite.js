const https = require('https');
const { randomBytes, constants } = require('crypto');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const { pipeline } = require('stream');
const { promisify } = require('util');
// const ocsp = require('ocsp');

const accessAsync = promisify(fs.access);
const statAsync = promisify(fs.stat);

// Start the server on port 3000 (HTTPS default is 443 but requires root)
const {
    PORT = 3000,
    HOST = '0.0.0.0',
    CERT_PATH = './cert.pem',
    KEY_PATH = './key.pem',
} = process.env;
const PUBLIC_DIR = path.resolve(__dirname, 'public');
const ALLOWED_ORIGINS = new Set([
    'http://localhost:3000',
    'http://localhost:9090'
]);

// برای زنجیره ی گواهی از روش زیر استفاده می کنند
//const ca = [
//     fs.readFileSync(path.join(__dirname, 'chain.pem'))
// ];

// Path to your SSL/TLS certificate and key
const options = {
    key: fs.readFileSync(path.resolve(__dirname, KEY_PATH)),
    cert: fs.readFileSync(path.resolve(__dirname, CERT_PATH)),
    // ca,
    //ticketKeys: randomBytes(48), // کلید رمزنگاری بلیت‌ها
    //sessionTimeout: 300, // مدت اعتبار جلسه
    // Enable all security features
    minVersion: 'TLSv1.2',
    maxVersion: 'TLSv1.3',
    ciphers: [
        'TLS_AES_256_GCM_SHA384',
        'TLS_CHACHA20_POLY1305_SHA256',
        'TLS_AES_128_GCM_SHA256',
        'ECDHE-ECDSA-AES256-GCM-SHA384',
        'ECDHE-RSA-AES256-GCM-SHA384',
        'ECDHE-ECDSA-CHACHA20-POLY1305',
        'ECDHE-RSA-CHACHA20-POLY1305',
        'ECDHE-ECDSA-AES128-GCM-SHA256',
        'ECDHE-RSA-AES128-GCM-SHA256'
    ].join(':'),
    // برای سازمان هایی که علاوه بر سرور, کلاینت هم باید گواهی داشته باشد از کد زیر استفاده می شود
    honorCipherOrder: true,
    // rejectUnauthorized: true,

    // Enable secure renegotiation
    secureOptions:
        constants.SSL_OP_NO_SSLv3 |
        constants.SSL_OP_NO_TLSv1 |
        constants.SSL_OP_NO_TLSv1_1 |
        constants.SSL_OP_CIPHER_SERVER_PREFERENCE,
    ticketKeys: randomBytes(48),
}

// برای استفاده از کد زیر باید از فریم ورک استفاده کنید مثل هلمت
// Enable HSTS preload

// app.use(helmet.hsts({
//     maxAge: 63072000,
//     includeSubDomains: true,
//     preload: true
// }));

const server = https.createServer(options, async (req, res) => {
    try {
        applySecurityHeaders(req, res);
        const url = new URL(req.url, `https://${req.headers.host}`);

        if (url.pathname === '/csp-report' && req.method === 'POST') {
            await handleCspReport(req, res);
            return;
        }

        await serveStaticFile(url.pathname, res);
    } catch (err) {
        console.error('Request error:', err);
        if (!res.headersSent) {
            res.writeHead(err.statusCode || 500, { 'Content-Type': 'text/plain' });
            res.end(err.message || 'Internal Server Error');
        }
    }
});

function applySecurityHeaders(req, res) {
    const origin = req.headers.origin || '';
    if (!ALLOWED_ORIGINS.has(origin)) return;
    // Security headers
    const headers = {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',  //مجاز برای خود سایت میشود SAMEORIGIN
        // برای تشخیص مواردی که هدر سی اس پی مسدود کرده است
        'Content-Security-Policy-Report-Only': "default-src 'self'; script-src 'self'; style-src 'self'; report-uri /csp-report",
        'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self';",
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(self), microphone=(), camera=()',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };

    for (const [key, value] of Object.entries(headers)) {
        res.setHeader(key, value);
    };
}

async function handleCspReport(req, res) {
    let body = '';
    for await (const chunk of req) {
        body += chunk;
    }
    console.log('CSP Report:', body);
    res.writeHead(204);
    res.end();
}

async function serveStaticFile(requestPath, res) {
    const pathname = requestPath === '/' ? '/index.html' : requestPath;
    const rawPath = decodeURIComponent(pathname).replace(/^\/+/, '');
    const fullPath = path.normalize(path.resolve(PUBLIC_DIR, rawPath));

    if (!fullPath.startsWith(PUBLIC_DIR)) {
        const err = new Error('Forbidden');
        err.statusCode = 403;
        throw err;
    }

    try {
        await accessAsync(fullPath, fs.constants.R_OK);
    } catch {
        console.log(fullPath);
        const notFoundErr = new Error('404 Not Found');
        notFoundErr.statusCode = 404;
        throw notFoundErr;
    }

    let stats;
    try {
        stats = await statAsync(fullPath);
    } catch {
        const ioErr = new Error('Server Error');
        ioErr.statusCode = 500;
        throw ioErr;
    }

    const contentType = mime.lookup(fullPath) || 'application/octet-stream';
    res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
        'Content-Length': stats.size
    });

    pipeline(
        fs.createReadStream(fullPath),
        res,
        (streamErr) => {
            if (streamErr) console.error('Stream error:', streamErr);
        }
    );
}

// Enable session resumption
// ocsp.getOCSPURI(cert, (err, uri) => {
//     if (err) {
//         console.error('OCSP URI not found:', err);
//         return;
//     }

//     ocsp.request.generate(cert, ca, (err, req) => {
//         if (err) {
//             console.error('Failed to generate OCSP request:', err);
//             return;
//         }

//         ocsp.request.send(uri, req, (err, response) => {
//             if (err) {
//                 console.error('Failed to get OCSP response:', err);
//                 return;
//             }

//             // اتصال پاسخ OCSP به سرور
//             server.setOCSPResponse(response);
//             console.log('OCSP Stapling enabled.');
//         });
//     });
// });

// Handle server errors
server.on('error', (err) => {
    console.error('[SERVER ERROR]', err.message);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    // Perform graceful shutdown
    if (!server.listening) process.exit(1);
    server.close(() => process.exit(1));
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at: ', promise, 'reason: ', reason, 'timestamp: ', new Date().toISOString());
});

process.on('exit', (code) => {
    console.log(`Process exited with code ${code}`);
});

process.on('SIGHUP', () => {
    console.log('Received SIGHUP: Reloading config...');
    // reload logic here
    // کاربرد:یک:ری‌لود کردن فایل تنظیمات بدون خاموش کردن برنامه دو:پاک کردن کش یا ری‌ست کردن سشن سه:به‌روزرسانی تنظیمات امنیتی یا مسیرها
});

// Handle graceful shutdown
let shuttingDown = false;
function setupShutdown() {
    const shutdown = () => {
        if (shuttingDown) return;
        shuttingDown = true;
        console.log('Shutting down...');
        server.close(() => process.exit(0));
        setTimeout(() => process.exit(1), 10000);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}
setupShutdown();

server.listen(PORT, HOST, () => {
    const { address, port } = server.address();
    console.log(`Server running at https://${address}:${port}`);

    // Output server information
    console.log('Node.js version:', process.version);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('PID:', process.pid);
    console.log('Press Ctrl+C to stop the server');
});

// برای تست در curl

// # Skip certificate verification (for self-signed certs)
// curl -k https://localhost:3000
// curl --insecure https://localhost:3000

// # With certificate verification (for trusted certs)
// curl --cacert /path/to/ca.pem https://yourdomain.com