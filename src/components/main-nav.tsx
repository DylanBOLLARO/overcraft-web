"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { MainNavItem } from "@/src/types";
import { siteConfig } from "@/src/config/site";
import { cn } from "@/src/lib/utils";
import { pagePath } from "../constants/enum";
import { useSelector } from "react-redux";
import {
	selectCurrentTokens,
	selectCurrentUser,
} from "../lib/features/auth/authSlice";

export function MainNav(items?: any) {
	const segment = useSelectedLayoutSegment();
	const user: any = useSelector(selectCurrentUser);
	const tokens: any = useSelector(selectCurrentTokens);
	return (
		<div className="flex gap-6 md:gap-10">
			<Link
				href={`${pagePath.HOME}`}
				className="hidden items-center space-x-2 md:flex"
			>
				<span className="hidden font-bold sm:inline-block">
					{siteConfig.name}
				</span>
			</Link>
			{items?.length ? (
				<nav className="hidden gap-6 md:flex">
					{items?.map((item: any, index: number) => (
						<Link
							key={index}
							href={item.disabled ? "#" : item.href}
							className={cn(
								"flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
								item.href.startsWith(`/${segment}`)
									? "text-foreground"
									: "text-foreground/60",
								item.disabled &&
									"cursor-not-allowed opacity-80",
							)}
						>
							{item.title}
						</Link>
					))}
					{user && tokens?.access_token && (
						<Link
							href={`${pagePath.DASHBOARD}`}
							className={cn(
								"flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60",
							)}
						>
							Dashboard
						</Link>
					)}
				</nav>
			) : null}
		</div>
	);
}
