import { API_URL, ACCESS_TOKEN_KEY } from "@/lib/constants";
import type { ApiFailure, ApiSuccess } from "@/types/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function token() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  const bearer = token();
  if (bearer) headers.set("Authorization", `Bearer ${bearer}`);

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  const json = (await res.json().catch(() => null)) as
    | ApiSuccess<T>
    | ApiFailure
    | null;

  if (!json || json.success !== true) {
    throw new ApiError(
      json?.message ?? "Request failed",
      res.status,
      json && "code" in json ? json.code : undefined,
    );
  }

  return json.data;
}
