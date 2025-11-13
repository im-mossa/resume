// src/controllers/categoriesController.ts
import type { Request, Response } from 'express';
import { getCategoriesTree } from '../services/categoriesService.js';
import logger from '../logger.js';

export async function getCategoriesTreeHandler(req: Request, res: Response) {
    let includeInactive: boolean = false;
    try {
        const q = (req as any).validatedQuery!;
        includeInactive = Boolean(q.include_inactive);
        const tree = await getCategoriesTree(includeInactive);

        return res.json({ error: false, data: tree });
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
            'GET /api/v1/categories/tree failed'
        );
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
}
