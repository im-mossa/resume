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

// تابع تنظیم هدر
function setCommonHeaders(res, origin) {
    if (ALLOWED_ORIGINS.has(origin)) {
        // Security headers
        const securityHeaders = {
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

        Object.entries(securityHeaders).forEach(([key, value]) => {
            res.setHeader(key, value);
        });
    }
}

// ارسال فایل استاتیک
function serveStatic(res, requestedPath) {
    const filePath = path.normalize(path.join(PUBLIC_DIR, requestedPath));
    if (!filePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403);
        return res.end('Forbidden');
    }

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // 404 صفحه
            const notFoundPage = path.normalize(path.join(PUBLIC_DIR, '404.html'));
            return fs.readFile(notFoundPage, (nfErr, nfData) => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                if (nfErr) {
                    // اگر خود صفحه 404 هم خوانده نشد، پیام ساده نشان بده
                    return res.end('<h1>404 Not Found</h1>');
                }
                // در حالت عادی داده‌ی فایل را ارسال کن
                res.end(nfData);
            });
        }

        fs.stat(filePath, (err, stats) => {
            // 1. خطاهای I/O
            if (err) {
                // 500 خطای داخلی
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end(`Server Error: ${err.message}`);
            }

            // 3. تعیین MIME و هدرها
            const contentType = mime.lookup(filePath) || 'application/octet-stream';
            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400',
                'Content-Length': stats.size
            });

            // 4. استریم فایل
            const stream = fs.createReadStream(filePath);

            stream.on('error', (err) => {
                console.error('Error reading file:', err);
                if (!res.headersSent) {
                    res.statusCode = 500;
                    return res.end('Error reading file');
                }
            });
            return stream.pipe(res);
        });
    });
}

// Create the HTTPS server
const server = https.createServer(options, async (req, res) => {
    const origin = req.headers.origin || '';
    setCommonHeaders(res, origin);
    // parse URL
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    // برای اطلاع مواردی که سی اس پی مسدود کرده است را کنسول لاگ می گیرد
    if (req.url === '/csp-report' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            console.log('CSP Violation Report:', body);
            res.writeHead(204); // No Content
            res.end();
        });
        return;
    }

    // API handle
    // if (handleApi(req, res, parsedUrl) !== false) {
    //     return;
    // }

    // 3. تعیین مسیر فایل استاتیک
    const reqPath = (pathname === '/' ? '/index.html' : pathname);
    serveStatic(res, reqPath);
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
});

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

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    // Perform graceful shutdown
    server.close(() => process.exit(1));
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle graceful shutdown
const gracefulShutdown = () => {
    console.log('Shutting down gracefully...');

    const shutdownPromise = new Promise((resolve) => {
        server.close(() => {
            console.log('Server closed');
            resolve(0); // کد خروج موفق
        });
    });

    const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => {
            console.error('Forcing shutdown after timeout...');
            resolve(1); // کد خروج با خطا
        }, 10000); // ۱۰ ثانیه
    });

    Promise.race([shutdownPromise, timeoutPromise])
        .then((exitCode) => {
            process.exit(exitCode);
        });
};

// Listen for shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);



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