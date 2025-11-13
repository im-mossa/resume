// src/controllers/brandsController.ts
import type { Request, Response } from 'express';
import { listProductsByBrand } from '../services/brandsService.js';
import logger from '../logger.js';

export async function getBrandProductsHandler(req: Request, res: Response) {
    const params = (req as any).validatedParams!;
    const query = (req as any).validatedQuery!;

    const { slug } = params;
    const { page, limit, sort } = query;

    try {
        const result = await listProductsByBrand(slug, page, limit, sort);
        if (result.notFound) return res.status(404).json({ error: true, code: 'NOT_FOUND', message: 'Brand not found' });

        return res.json({ error: false, data: { brand: result.brand, items: result.items, meta: result.meta } });
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
            'GET /brands/:slug/products failed'
        );
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
}
