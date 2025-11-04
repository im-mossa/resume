// src/routes/categoriesProducts.ts
import { Router } from 'express';
import { validateParams, validateQuery } from '../middlewares/validateQuery.js';
import { paramsSchema, querySchema } from '../schemas/categoriesProducts.js';
import { getCategoryProductsHandler } from '../controllers/categoriesProductsController.js';

const router = Router();

router.get('/:id/products', validateParams(paramsSchema), validateQuery(querySchema), getCategoryProductsHandler);

export default router;
