import { AboutPreview, BrandStatement } from "@/components/home/AboutPreview";
import { BestSellers } from "@/components/home/BestSellers";
import { Hero } from "@/components/home/Hero";
import { HomeContact } from "@/components/home/HomeContact";
import { PageContainer } from "@/components/layout/PageContainer";
import { BackendNotice } from "@/components/ui/BackendNotice";
import { apiSafe } from "@/lib/api";
import type { ContactSettings } from "@/types/contact";
import type { Paginated } from "@/types/api";
import type { Product } from "@/types/product";

const emptyProducts: Paginated<Product> = {
  items: [],
  pagination: { page: 1, limit: 12, total: 0, totalPages: 0 },
};

export default async function HomePage() {
  const [productsResult, contactResult] = await Promise.all([
    apiSafe<Paginated<Product>>("/products?page=1&limit=12", emptyProducts),
    apiSafe<ContactSettings | null>("/content/contact", null),
  ]);

  const notice =
    !productsResult.ok
      ? productsResult.error
      : !contactResult.ok
        ? contactResult.error
        : null;

  return (
    <PageContainer className="py-8">
      <BackendNotice message={notice} />
      <Hero product={productsResult.data.items[0]} />
      <BestSellers products={productsResult.data.items} />
      <AboutPreview />
      <BrandStatement />
      <HomeContact contact={contactResult.data} />
    </PageContainer>
  );
}
