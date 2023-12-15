"use client";

import Link from "next/link";

import { marketingConfig } from "@/src/config/marketing";
import { cn } from "@/src/lib/utils";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { MainNav } from "@/src/components/main-nav";
import { ModeToggle } from "@/src/components/mode-toggle";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../../redux/authSlice";

interface MarketingLayoutProps {
	children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);
	console.log(JSON.stringify(user));

	return (
		<div className="flex min-h-screen flex-col">
			<header className="container z-40 bg-background">
				<div className="flex h-20 items-center justify-between py-6">
					<MainNav items={marketingConfig.mainNav} />
					<div className="flex flex-row gap-3">
						<ModeToggle />
						{user ? (
							<Button
								variant="destructive"
								size="sm"
								onClick={() => {
									dispatch(logOut({}));
								}}
							>
								<p className="p-0 m-0">{user.email}</p>
							</Button>
						) : (
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
						)}
					</div>
				</div>
			</header>
			<main className="flex-1">{children}</main>
		</div>
	);
}
