"use client";

import Link from "next/link";

import { marketingConfig } from "@/src/config/marketing";
import { cn } from "@/src/lib/utils";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { MainNav } from "@/src/components/main-nav";
import { ModeToggle } from "@/src/components/mode-toggle";
import { useDispatch, useSelector } from "react-redux";
import {
	logOut,
	selectCurrentUser,
	selectCurrentToken,
} from "../redux/authSlice";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { pagePath } from "../constants/enum";

export default function MainLayout() {
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);
	const token = useSelector(selectCurrentToken);

	return (
		<div className="flex flex-col mb-2">
			<header className="px-10 z-40 bg-background  border-b-[1px] border-muted-foreground/20">
				<div className="flex h-10 items-center justify-between py-4">
					<MainNav
						items={marketingConfig.mainNav}
						user={{ ...user, token }}
					/>
					<div className="flex flex-row gap-3 items-center">
						<ModeToggle />

						{user ? (
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button variant="outline" size={"xsm"}>
										{user.email}
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure you want to
											log out?
										</AlertDialogTitle>
										<AlertDialogDescription>
											Logging out will disconnect you from
											your account, and your data will
											remain on our servers.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>
											Cancel
										</AlertDialogCancel>
										<AlertDialogAction
											onClick={() => {
												dispatch(logOut({}));
											}}
										>
											Continue
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						) : (
							<nav>
								<Link
									href={pagePath.SIGNIN}
									className={cn(
										buttonVariants({
											variant: "secondary",
											size: "xsm",
										}),
									)}
								>
									Login
								</Link>
							</nav>
						)}
					</div>
				</div>
			</header>
		</div>
	);
}
