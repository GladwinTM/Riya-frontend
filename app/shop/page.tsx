import { Suspense } from "react";
import { ShopDecoration } from "@/components/decorations/Sunflower";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ShopToolbar } from "@/components/shop/ShopToolbar";
import { ShopSkeleton } from "@/components/ui/skeletons";
import { getCategories } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";
import { productMinPrice } from "@/lib/utils";
import type { Product } from "@/types/product";
import Link from "next/link";

function shopHref(
  query: { search?: string; category?: string; sort?: string },
  page: number,
) {
  const params = new URLSearchParams();
  if (query.search) params.set("search", query.search);
  if (query.category) params.set("category", query.category);
  if (query.sort) params.set("sort", query.sort);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

function sortProducts(items: Product[], sort: string) {
  if (sort === "price-asc") {
    return [...items].sort((a, b) => productMinPrice(a) - productMinPrice(b));
  }
  if (sort === "price-desc") {
    return [...items].sort((a, b) => productMinPrice(b) - productMinPrice(a));
  }
  return items;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; sort?: string; page?: string }>;
}) {
  const query = await searchParams;
  const page = Number(query.page ?? 1) || 1;

  const [products, categories] = await Promise.all([
    getProducts({
      search: query.search,
      category: query.category,
      page,
      limit: 20,
      sort: query.sort,
    }).catch(() => ({
      items: [] as Product[],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    })),
    getCategories().catch(() => []),
  ]);

  const items = sortProducts(products.items, query.sort ?? "newest");

  return (
    <div className="relative">
      <ShopDecoration />
      <PageContainer className="relative py-6">
        <ShopHeader />
        <Suspense fallback={<ShopSkeleton />}>
          <ShopToolbar categories={categories} />
        </Suspense>
        <ProductGrid products={items} />
        {products.pagination.totalPages > 1 ? (
          <div className="mt-8 flex items-center justify-center gap-4 text-sm">
            {page > 1 ? <Link href={shopHref(query, page - 1)}>Previous</Link> : null}
            <span>
              Page {products.pagination.page} of {products.pagination.totalPages}
            </span>
            {page < products.pagination.totalPages ? (
              <Link href={shopHref(query, page + 1)}>Next</Link>
            ) : null}
          </div>
        ) : null}
      </PageContainer>
    </div>
  );
}
