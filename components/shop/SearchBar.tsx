"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SEARCH_DEBOUNCE_MS } from "@/lib/constants";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const current = searchParams.get("search") ?? "";
  const [value, setValue] = useState(current);
  const skip = useRef(true);

  useEffect(() => {
    if (skip.current) {
      skip.current = false;
      return;
    }
    const handle = window.setTimeout(() => {
      const next = new URLSearchParams(window.location.search);
      if (value.trim()) next.set("search", value.trim());
      else next.delete("search");
      next.delete("page");
      const query = next.toString();
      router.replace(query ? `/shop?${query}` : "/shop");
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(handle);
  }, [value, router]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search oils or categories"
      aria-label="Search products"
    />
  );
}
