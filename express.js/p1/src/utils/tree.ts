// src/utils/tree.ts
import type { CategoryRow, CategoryNode } from '../types/category.js';

/**
 * buildTree: تبدیل لیست مسطح به درخت (preserve order of input)
 */
export function buildCategoryTree(rows: CategoryRow[]): CategoryNode[] {
    const byId = new Map<string, CategoryNode>();
    for (const r of rows) {
        byId.set(r.id, { ...r, children: [] });
    }

    const roots: CategoryNode[] = [];
    for (const r of rows) {
        const node = byId.get(r.id)!;
        const parentId = r.parent_id ?? null;
        if (parentId) {
            const parent = byId.get(parentId);
            if (parent) {
                parent.children.push(node);
            } else {
                // محافظه‌کارانه: اگر پدر پیدا نشد، آن را root در نظر بگیر
                roots.push(node);
            }
        } else {
            roots.push(node);
        }
    }

    return roots;
}
