"use client";

import { useEffect, useState } from "react";
import { findGuestOrder } from "@/lib/guest-orders";
import { OrderConfirmation } from "@/components/orders/OrderConfirmation";
import type { Order } from "@/types/order";

export function GuestOrderView({ orderNumber }: { orderNumber: string }) {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(findGuestOrder(decodeURIComponent(orderNumber)) ?? null);
  }, [orderNumber]);

  if (order === undefined) return <div className="h-64 animate-pulse rounded-2xl bg-white" />;

  if (!order) {
    return (
      <div className="rounded-2xl bg-white p-8">
        <h1 className="font-display text-2xl">Order not found on this device</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Guest orders are stored locally after checkout. Use Track order with your
          order number and phone if you placed it on this browser.
        </p>
      </div>
    );
  }

  return <OrderConfirmation order={order} />;
}
