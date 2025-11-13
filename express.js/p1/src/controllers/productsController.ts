// src/controllers/productsController.ts
import { Request, Response } from 'express';
import { listProducts } from '../services/productsService.js';
import logger from '../logger.js';

export async function listProductsController(req: Request, res: Response) {
    try {
        const q = (req as any).validatedQuery!; // set by validateQuery middleware
        const { page = 1, limit = 20, search, category_id, brand, sort_by, order } = q;

        const result = await listProducts({ page, limit, search, category_id, brand, sort_by, order });

        return res.json({ error: false, data: { items: result.items, meta: result.meta } });
    } catch (err: unknown) {
        const q = (req as any).validatedQuery!;
        const errPayload = err instanceof Error ? { message: err.message, stack: err.stack } : err;
        logger.error(
            {
                err: errPayload,
                query: q,
                url: req.originalUrl,
                ip: req.ip
            },
            'GET /api/v1/products failed'
        );
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
}
