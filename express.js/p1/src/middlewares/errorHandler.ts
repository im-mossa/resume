import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Log the error server-side
    // eslint-disable-next-line no-console
    console.error('UNHANDLED_ERROR', err);

    res.status(500).json({
        error: true,
        code: 'SERVER_ERROR',
        message: err?.message ?? 'Internal server error',
        stack: process.env.NODE_ENV === 'production' ? undefined : err?.stack,
    });
};
