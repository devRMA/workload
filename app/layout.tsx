import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Next } from "next/font/google";
import "./globals.css";
import { AdManager } from "@/components/organisms/ad-manager";
import { AnalyticsWrapper } from "@/components/organisms/analytics-wrapper";
import { CookieConsent } from "@/components/organisms/cookie-consent";
import { ThemeProvider } from "@/components/templates/theme-provider";

const hyperlegible = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hyperlegible",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://workload.devrma.com"),
  verification: {
    google: "iUxNyN-K3GLaqGNs8tq2mnFfiKc9X0USiTnQP9nqOpg",
  },
  title: {
    default: "WorkLoad | Calculadora Inteligente de Horas e Salário",
    template: "%s | WorkLoad",
  },
  description:
    "Calcule sua jornada de trabalho, horas extras, adicional noturno e salário CLT de forma simples, rápida e precisa.",
  keywords: ["calculadora de horas", "horas extras", "salário", "CLT", "jornada de trabalho", "adicional noturno"],
  authors: [{ name: "Rafael Augusto" }],
  creator: "Rafael Augusto",
  publisher: "devRMA",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WorkLoad | Calculadora Inteligente de Horas",
    description: "Calcule sua jornada de trabalho, horas extras e salário CLT de forma rápida.",
    url: "https://workload.devrma.com",
    siteName: "WorkLoad",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkLoad | Calculadora Inteligente",
    description: "Calcule sua jornada de trabalho e horas extras de forma simples.",
    creator: "@devRMA",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1116" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
      </head>
      <body className={hyperlegible.variable} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <AdManager />
          <CookieConsent />
        </ThemeProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
