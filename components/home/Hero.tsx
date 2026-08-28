import Link from "next/link";
import { HeroDecoration } from "@/components/decorations/Sunflower";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/products/ProductImage";
import { productImages } from "@/lib/utils";
import type { Product } from "@/types/product";

export function Hero({ product }: { product?: Product }) {
  const image = product ? productImages(product)[0] : null;

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-cream px-6 py-14 md:px-12">
      <HeroDecoration />
      <div className="relative z-10 grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl leading-tight md:text-6xl">
            Pure goodness,
            <br />
            made for every kitchen.
          </h1>
          <Link href="/shop" className="mt-8 inline-block">
            <Button className="min-h-12 px-8">Shop now</Button>
          </Link>
        </div>
        <div className="mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-lg">
          <ProductImage
            src={image}
            alt={product?.name ?? "Riya cooking oil"}
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
