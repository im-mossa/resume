// src/controllers/brandsController.ts
import type { Request, Response } from 'express';
import { listProductsByBrand } from '../services/brandsService.js';
import logger from '../logger.js';

export async function getBrandProductsHandler(req: Request, res: Response) {
    try {
        const params = (req as any).validatedParams ?? {};
        const query = (req as any).validatedQuery ?? {};

        const slug: string = params.slug;
        const page: number = query.page ?? 1;
        const limit: number = query.limit ?? 24;
        const sort = (query.sort ?? 'newest') as 'manual' | 'price_asc' | 'price_desc' | 'newest';

        const result = await listProductsByBrand(slug, page, limit, sort);
        if (result.notFound) return res.status(404).json({ error: true, code: 'NOT_FOUND', message: 'Brand not found' });

        return res.json({ error: false, data: { brand: result.brand, items: result.items, meta: result.meta } });
    } catch (err) {
        logger.error({ err, req: { params: req.params, query: req.query } }, 'GET /brands/:slug/products failed');
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
}
