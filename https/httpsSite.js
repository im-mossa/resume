const https = require('https');
const { constants } = require('crypto');
const fs = require('fs');
const path = require('path');

const options = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
    minVersion: 'TLSv1.2',
    secureOptions: constants.SSL_OP_NO_SSLv3 |
        constants.SSL_OP_NO_TLSv1 |
        constants.SSL_OP_NO_TLSv1_1
}

https.createServer(options, (req, res) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    // برای تشخیص مواردی که هدر سی اس پی مسدود کرده است
    // res.setHeader('Content-Security-Policy-Report-Only', "default-src 'self'; script-src 'self'; style-src 'self'; report-uri /csp-report");
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self';");
    
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
    res.writeHead(200);
    res.end('<h1>Hello secure world!</h1>');
}).listen(3000);


