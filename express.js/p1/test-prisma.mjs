// test-prisma.mjs  (ESM)
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

(async () => {
    try {
        await prisma.$connect();
        const r = await prisma.$queryRaw`SELECT 1 as ok`;
        console.log('PRISMA_OK', JSON.stringify(r));
        await prisma.$disconnect();
        process.exit(0);
    } catch (e) {
        console.error('PRISMA_ERROR', e);
        try { await prisma.$disconnect(); } catch { }
        process.exit(1);
    }
})();
