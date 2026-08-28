import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProductInfo } from "@/components/products/ProductInfo";
import { getProduct, getProducts } from "@/services/products.service";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product;
  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  const related = await getProducts({
    category: product.categories?.slug,
    limit: 8,
  })
    .then((res) => res.items.filter((item) => item.id !== product.id).slice(0, 4))
    .catch(() => []);

  return (
    <PageContainer className="py-10">
      <ProductInfo product={product} related={related} />
    </PageContainer>
  );
}
