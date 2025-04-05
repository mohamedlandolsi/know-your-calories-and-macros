import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { LanguageProvider } from "@/components/language/language-provider";
import GoogleAdSense from "@/components/ads/google-adsense";

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

export const metadata: Metadata = {
  title: {
    default: "Know Your Calories and Macros - Nutrition Calculator",
    template: "%s | Know Your Calories and Macros",
  },
  description:
    "Calculate your daily calorie and macronutrient needs based on your body metrics, activity level, and fitness goals. Free nutrition calculator for weight loss, maintenance, or weight gain.",
  keywords: [
    "calories calculator",
    "macros calculator",
    "nutrition calculator",
    "TDEE calculator",
    "weight loss",
    "muscle gain",
    "protein calculator",
    "fitness nutrition",
  ],
  authors: [{ name: "Nutrition Calculator" }],
  creator: "Nutrition Calculator",
  publisher: "Nutrition Calculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://know-your-calories-and-macros.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      fr: "/fr",
      ar: "/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://know-your-calories-and-macros.vercel.app",
    title: "Know Your Calories and Macros - Nutrition Calculator",
    description:
      "Calculate your daily calorie and macronutrient needs based on your body metrics and fitness goals. Free online nutrition calculator.",
    siteName: "Know Your Calories and Macros",
    images: [
      {
        url: "https://know-your-calories-and-macros.vercel.app/favicon_io/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Know Your Calories and Macros Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Know Your Calories and Macros - Nutrition Calculator",
    description:
      "Calculate your daily calorie and macronutrient needs based on your body metrics and fitness goals. Free online nutrition calculator.",
    images: [
      "https://know-your-calories-and-macros.vercel.app/favicon_io/android-chrome-512x512.png",
    ],
    creator: "@nutritioncalc",
  },
  icons: {
    icon: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    shortcut: "/favicon_io/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  category: "Health & Fitness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsensePublisherId = "ca-pub-1830337896450418";

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-1830337896450418" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <Analytics />
            <GoogleAdSense client={adsensePublisherId} />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
