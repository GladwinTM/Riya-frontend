import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/providers";
import { getContactSettings } from "@/services/contact.service";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Riya — Pure Goodness for Every Kitchen",
  description: "Quality cooking oils made for everyday kitchens.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  let contact = null;
  try {
    contact = await getContactSettings();
  } catch {
    contact = null;
  }

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer contact={contact} />
        </Providers>
      </body>
    </html>
  );
}
