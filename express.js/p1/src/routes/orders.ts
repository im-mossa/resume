// src/routes/orders.ts
import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../middlewares/validate.js';
import { createReservation } from '../services/utilsService.js';

const router = Router();

const reserveSchema = z.object({
    product_id: z.string().uuid(), // uuid string
    variant_id: z.string().uuid(), // uuid string
    quantity: z.number().int().positive(),
    reserved_by: z.string().uuid().nullable().optional(), // user id or null
    order_id: z.string().uuid().nullable().optional(),
    ttl_minutes: z.number().int().positive().optional().default(15),
});

type ReserveBody = z.infer<typeof reserveSchema>;

router.post('/reserve', validateBody(reserveSchema), async (req, res) => {
    const body = req.body as ReserveBody;
    const { product_id, variant_id, quantity, reserved_by = null, order_id = null, ttl_minutes } = body;

    try {
        // استفاده از wrapper امن و تایپ‌دار که توابع utils را صدا می‌زند
        const result = await createReservation({
            product_id,
            variant_id,
            quantity,
            reserved_by,
            order_id,
            ttl_minutes,
        });

        if (!result) {
            console.error('createReservation returned no result', { product_id, variant_id, quantity });
            return res.status(500).json({ error: true, code: 'NO_RESPONSE', message: 'No response from DB function' });
        }

        if (!result.ok) {
            // تبدیل reason به کد خطای API — اگر reason مشخص نیست، از RESERVATION_FAILED استفاده کن
            const apiCode = result.reason ?? 'RESERVATION_FAILED';
            return res.status(400).json({
                error: true,
                code: apiCode,
                message: 'Reservation failed',
                reason: result.reason,
            });
        }

        return res.status(201).json({ error: false, data: { reservation_id: result.reservation_id } });
    } catch (err) {
        console.error('POST /api/v1/orders/reserve error', err);
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
});

export default router;
