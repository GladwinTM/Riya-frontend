import { PageContainer } from "@/components/layout/PageContainer";
import { getContactSettings } from "@/services/contact.service";

export default async function ContactPage() {
  const contact = await getContactSettings().catch(() => null);

  return (
    <PageContainer className="py-10">
      <h1 className="font-display text-4xl">Contact</h1>
      {!contact ? (
        <p className="mt-6">We couldn’t load contact details. Please try again.</p>
      ) : (
        <div className="mt-6 max-w-xl space-y-2 rounded-2xl bg-white p-6 text-sm">
          <p className="text-lg font-medium">{contact.business_name}</p>
          {contact.phone ? <p>Phone: {contact.phone}</p> : null}
          {contact.email ? <p>Email: {contact.email}</p> : null}
          {contact.whatsapp ? <p>WhatsApp: {contact.whatsapp}</p> : null}
          {contact.address ? <p>Address: {contact.address}</p> : null}
          {contact.business_hours ? <p>Hours: {contact.business_hours}</p> : null}
          {contact.instagram_url ? (
            <p>
              <a className="underline" href={contact.instagram_url}>
                Instagram
              </a>
            </p>
          ) : null}
          {contact.facebook_url ? (
            <p>
              <a className="underline" href={contact.facebook_url}>
                Facebook
              </a>
            </p>
          ) : null}
          {contact.google_maps_url ? (
            <div className="pt-4">
              <iframe
                title="Store location"
                src={contact.google_maps_url}
                className="h-64 w-full rounded-xl border-0"
              />
            </div>
          ) : null}
        </div>
      )}
    </PageContainer>
  );
}
