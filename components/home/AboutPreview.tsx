import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AboutPreview() {
  return (
    <section className="mt-16 grid items-center gap-8 rounded-[2rem] bg-white p-6 md:grid-cols-2 md:p-10">
      <div>
        <h2 className="font-display text-3xl">About Riya</h2>
        <p className="mt-4 text-zinc-700">
          Riya makes cold-pressed cooking oils for everyday South Indian kitchens.
          Clear sizes, honest pricing, and a quick checkout — without extra noise.
        </p>
        <Link href="/about" className="mt-6 inline-block">
          <Button variant="secondary">Read more</Button>
        </Link>
      </div>
      <div className="grid h-56 place-items-center rounded-3xl bg-cream text-sm text-zinc-500">
        Traditional oils, bottled with care
      </div>
    </section>
  );
}

export function BrandStatement() {
  return (
    <section className="mt-16 text-center">
      <h2 className="font-display text-3xl">Made for everyday cooking</h2>
      <p className="mx-auto mt-3 max-w-xl text-zinc-700">
        Gingelly, groundnut, coconut and sunflower oils with clear sizes, pricing
        and quick checkout.
      </p>
    </section>
  );
}
