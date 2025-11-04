// src/controllers/categoriesProductsController.ts
import type { Request, Response } from 'express';
import { listProductsByCategory } from '../services/categoriesProductsService.js';

export async function getCategoryProductsHandler(req: Request, res: Response) {
    try {
        const params = (req as any).validatedParams ?? {};
        const query = (req as any).validatedQuery ?? {};
        const categoryId: string = params.id;
        const page: number = query.page ?? 1;
        const limit: number = query.limit ?? 20;

        const result = await listProductsByCategory(categoryId, page, limit);

        return res.json({ error: false, data: { items: result.items, meta: result.meta } });
    } catch (err) {
        console.error('GET /categories/:id/products failed', { categoryId: (req as any).validatedParams?.id, page: req.query.page, limit: req.query.limit, err });
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
}
