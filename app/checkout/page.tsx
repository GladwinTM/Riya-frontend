import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { PageContainer } from "@/components/layout/PageContainer";
import { getStoreSettings } from "@/services/settings.service";

export default async function CheckoutPage() {
  const settings = await getStoreSettings().catch(() => null);

  return (
    <PageContainer className="py-10">
      <h1 className="font-display mb-6 text-4xl">Checkout</h1>
      <CheckoutForm settings={settings} />
    </PageContainer>
  );
}
