// src/routes/categories.ts
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma.js'; // فرض: prisma client export شده

const router = Router();

/**
 * GET /api/v1/categories/tree
 * - باز می‌گرداند درخت دسته‌ها (nested)
 */
router.get('/tree', async (req, res) => {
    try {
        // همه‌ی دسته‌ها را می‌گیریم و سپس درخت می‌سازیم در جاوااسکریپت
        const rows: Array<any> = await prisma.$queryRaw`
      SELECT id, name, slug, parent_id, image_url, path, sort_order, product_count, is_active
      FROM catalog.categories
      ORDER BY sort_order ASC, name ASC
    `;

        const byId = new Map<string, any>();
        rows.forEach(r => {
            byId.set(r.id, { ...r, children: [] });
        });

        const roots: any[] = [];
        for (const r of rows) {
            const node = byId.get(r.id)!;
            if (r.parent_id) {
                const parent = byId.get(r.parent_id);
                if (parent) parent.children.push(node);
                else roots.push(node); // محافظه‌کارانه: اگر پدر یافت نشد، به روت اضافه کن
            } else {
                roots.push(node);
            }
        }

        return res.json({ error: false, data: roots });
    } catch (err) {
        console.error('GET /categories/tree error', err);
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
});

export default router;
