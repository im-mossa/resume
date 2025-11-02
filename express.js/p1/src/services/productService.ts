// src/services/productService.ts
import * as repo from '../repositories/productRepo.js';
import { buildPublicImageUrl } from '../utils/image.js';
import { isUuid } from '../utils/validateUUID.js';

export async function getProductDetails(idOrSlug: string, categoryId?: string) {
  const where = isUuid(idOrSlug) ? { id: idOrSlug } : { slug: idOrSlug };

  const product = await repo.getProductBasic(where);
  if (!product) {
    return null;
  }

  const [images, variants, mappings] = await Promise.all([
    repo.getProductImages(String(product.id)),
    repo.getProductVariants(String(product.id)),
    repo.getProductCategoryMappings(String(product.id)),
  ]);

  const categoryIds = mappings.map(m => m.category_id);
  const categories = categoryIds.length > 0 ? await repo.getCategoriesByIds(categoryIds) : [];

  // determine chosenCategoryId following priority
  let chosenCategoryId: string | null = null;
  if (categoryId) {
    // verify membership
    const isMember = mappings.some(m => String(m.category_id) === categoryId);
    if (!isMember) {
      throw new Error('INVALID_CATEGORY');
    }
    chosenCategoryId = categoryId;
  } else if (product.primary_category_id) {
    chosenCategoryId = String(product.primary_category_id);
  } else {
    const primaryMap = mappings.find(m => m.is_primary);
    if (primaryMap) chosenCategoryId = primaryMap.category_id;
  }

  let breadcrumb: Array<{ id: string; name: string; slug: string }> | null = null;
  if (chosenCategoryId) {
    breadcrumb = await repo.getBreadcrumbByCategoryId(chosenCategoryId);
  }

  // normalize
  const normalizedProduct = {
    id: String(product.id),
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price !== null && product.price !== undefined ? String(product.price) : null,
    stock: typeof product.stock === 'number' ? product.stock : null,
    is_active: Boolean(product.is_active),
    created_at: product.created_at ?? null,
    updated_at: product.updated_at ?? null,
  };

  const normalizedImages = (images ?? []).map(img => ({
    id: String(img.id),
    url: buildPublicImageUrl(img.image_url),
    alt_text: img.alt_text ?? null,
    sort_order: typeof img.sort_order === 'number' ? img.sort_order : null,
  }));

  const normalizedVariants = (variants ?? []).map(v => ({
    id: String(v.id),
    sku: v.sku,
    color: v.color ?? null,
    size: v.size ?? null,
    stock: typeof v.stock === 'number' ? v.stock : null,
    created_at: v.created_at ?? null,
  }));

  const normalizedCategories = (categories ?? []).map(c => ({
    id: String(c.id),
    name: c.name,
    slug: c.slug,
    path: c.path ?? null,
    image_url: buildPublicImageUrl(c.image_url ?? null),
    is_active: Boolean(c.is_active),
    product_count: typeof c.product_count === 'number' ? c.product_count : null,
  }));

  return {
    product: normalizedProduct,
    images: normalizedImages,
    variants: normalizedVariants,
    categories: normalizedCategories,
    breadcrumb,
  };
}
