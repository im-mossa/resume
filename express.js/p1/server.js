// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

app.set('trust proxy', true);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    logger.info({ method: req.method, url: req.originalUrl, ip: req.ip }, 'Incoming request');
    next();
});

// فقط مسیرهای API را تعریف کن
app.get('/api/status', (req, res) => {
    res.json({
        status: 'operational',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        nodeVersion: process.version,
        protocol: req.protocol,
        secure: req.secure,
        clientIp: req.ip
    });
});

// 404 برای مسیرهای غیر API
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// error handler
app.use((err, req, res, next) => {
    logger.error({ err, method: req.method, url: req.originalUrl }, 'Unhandled error');
    if (res.headersSent) return next(err);
    res.status(500).json({ error: 'Something went wrong' });
});

const server = http.createServer(app);

process.on('unhandledRejection', (reason) => logger.error({ reason }, 'Unhandled Rejection'));
process.on('uncaughtException', (error) => {
    logger.error({ error }, 'Uncaught Exception');
    process.exit(1);
});

const gracefulShutdown = (signal) => {
    logger.info(`Received ${signal}. Shutting down...`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000);
};
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

server.listen(PORT, HOST, (err) => {
    if (err) { logger.error({ err }, 'Server failed to start'); process.exit(1); }
    logger.info(`API server listening on http://${HOST}:${PORT}`);
});

// استفاده از خط فرمان برای تست api
// curl -k https://localhost:3000/