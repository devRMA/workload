import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AdManager } from "@/components/organisms/ad-manager";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://workload.devrma.com"),
	title: {
		default: "WorkLoad | Calculadora Inteligente de Horas e Salário",
		template: "%s | WorkLoad",
	},
	description:
		"Calcule sua jornada de trabalho, horas extras, adicional noturno e salário CLT de forma simples, rápida e precisa.",
	keywords: [
		"calculadora de horas",
		"horas extras",
		"salário",
		"CLT",
		"jornada de trabalho",
		"adicional noturno",
	],
	authors: [{ name: "Rafael Augusto" }],
	creator: "Rafael Augusto",
	publisher: "devRMA",
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "WorkLoad | Calculadora Inteligente de Horas",
		description:
			"Calcule sua jornada de trabalho, horas extras e salário CLT de forma rápida.",
		url: "https://workload.devrma.com",
		siteName: "WorkLoad",
		locale: "pt_BR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "WorkLoad | Calculadora Inteligente",
		description:
			"Calcule sua jornada de trabalho e horas extras de forma simples.",
		creator: "@devRMA",
	},
};

export const viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
	],
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={inter.className} suppressHydrationWarning>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<AdManager />
				</ThemeProvider>
				{process.env.NEXT_PUBLIC_GA_ID && (
					<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
				)}
			</body>
		</html>
	);
}
