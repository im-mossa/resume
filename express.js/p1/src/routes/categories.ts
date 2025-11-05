// src/routes/categories.ts
import { Router } from 'express';
import { validateQuery } from '../middlewares/validateQuery.js';
import { treeQuerySchema } from '../schemas/categories.js';
import { getCategoriesTreeHandler } from '../controllers/categoriesController.js';

const router = Router();

router.get('/tree', validateQuery(treeQuerySchema), getCategoriesTreeHandler);

export default router;
