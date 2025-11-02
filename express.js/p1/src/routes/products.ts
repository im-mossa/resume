// src/routes/products.ts
import { Router } from 'express';
import { validateQuery } from '../middlewares/validateQuery.js';
import { listProductsController } from '../controllers/productsController.js';
import { listProductsQuerySchema } from '../schemas/products.js';

const router = Router();


router.get('/', validateQuery(listProductsQuerySchema), listProductsController);

export default router;
