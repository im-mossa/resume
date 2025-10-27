// src/middlewares/validate.ts
import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';

export const validateBody = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const issues = result.error.format();
        return res.status(400).json({
            error: true,
            code: 'INVALID_INPUT',
            message: 'Invalid request body',
            details: issues,
        });
    }
    req.body = result.data;
    return next();
};
