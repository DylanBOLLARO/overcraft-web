"use client";

import { useEffect, useState } from "react";
import { getCookie } from "../actions";
import { pagePath } from "@/src/constants/enum";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const cookie = await getCookie();
			if (!cookie) {
				router.push(pagePath.SIGNIN);
				return;
			}
			setIsLoading(false);
		})();
	}, []);

	return <> {isLoading ? <p>Loading...</p> : children}</>;
}
