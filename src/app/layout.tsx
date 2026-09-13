import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Unbounded } from "next/font/google";
import "./globals.css";
import { config } from "@/data/config";
import { Providers } from "@/components/providers";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import AnimatedBackground from "@/components/animated-background";

const spaceGroteskSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  creator: config.author,
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    siteName: `${config.author} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#030303" },
    { media: "(prefers-color-scheme: dark)", color: "#030303" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGroteskSans.variable} ${unbounded.variable} font-sans dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#030303] text-foreground antialiased flex flex-col justify-between selection:bg-white/20 selection:text-white overflow-x-hidden">
        <Providers>
          <AnimatedBackground />
          <Header />
          <div className="flex-1 w-full relative z-10">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
