// src/services/categoriesService.ts
import * as repo from '../repositories/categoriesRepo.js';
import { buildCategoryTree } from '../utils/tree.js';
import { buildPublicImageUrl } from '../utils/image.js';
import type { CategoryNode } from '../types/category.js';

export async function getCategoriesTree(includeInactive = false): Promise<CategoryNode[]> {
    const rows = await repo.fetchAllCategories(includeInactive);

    // ساخت درخت
    const tree = buildCategoryTree(rows);

    // normalize image urls (recursively)
    function normalizeNode(node: CategoryNode) {
        node.image_url = buildPublicImageUrl(node.image_url ?? null);
        if (node.children && node.children.length > 0) {
            node.children.forEach(normalizeNode);
        }
    }
    tree.forEach(normalizeNode);

    return tree;
}
