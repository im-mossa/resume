// src/controllers/categoriesController.ts
import type { Request, Response } from 'express';
import { getCategoriesTree } from '../services/categoriesService.js';

export async function getCategoriesTreeHandler(req: Request, res: Response) {
    try {
        const q = (req as any).validatedQuery ?? {};
        const includeInactive: boolean = Boolean(q.include_inactive);
        const tree = await getCategoriesTree(includeInactive);
        return res.json({ error: false, data: tree });
    } catch (err) {
        console.error('GET /categories/tree error', err);
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
}
