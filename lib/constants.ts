export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

export const CART_STORAGE_KEY = "riya-cart";
export const GUEST_ORDERS_KEY = "riya-guest-orders";
export const ACCESS_TOKEN_KEY = "riya-access-token";

export const SEARCH_DEBOUNCE_MS = 350;

export const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
