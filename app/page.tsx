import { AboutPreview, BrandStatement } from "@/components/home/AboutPreview";
import { BestSellers } from "@/components/home/BestSellers";
import { Hero } from "@/components/home/Hero";
import { HomeContact } from "@/components/home/HomeContact";
import { PageContainer } from "@/components/layout/PageContainer";
import { getContactSettings } from "@/services/contact.service";
import { getProducts } from "@/services/products.service";

export default async function HomePage() {
  const [products, contact] = await Promise.all([
    getProducts({ page: 1, limit: 12 }).catch(() => ({
      items: [],
      pagination: { page: 1, limit: 12, total: 0, totalPages: 0 },
    })),
    getContactSettings().catch(() => null),
  ]);

  return (
    <PageContainer className="py-8">
      <Hero product={products.items[0]} />
      <BestSellers products={products.items} />
      <AboutPreview />
      <BrandStatement />
      <HomeContact contact={contact} />
    </PageContainer>
  );
}
