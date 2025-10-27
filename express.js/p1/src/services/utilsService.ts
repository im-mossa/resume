// src/services/utilsService.ts
import { prisma } from '../prisma.js';

export type ReservationResult = {
    reservation_id: string | null;
    ok: boolean;
    reason: string | null;
};

export type OkReason = {
    ok: boolean;
    reason: string | null;
};

/**
 * create_reservation(p_product_id uuid, p_variant_id uuid, p_quantity integer,
 *                    p_reserved_by uuid, p_order_id uuid DEFAULT NULL, p_ttl_minutes integer DEFAULT 15)
 * returns TABLE(reservation_id uuid, ok boolean, reason text)
 */
export async function createReservation(args: {
    product_id: string;
    variant_id: string;
    quantity: number;
    reserved_by?: string | null;
    order_id?: string | null;
    ttl_minutes?: number;
}): Promise<ReservationResult> {
    const {
        product_id,
        variant_id,
        quantity,
        reserved_by = null,
        order_id = null,
        ttl_minutes = 15,
    } = args;

    const rows: any[] = await prisma.$queryRaw`
    SELECT * FROM utils.create_reservation(
      ${product_id}::uuid,
      ${variant_id}::uuid,
      ${quantity}::int,
      ${reserved_by}::uuid,
      ${order_id}::uuid,
      ${ttl_minutes}::int
    )
  `;
    const row = Array.isArray(rows) ? rows[0] : rows;
    return {
        reservation_id: row?.reservation_id ?? null,
        ok: Boolean(row?.ok),
        reason: row?.reason ?? null,
    };
}

/**
 * confirm_reservation(p_reservation_id uuid, p_actor uuid DEFAULT NULL)
 * returns TABLE(ok boolean, reason text)
 */
export async function confirmReservation(reservation_id: string, actor_id?: string | null): Promise<OkReason> {
    const rows: any[] = await prisma.$queryRaw`
    SELECT * FROM utils.confirm_reservation(
      ${reservation_id}::uuid,
      ${actor_id}::uuid
    )
  `;
    const row = Array.isArray(rows) ? rows[0] : rows;
    return { ok: Boolean(row?.ok), reason: row?.reason ?? null };
}

/**
 * cancel_reservation(p_reservation_id uuid, p_reason text DEFAULT 'user_cancelled')
 * returns TABLE(ok boolean, reason text)
 */
export async function cancelReservation(reservation_id: string, reasonText?: string): Promise<OkReason> {
    const rows: any[] = await prisma.$queryRaw`
    SELECT * FROM utils.cancel_reservation(
      ${reservation_id}::uuid,
      ${reasonText ?? 'user_cancelled'}::text
    )
  `;
    const row = Array.isArray(rows) ? rows[0] : rows;
    return { ok: Boolean(row?.ok), reason: row?.reason ?? null };
}
