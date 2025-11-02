// src/repositories/productRepo.ts
import { prisma } from '../prisma.js';
import type { ProductImageRow, ProductVariantRow, ProductCategoryMapRow, ProductCategoryRow, BreadcrumbRow } from '../types/product.js';

export async function getProductBasic(where: any) {

    return prisma.products.findFirst({
        where,
        select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            price: true,
            stock: true,
            is_active: true,
            created_at: true,
            updated_at: true,
            primary_category_id: true,
        },
    });
}

export async function getProductImages(productId: string): Promise<ProductImageRow[]> {

    return prisma.product_images.findMany({
        where: { product_id: productId },
        orderBy: [{ sort_order: 'asc' }, { created_at: 'asc' }],
        select: { id: true, image_url: true, alt_text: true, sort_order: true },
    });
}

export async function getProductVariants(productId: string): Promise<ProductVariantRow[]> {

    return prisma.product_variants.findMany({
        where: { product_id: productId },
        orderBy: [{ created_at: 'asc' }],
        select: { id: true, sku: true, color: true, size: true, stock: true, created_at: true },
    });
}

export async function getProductCategoryMappings(productId: string): Promise<ProductCategoryMapRow[]> {

    return prisma.product_categories.findMany({
        where: { product_id: productId },
        orderBy: [{ is_primary: 'desc' }, { position: 'asc' }],
        select: { category_id: true, is_primary: true, position: true },
    });
}

export async function getCategoriesByIds(ids: string[]): Promise<ProductCategoryRow[]> {

    if (!ids || ids.length === 0) return [];
    return prisma.categories.findMany({
        where: { id: { in: ids } },
        select: { id: true, name: true, slug: true, path: true, image_url: true, is_active: true, product_count: true },
    });
}

/**
 * returns array root->leaf of categories for given chosenCategoryId
 */
export async function getBreadcrumbByCategoryId(chosenCategoryId: string): Promise<BreadcrumbRow[]> {
    const rows = await prisma.$queryRaw`
    WITH RECURSIVE b AS (
      SELECT id, name, slug, parent_id FROM catalog.categories WHERE id = ${chosenCategoryId}::uuid
      UNION ALL
      SELECT c.id, c.name, c.slug, c.parent_id
      FROM catalog.categories c
      JOIN b ON c.id = b.parent_id
    )
    SELECT id, name, slug FROM b;
  ` as Array<{ id: string; name: string; slug: string }>;

    if (!Array.isArray(rows) || rows.length === 0) return [];
    return rows.reverse().map(r => ({ id: String(r.id), name: r.name, slug: r.slug }));
}