import Link from "next/link";

import { marketingConfig } from "@/src/config/marketing";
import { cn } from "@/src/lib/utils";
import { buttonVariants } from "@/src/components/ui/button";
import { MainNav } from "@/src/components/main-nav";
import { ModeToggle } from "@/src/components/mode-toggle";

interface MarketingLayoutProps {
	children: React.ReactNode;
}

export default async function MarketingLayout({
	children,
}: MarketingLayoutProps) {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="container z-40 bg-background">
				<div className="flex h-20 items-center justify-between py-6">
					<MainNav items={marketingConfig.mainNav} />
					<div className="flex flex-row gap-3">
						<ModeToggle />
						<nav>
							<Link
								href="/login"
								className={cn(
									buttonVariants({
										variant: "secondary",
										size: "sm",
									}),
									"px-4",
								)}
							>
								Login
							</Link>
						</nav>
					</div>
				</div>
			</header>
			<main className="flex-1">{children}</main>
		</div>
	);
}
