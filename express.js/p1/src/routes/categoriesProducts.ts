// src/routes/categories.products.ts
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma.js';

const router = Router();

/**
 * Query validation
 */
const querySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().optional().default(20),
});

router.get('/:id/products', async (req, res) => {
  const parse = querySchema.safeParse(req.query);
  if (!parse.success) {
    return res.status(400).json({ error: true, code: 'INVALID_QUERY', details: parse.error.format() });
  }
  const { page, limit } = parse.data;
  const offset = (page - 1) * limit;
  const categoryId = req.params.id;

  try {
    // Step 1: aggregate product ids for the category subtree with ordering info
    const prodAgg: any[] = await prisma.$queryRaw`
      WITH RECURSIVE cats AS (
        SELECT id FROM catalog.categories WHERE id = ${categoryId}::uuid
        UNION ALL
        SELECT c.id FROM catalog.categories c JOIN cats p ON c.parent_id = p.id
      ),
      prod_agg AS (
        SELECT p.id,
               MIN(pc.position) AS min_pos,
               MAX(p.created_at) AS latest_created
        FROM catalog.products p
        JOIN catalog.product_categories pc ON pc.product_id = p.id
        JOIN cats ON pc.category_id = cats.id
        WHERE p.is_active = true
        GROUP BY p.id
        ORDER BY min_pos ASC NULLS LAST, latest_created DESC
        LIMIT ${limit} OFFSET ${offset}
      )
      SELECT id, min_pos, latest_created FROM prod_agg;
    `;

    const ids = prodAgg.map(r => r.id);
    let items: any[] = [];

    if (ids.length > 0) {
      // Step 2: fetch product details for those ids preserving the order from prod_agg
      // join on prod_agg to keep ordering by min_pos/latest_created
      items = await prisma.$queryRaw`
        WITH selected AS (
          SELECT p.id, p.name, p.slug, p.description, p.price::text AS price, p.created_at, pa.min_pos, pa.latest_created
          FROM (
            SELECT p.id, MIN(pc.position) AS min_pos, MAX(p.created_at) AS latest_created
            FROM catalog.products p
            JOIN catalog.product_categories pc ON pc.product_id = p.id
            JOIN (
              WITH RECURSIVE cats AS (
                SELECT id FROM catalog.categories WHERE id = ${categoryId}::uuid
                UNION ALL
                SELECT c2.id FROM catalog.categories c2 JOIN cats p2 ON c2.parent_id = p2.id
              )
              SELECT id FROM cats
            ) subtree ON pc.category_id = subtree.id
            WHERE p.is_active = true
            GROUP BY p.id
            ORDER BY min_pos ASC NULLS LAST, latest_created DESC
            LIMIT ${limit} OFFSET ${offset}
          ) pa
          JOIN catalog.products p ON p.id = pa.id
        )
        SELECT s.id, s.name, s.slug, s.description, s.price, s.created_at,
          (SELECT image_url FROM catalog.product_images WHERE product_id = s.id ORDER BY sort_order ASC LIMIT 1) AS image
        FROM selected s
        ORDER BY s.min_pos ASC NULLS LAST, s.latest_created DESC;
      `;
    }

    // total count (distinct products across category subtree)
    const countRes: Array<{ total: string }> = await prisma.$queryRaw`
      WITH RECURSIVE cats AS (
        SELECT id FROM catalog.categories WHERE id = ${categoryId}::uuid
        UNION ALL
        SELECT c.id FROM catalog.categories c JOIN cats p ON c.parent_id = p.id
      )
      SELECT COUNT(DISTINCT p.id)::text as total
      FROM catalog.products p
      JOIN catalog.product_categories pc ON pc.product_id = p.id
      JOIN cats ON pc.category_id = cats.id
      WHERE p.is_active = true
    `;
    const total = parseInt((countRes[0]?.total ?? '0'), 10);

    return res.json({
      error: false,
      data: {
        items: items.map((it: any) => ({
          id: String(it.id),
          name: it.name,
          slug: it.slug,
          description: it.description,
          price: it.price ?? null,
          created_at: it.created_at ?? null,
          image: it.image ?? null,
        })),
        meta: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) }
      }
    });
  } catch (err) {
    console.error('GET /categories/:id/products error', err);
    return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
  }
});

export default router;
