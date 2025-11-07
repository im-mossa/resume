// src/routes/brands.ts
import { Router } from 'express';
import { validateParams, validateQuery } from '../middlewares/validateQuery.js'; // reuse middleware we created earlier
import { paramsSchema, querySchema } from '../schemas/brands.js';
import { getBrandProductsHandler } from '../controllers/brandsController.js';

const router = Router();

router.get('/:slug/products', validateParams(paramsSchema), validateQuery(querySchema), getBrandProductsHandler);

export default router;
