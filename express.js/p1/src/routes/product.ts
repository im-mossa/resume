// src/routes/product.ts
import { Router } from 'express';
import { validateParams, validateQuery } from '../middlewares/validateQuery.js';
import { paramsSchema, productQuerySchema } from '../schemas/product.js';
import { getProductHandler } from '../controllers/productController.js';

const router = Router();

router.get('/:idOrSlug', validateParams(paramsSchema), validateQuery(productQuerySchema), getProductHandler);

export default router;
