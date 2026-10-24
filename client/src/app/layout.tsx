import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Caveat, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pranavmahajan.com";

export const viewport: Viewport = {
  themeColor: "#fffcf7",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pranav Mahajan | Global Keynote Speaker, Mindset Architect & Life Guru",
    template: "%s | Pranav Mahajan",
  },
  description:
    "Official website of Pranav Mahajan — Internationally acclaimed Keynote Speaker, Life Mastery Guru, and Mindset Coach. Inspiring global leaders, entrepreneurs, and seekers to cultivate inner stillness and achieve peak human potential.",
  keywords: [
    "Pranav Mahajan",
    "Motivational Speaker",
    "Keynote Speaker",
    "Spiritual Guru",
    "Life Coach",
    "Mindset Architect",
    "Leadership Keynote",
    "Personal Transformation",
  ],
  authors: [{ name: "Pranav Mahajan", url: siteUrl }],
  creator: "Pranav Mahajan",
  publisher: "Pranav Mahajan",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Pranav Mahajan | Global Keynote Speaker & Life Mastery Guru",
    description:
      "Awaken Your Inner Power • Master Your Mind • Transcend Limitations. Official Platform of Pranav Mahajan.",
    url: siteUrl,
    siteName: "Pranav Mahajan Official",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranav Mahajan | Keynote Speaker & Mindset Guru",
    description:
      "Empowering millions worldwide through conscious leadership, mental resilience, and spiritual mastery.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#fffcf7] text-slate-800 antialiased selection:bg-amber-400 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
