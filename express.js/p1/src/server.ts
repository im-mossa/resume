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
import slidesRouter from './routes/slides.js';
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
app.use('/api/v1/product', productRouter);
app.use('/api/v1/categories', categoriesProducts);
app.use('/api/v1/categories', categories);
app.use('/api/v1/brands', brandsRouter);
// https://localhost/api/v1/brands/nazari/products?page=1&limit=24&sort=manual
// https://localhost/api/v1/products?brand=pama,nazari&page=1&limit=12
app.use('/api/v1/slides', slidesRouter);
// https://localhost/api/v1/slides?position=home_hero&device=mobile&country=IR

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
