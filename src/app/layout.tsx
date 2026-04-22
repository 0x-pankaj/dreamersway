import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { Space_Grotesk } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dreamer's Way Consultancy",
    template: "%s | Dreamer's Way Consultancy",
  },
  description: "Dreamers Way Consultancy - Your Medical Journey, Our Mission. Discover Nepal's top medical colleges with comprehensive details on programs, facilities, and admissions.",
  keywords: ["medical colleges Nepal", "MBBS Nepal", "medical education consultancy", "Nepal medical admission", "Dreamers Way"],
  authors: [{ name: "Dreamer's Way Consultancy" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Dreamer's Way Consultancy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        <ClientBody>{children}</ClientBody>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
