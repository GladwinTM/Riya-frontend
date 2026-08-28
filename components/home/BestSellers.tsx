import Link from "next/link";
import { ProductImage } from "@/components/products/ProductImage";
import { productImages } from "@/lib/utils";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

export function ProductPreviewCard({ product }: { product: Product }) {
  return (
    <article className="min-w-[220px] overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="aspect-square bg-cream">
        <ProductImage
          src={productImages(product)[0]}
          alt={product.name}
          className="h-full w-full"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-zinc-500">{product.product_variants?.[0]?.name}</p>
        <Link href={`/shop/${product.slug}`} className="mt-4 block">
          <Button variant="secondary" className="w-full">
            Explore
          </Button>
        </Link>
      </div>
    </article>
  );
}

export function BestSellers({ products }: { products: Product[] }) {
  const featured = products.filter((p) => p.is_featured);
  const list = (featured.length ? featured : products).slice(0, 8);

  return (
    <section className="mt-16">
      <h2 className="text-center text-xs font-bold tracking-[0.3em] uppercase">
        Best sellers
      </h2>
      <div className="mt-6 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible">
        {list.map((product) => (
          <ProductPreviewCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
