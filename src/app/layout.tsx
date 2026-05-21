import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { siteConfig } from "@/lib/site-config";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Study Abroad in Nepal, India, UK, USA & Japan`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "study abroad",
    "MBBS in Nepal",
    "engineering in India for Nepali students",
    "study in UK from Nepal",
    "study in USA from Nepal",
    "study in Japan from Nepal",
    "education consultancy Nepal",
    "Dreamer's Way",
    "Dreamers Way Consultancy",
    "abroad study consultancy",
    "scholarships abroad",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Your Global Education Partner`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Study Abroad`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: siteConfig.url },
  icons: {
    icon: "/favicon.ico",
    apple: "/dwc_logo.png",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/dwc_logo.png`,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phonePrimary,
      contactType: "customer support",
      areaServed: ["NP", "IN", "GB", "US", "JP"],
      availableLanguage: ["English", "Hindi", "Nepali"],
    },
  ],
  sameAs: [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.linkedin,
    siteConfig.social.youtube,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
