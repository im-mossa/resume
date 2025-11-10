// src/routes/slides.ts
import { Router } from 'express';
import { validateQuery } from '../middlewares/validateQuery.js';
import { slidesQuerySchema } from '../schemas/slides.js';
import { getSlidesHandler } from '../controllers/slidesController.js';

const router = Router();

router.get('/', validateQuery(slidesQuerySchema), getSlidesHandler);

export default router;
