// src/controllers/brandsController.ts
import type { Request, Response } from 'express';
import { paramsSchema, querySchema } from '../schemas/brands.js';
import { listProductsByBrand } from '../services/brandsService.js';
import logger from '../logger.js';

export async function getBrandProductsHandler(req: Request, res: Response) {
    // if middleware provided validated params/query they are *already parsed values*
    // otherwise we use zod.parse (which returns parsed value or throws)
    const params = (req as any).validatedParams ?? paramsSchema.parse(req.params);
    const query = (req as any).validatedQuery ?? querySchema.parse(req.query);

    // params and query are the parsed objects (not { data })
    const { slug } = params;
    const { page, limit, sort } = query;

    try {
        const result = await listProductsByBrand(slug, page, limit, sort);
        if (result.notFound) return res.status(404).json({ error: true, code: 'NOT_FOUND', message: 'Brand not found' });

        return res.json({ error: false, data: { brand: result.brand, items: result.items, meta: result.meta } });
    } catch (err: unknown) {
        logger.error({ err, slug, page, limit, sort }, 'GET /brands/:slug/products failed');
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
}
