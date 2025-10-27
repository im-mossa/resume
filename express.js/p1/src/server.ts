// src/server.ts
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import helmet from 'helmet';
import cors from 'cors';
import logger from './logger.js';
import ordersRouter from './routes/orders.js';
import productsRouter from './routes/products.js';
import productRouter from './routes/product.js';
import categoriesProducts from './routes/categoriesProducts.js';
import categories from './routes/categories.js';
import brandsRouter from './routes/brands.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);
const HOST: string = process.env.HOST || '127.0.0.1';

app.set('trust proxy', true);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/products', productsRouter);
//https://localhost/api/v1/products?brand=men_pama,another_brand&page=1&limit=12
//https://localhost/api/v1/products
app.use('/api/v1/product', productRouter);
//https://localhost/api/v1/product/00000000-0000-0000-0000-000000000010
// https://localhost/api/v1/product/00000000-0000-0000-0000-000000000010?category=d67a4daf-03f0-4cae-8f80-139bb660e683
app.use('/api/v1/categories', categoriesProducts);
//https://localhost/api/v1/categories/d67a4daf-03f0-4cae-8f80-139bb660e683/products?page=1&limit=20
app.use('/api/v1/categories', categories);
// https://localhost/api/v1/categories/tree
app.use('/api/v1/brands', brandsRouter);
// https://localhost/api/v1/brands/pama/products?page=1&limit=24&sort=manual

// request logger middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
    logger.info({ method: req.method, url: req.originalUrl, ip: req.ip }, 'Incoming request');
    next();
});

// only API routes
app.get('/api/status', (req: Request, res: Response) => {
    res.json({
        status: 'operational',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        nodeVersion: process.version,
        protocol: req.protocol,
        secure: req.secure,
        clientIp: req.ip,
    });
});

// 404 for non-API routes
app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found' });
});

// error handler
// app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
//     logger.error({ err, method: req.method, url: req.originalUrl }, 'Unhandled error');
//     if (res.headersSent) return next(err);
//     res.status(500).json({ error: 'Something went wrong' });
// });
app.use(errorHandler);


const server = http.createServer(app);

process.on('unhandledRejection', (reason: unknown) => logger.error({ reason }, 'Unhandled Rejection'));
process.on('uncaughtException', (error: Error) => {
    logger.error({ error }, 'Uncaught Exception');
    process.exit(1);
});

const gracefulShutdown = (signal: string) => {
    logger.info(`Received ${signal}. Shutting down...`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000);
};
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

server.listen(PORT, HOST, (err?: Error) => {
    if (err) {
        logger.error({ err }, 'Server failed to start');
        process.exit(1);
    }
    logger.info(`API server listening on http://${HOST}:${PORT}`);
});
