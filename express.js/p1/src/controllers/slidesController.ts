// src/controllers/slidesController.ts
import type { Request, Response } from 'express';
import { listSlides } from '../services/slidesService.js';
import logger from '../logger.js';

export async function getSlidesHandler(req: Request, res: Response) {
    // prefer middleware-parsed values
    const q = (req as any).validatedQuery!;
    const position = q.position;
    const device = q.device;
    const country = q.country;
    const limit = q.limit ?? 10;

    try {
        const slides = await listSlides(position, device, country, Number(limit));

        return res.json({ error: false, data: slides });
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
            'GET /api/v1/slides error failed'
        );
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
}
