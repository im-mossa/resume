// src/middlewares/validateQuery.ts
import type { Request, Response, NextFunction } from 'express';
import { fieldErrorsFromIssues } from '../utils/zod.js';

type SafeParseResult<T> =
  | { success: true; data: T }
  | { success: false; error: any };

type SchemaLike<T = any> = {
  safeParse(input: unknown): SafeParseResult<T>;
};

export const validateQuery =
  <T = any>(schema: SchemaLike<T>) =>
    (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req.query);
      if (!result.success) {
        return res.status(400).json({
          error: true,
          code: 'INVALID_QUERY',
          message: 'Invalid query',
          details: { fieldErrors: fieldErrorsFromIssues(result.error), formErrors: [] },
        });
      }
      (req as any).validatedQuery = result.data;
      return next();
    };

export const validateParams =
  <T = any>(schema: SchemaLike<T>) =>
    (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req.params);
      if (!result.success) {
        return res.status(400).json({
          error: true, code: 'INVALID_PARAM',
          details: {
            fieldErrors: fieldErrorsFromIssues(result.error),
            formErrors: []
          },
        });
      }
      (req as any).validatedParams = result.data;
      return next();
    };

