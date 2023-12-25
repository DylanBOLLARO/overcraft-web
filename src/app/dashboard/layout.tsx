"use client";
import { useEffect, useState } from "react";
import { deleteCookie, get_connected_user_id } from "../../utils/networking";
import { pagePath } from "@/src/constants/enum";
import { usePathname, useRouter } from "next/navigation";
export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const pathname = usePathname();

	useEffect(() => {
		(async () => {
			const user_id = await get_connected_user_id();
			if (!user_id) router.push(pagePath.SIGNIN);
			setIsLoading(false);
		})();
	}, [pathname]);

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<main className="flex-1">{children}</main>
	);
}
