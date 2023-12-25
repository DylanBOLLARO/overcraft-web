"use client";

import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

import "@/src/styles/globals.css";
import { cn } from "@/src/utils/utils";
import { Toaster } from "@/src/components/ui/toaster";
import { TailwindIndicator } from "@/src/components/tailwind-indicator";
import { ThemeProvider } from "@/src/components/theme-provider";
import { useEffect, useState } from "react";
import Navigation from "./navigation";
import { getCookie } from "../utils/networking";

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

export default function RootLayout({ children }: RootLayoutProps) {
	const [cookie, setCookie] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		(async () => {
			setCookie(await getCookie());
		})();
		setIsLoading(false);
	});

	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={cn(
					"h-[calc(100vh-49px)] bg-background font-sans antialiased",
					fontSans.variable,
					fontHeading.variable,
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					<Navigation cookie={cookie} />
					<main className="flex flex-row px-2 pb-2 gap-2 h-full ">
						{isLoading ? <p>Loading...</p> : children}
					</main>
					<Toaster />
					<TailwindIndicator />
				</ThemeProvider>
			</body>
		</html>
	);
}
