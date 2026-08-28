"use client";

import { ACCESS_TOKEN_KEY } from "@/lib/constants";
import { listGuestOrders } from "@/lib/guest-orders";
import { getOrders } from "@/services/orders.service";
import type { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { formatInr } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AccountOrders() {
  const [token, setToken] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [guest, setGuest] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setToken(window.localStorage.getItem(ACCESS_TOKEN_KEY) ?? "");
    setGuest(listGuestOrders());
  }, []);

  async function loadAccountOrders(value: string) {
    if (!value) {
      setOrders([]);
      return;
    }
    try {
      setError(null);
      const data = await getOrders();
      setOrders(data);
    } catch {
      setError("Could not load account orders. Check the access token.");
      setOrders([]);
    }
  }

  useEffect(() => {
    if (token) void loadAccountOrders(token);
  }, [token]);

  return (
    <div className="space-y-8">
      <form
        className="rounded-2xl bg-white p-5"
        onSubmit={(e) => {
          e.preventDefault();
          window.localStorage.setItem(ACCESS_TOKEN_KEY, token.trim());
          void loadAccountOrders(token.trim());
        }}
      >
        <Label htmlFor="token">Customer access token (optional, local demo)</Label>
        <Input
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Seeded customer UUID"
        />
        <p className="mt-2 text-xs text-zinc-500">
          Guest checkout does not need this. Local seeded customer:
          22222222-2222-2222-2222-222222222222
        </p>
        <Button type="submit" className="mt-4">
          Save token
        </Button>
        {error ? <p className="mt-2 text-sm text-riya">{error}</p> : null}
      </form>

      <section>
        <h2 className="mb-3 font-medium">Account orders</h2>
        {!orders.length ? (
          <p className="text-sm text-zinc-600">No account orders loaded.</p>
        ) : (
          <ul className="space-y-3">
            {orders.map((order) => (
              <li key={order.id} className="rounded-xl bg-white p-4">
                <p className="font-medium">{order.order_number}</p>
                <p className="text-sm text-zinc-600">
                  {order.status} · {formatInr(order.total)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-medium">Orders placed on this device</h2>
        {!guest.length ? (
          <p className="text-sm text-zinc-600">No guest orders stored yet.</p>
        ) : (
          <ul className="space-y-3">
            {guest.map((order) => (
              <li key={order.id} className="rounded-xl bg-white p-4">
                <Link href={`/order/${order.order_number}`} className="font-medium underline">
                  {order.order_number}
                </Link>
                <p className="text-sm text-zinc-600">
                  {order.status} · {formatInr(order.total)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
