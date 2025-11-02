// src/routes/slides.ts
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma.js';

const router = Router();
const BASE_URL = process.env.APP_URL ?? 'https://localhost';

function buildPublicImageUrl(stored: string | null) {
    if (!stored) return null;
    const s = stored.trim();
    if (!s) return null;
    if (s.startsWith('http://') || s.startsWith('https://')) return s;
    const withoutLeading = s.replace(/^\/+/, '');
    return `${BASE_URL.replace(/\/+$/, '')}/static/${withoutLeading}`;
}

const querySchema = z.object({
    position: z.string().optional().default('home_hero'),
    device: z.enum(['mobile', 'desktop']).optional(),
    country: z.string().optional(),
    limit: z.coerce.number().int().positive().optional().default(10),
});

router.get('/', async (req, res) => {
    const q = querySchema.safeParse(req.query);
    if (!q.success) return res.status(400).json({ error: true, code: 'INVALID_QUERY', details: q.error.format() });

    const { position, device, country, limit } = q.data;

    try {
        // basic targeting filter: if targeting JSON has countries/devices arrays, only include slides that either have empty lists or include current value
        // Use SQL to select active slides for position and current time
        const rows: any[] = await prisma.$queryRaw`
      SELECT id, title, subtitle, image_url, target_type, target_value, product_id, position, sort_order, weight, targeting, metadata
      FROM marketing.slides
      WHERE position = ${position}
        AND is_active = true
        AND (start_at IS NULL OR start_at <= now())
        AND (end_at IS NULL OR end_at >= now())
      ORDER BY sort_order ASC, weight DESC, created_at DESC
      LIMIT ${limit}
    `;

        // server-side apply simple targeting rules (device/country) in JS for simplicity
        const filtered = rows.filter(r => {
            if (!r.targeting) return true;
            try {
                const t = typeof r.targeting === 'string' ? JSON.parse(r.targeting) : r.targeting;
                if (country && Array.isArray(t.countries) && t.countries.length > 0 && !t.countries.includes(country)) return false;
                if (device && Array.isArray(t.devices) && t.devices.length > 0 && !t.devices.includes(device)) return false;
                return true;
            } catch (e) {
                return true;
            }
        });

        const result = filtered.map(r => ({
            id: String(r.id),
            title: r.title,
            subtitle: r.subtitle,
            image: buildPublicImageUrl(r.image_url),
            target_type: r.target_type,
            target_value: r.target_value,
            product_id: r.product_id,
            position: r.position,
            sort_order: r.sort_order,
            metadata: r.metadata ?? {},
        }));

        return res.json({ error: false, data: result });
    } catch (err) {
        console.error('GET /api/v1/slides error', err);
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
});

export default router;
