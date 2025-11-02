// src/repositories/productsRepo.ts
import { prisma } from '../prisma.js';

type FindOpts = {
    skip: number;
    take: number;
    orderBy: any;
};

function detectProductsModel(): any {
    const p: any = prisma as any;
    return p['products'] ?? null;
};

export async function findProducts(where: any, opts: FindOpts) {
    const productsModel = detectProductsModel();
    if (!productsModel) {
        throw new Error('Prisma products model not found.');
    }

    return productsModel.findMany({
        where,
        select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            description: true,
            created_at: true,
            // include first image if relation exists in Prisma schema
            product_images: {
                orderBy: [{ sort_order: 'asc' }],
                take: 1,
                select: { image_url: true },
            },
        },
        orderBy: opts.orderBy,
        take: opts.take,
        skip: opts.skip,
    });
};

export async function countProducts(where: any) {
    const productsModel = detectProductsModel();
    if (!productsModel) {
        throw new Error('Prisma products model not found.');
    }
    return productsModel.count({ where });
};