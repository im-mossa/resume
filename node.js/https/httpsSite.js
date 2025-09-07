const https = require('https');
const { constants } = require('crypto');
const fs = require('fs');
const path = require('path');
const ocsp = require('ocsp');

const key = fs.readFileSync(path.join(__dirname, 'key.pem'));
const cert = fs.readFileSync(path.join(__dirname, 'cert.pem'));
// برای زنجیره ی گواهی از روش زیر استفاده می کنند
//const ca = [
//     fs.readFileSync(path.join(__dirname, 'chain.pem'))
// ];

// Path to your SSL/TLS certificate and key
const options = {
    key,
    cert,
    // ca,
    ticketKeys: crypto.randomBytes(48), // کلید رمزنگاری بلیت‌ها
    sessionTimeout: 300, // مدت اعتبار جلسه
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
    rejectUnauthorized: true,

    // Enable secure renegotiation
    secureOptions:
        require('constants').SSL_OP_NO_SSLv3 |
        require('constants').SSL_OP_NO_TLSv1 |
        require('constants').SSL_OP_NO_TLSv1_1 |
        require('constants').SSL_OP_CIPHER_SERVER_PREFERENCE

}

// برای استفاده از کد زیر باید از فریم ورک استفاده کنید مثل هلمت
// Enable HSTS preload
app.use(helmet.hsts({
    maxAge: 63072000,
    includeSubDomains: true,
    preload: true
}));

// Create the HTTPS server
const server = https.createServer(options, (req, res) => {
    // Security headers
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    // برای تشخیص مواردی که هدر سی اس پی مسدود کرده است
    res.setHeader('Content-Security-Policy-Report-Only', "default-src 'self'; script-src 'self'; style-src 'self'; report-uri /csp-report");
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self';");
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
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
    // Handle different routes
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end('<h1>Welcome to the Secure Server</h1><p>Your connection is encrypted!</p>');
    } else if (req.url === '/api/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
    }
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

// Start the server on port 3000 (HTTPS default is 443 but requires root)
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at https://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});

