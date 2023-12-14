import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

import "@/src/styles/globals.css";
import { siteConfig } from "@/src/config/site";
import { cn } from "@/src/lib/utils";
import { Toaster } from "@/src/components/ui/toaster";
import { TailwindIndicator } from "@/src/components/tailwind-indicator";
import { ThemeProvider } from "@/src/components/theme-provider";
import StoreProvider from "./StoreProvider";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
	src: "../assets/fonts/CalSans-SemiBold.woff2",
	variable: "--font-heading",
});

interface RootLayoutProps {
	children: React.ReactNode;
}

export const metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [
		"Next.js",
		"React",
		"Tailwind CSS",
		"Server Components",
		"Radix UI",
	],
	authors: [
		{
			name: "Vipalisk",
		},
	],
	creator: "Vipalisk",
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
					fontHeading.variable,
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					<StoreProvider>
						{children}
						<Toaster />
						<TailwindIndicator />
					</StoreProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
