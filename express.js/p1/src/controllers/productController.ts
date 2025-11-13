// src/controllers/productController.ts
import type { Request, Response } from 'express';
import { getProductDetails } from '../services/productService.js';
import logger from '../logger.js';

export async function getProductHandler(req: Request, res: Response) {
    try {
        const params = (req as any).validatedParams!;
        const query = (req as any).validatedQuery!;
        const idOrSlug: string = params.idOrSlug;
        const category: string | undefined = query.category;

        const result = await getProductDetails(idOrSlug, category);

        if (result === null) {
            return res.status(404).json({ error: true, code: 'NOT_FOUND', message: 'Product not found' });
        }

        return res.json({ error: false, data: result });
    } catch (err: any) {
        if (err?.message === 'INVALID_CATEGORY') {
            return res.status(400).json({ error: true, code: 'INVALID_CATEGORY', message: 'Product is not in the requested category' });
        }
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
            'GET /api/v1/product error failed'
        );
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
}
