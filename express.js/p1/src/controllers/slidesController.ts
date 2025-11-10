// src/controllers/slidesController.ts
import type { Request, Response } from 'express';
import { listSlides } from '../services/slidesService.js';

export async function getSlidesHandler(req: Request, res: Response) {
    // prefer middleware-parsed values
    const q = (req as any).validatedQuery ?? req.query;
    const position = q.position;
    const device = q.device;
    const country = q.country;
    const limit = q.limit ?? 10;

    try {
        const slides = await listSlides(position, device, country, Number(limit));
        return res.json({ error: false, data: slides });
    } catch (err) {
        console.error('GET /api/v1/slides error', err);
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
}
