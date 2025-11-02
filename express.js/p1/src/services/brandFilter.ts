// src/lib/brandFilter.ts
import { PrismaClient } from '@prisma/client';
import { isUuid } from '../utils/validateUUID.js';

/**
 * Resolve brandParam (comma separated slugs or uuids) into array of brand UUIDs.
 * - prisma: your Prisma client instance
 * - brandParam: string like "nike,adidas" or "uuid1,uuid2"
 * Returns unique array of UUID strings (possibly empty).
 */
export async function resolveBrandIds(prisma: PrismaClient, brandParam?: string): Promise<string[]> {
    if (!brandParam) return [];

    const parts = brandParam.split(',').map(s => s.trim()).filter(Boolean);
    if (parts.length === 0) return [];

    const uuids = parts.filter(p => isUuid(p));
    const slugs = parts.filter(p => !isUuid(p));

    const ids: string[] = [...uuids];

    if (slugs.length > 0) {
        // safe parameterized query: pass slugs array as bound param
        const rows: Array<{ id: string }> = await prisma.$queryRaw`
      SELECT id FROM catalog.brands WHERE slug = ANY(${slugs}::text[])
    `;
        for (const r of rows) {
            if (r && r.id) ids.push(String(r.id));
        }
    }

    // dedupe and return
    return Array.from(new Set(ids));
}
