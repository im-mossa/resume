// src/controllers/categoriesProductsController.ts
import type { Request, Response } from 'express';
import { listProductsByCategory } from '../services/categoriesProductsService.js';
import logger from '../logger.js';

export async function getCategoryProductsHandler(req: Request, res: Response) {
    try {
        const params = (req as any).validatedParams!;
        const query = (req as any).validatedQuery!;
        const categoryId: string = params.id;
        const page: number = query.page ?? 1;
        const limit: number = query.limit ?? 20;

        const result = await listProductsByCategory(categoryId, page, limit);

        return res.json({ error: false, data: { items: result.items, meta: result.meta } });
    } catch (err: unknown) {
        const p = (req as any).validatedParams!;
        const q = (req as any).validatedQuery!;
        const errPayload = err instanceof Error ? { message: err.message, stack: err.stack } : err;
        logger.error(
            {
                err: errPayload,
                params: p,
                query: q,
                url: req.originalUrl,
                ip: req.ip
            },
            'GET /api/v1/categories/:id/products failed'
        );
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
}
