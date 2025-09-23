const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet'); // Security middleware
const logger = require('./logger');
require('dotenv').config();

// Create Express app
const app = express();

// Security middleware
app.use(helmet());

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url }, 'Incoming request');
  next();
});

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public'), {
    dotfiles: 'ignore',
    etag: true,
    extensions: ['html', 'htm'],
    index: 'index.html',
    maxAge: '1d',
    redirect: true
}));

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Secure Express Server</h1>');
});

app.get('/api/status', (req, res) => {
    res.json({
        status: 'operational',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        nodeVersion: process.version
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    // console.error(err.stack);
    logger.error({ err }, 'Unhandled error');
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// SSL/TLS options
const sslOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    // Enable HTTP/2 if available
    allowHTTP1: true,
    // Recommended security options
    minVersion: 'TLSv1.2',
    ciphers: [
        'TLS_AES_256_GCM_SHA384',
        'TLS_CHACHA20_POLY1305_SHA256',
        'TLS_AES_128_GCM_SHA256',
        'ECDHE-RSA-AES128-GCM-SHA256',
        '!DSS',
        '!aNULL',
        '!eNULL',
        '!EXPORT',
        '!DES',
        '!RC4',
        '!3DES',
        '!MD5',
        '!PSK'
    ].join(':'),
    honorCipherOrder: true
};

// Create HTTPS server
const PORT = process.env.PORT || 3000;
const server = https.createServer(sslOptions, app);

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    // Perform cleanup and exit if needed
    process.exit(1);
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
    logger.info(`\nReceived ${signal}. Shutting down gracefully...`);

    server.close(() => {
        logger.info('HTTP server closed.');
        // Close database connections, etc.
        process.exit(0);
    });

    // Force close server after 10 seconds
    setTimeout(() => {
        logger.warn('Forcing shutdown...');
        process.exit(1);
    }, 10000);
};

// Listen for shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start the server
const HOST = process.env.HOST || '0.0.0.0';
server.listen(PORT, HOST, () => {
    logger.info(`Express server running at https://${HOST}:${PORT}`);
    logger.info('Environment:'+ (process.env.NODE_ENV || 'development'));
    logger.info('Press Ctrl+C to stop the server');
});