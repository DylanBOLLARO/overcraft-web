"use client";

import { Icons } from "@/src/components/icons";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { pagePath } from "@/src/constants/enum";
import { cn } from "@/src/lib/utils";
import { Trash2 } from "lucide-react";
import Link from "next/link";

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
} from "@/src/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { delete_build, fetch_builds_list } from "@/src/services/networking";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { get_info_build } from "@/src/services/networking";
import { useDispatch } from "react-redux";

export default function Page({ params }: any) {
	const router = useRouter();

	const [buildInfo, setBuildInfo] = useState();

	async function fetch_build_info(id: any) {
		const { listStep } = await get_info_build(id);
		setBuildInfo(
			listStep.sort((a: any, b: any) => {
				return a.position - b.position;
			}),
		);
	}

	useEffect(() => {
		fetch_build_info(params.build_id);
	}, [params.build_id]);

	const dispatch = useDispatch();

	return (
		<div className="flex flex-col gap-5 flex-1">
			<div className="flex flex-row gap-5">
				<Link
					href={pagePath.DASHBOARD}
					className={cn(
						buttonVariants({ variant: "secondary" }),
						"left-4 top-4 md:left-8 md:top-8 self-start",
					)}
				>
					<>
						<Icons.chevronLeft className="mr-2 h-4 w-4" />
						Back
					</>
				</Link>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							variant="outline"
							className="hover:text-destructive"
						>
							<Trash2 className="mr-2 h-4 w-4" />
							Delete
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Are you absolutely sure?
							</AlertDialogTitle>
							<AlertDialogDescription>
								Do you really want to delete the build order?
								This action cannot be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={async () => {
									router.push(pagePath.DASHBOARD);

									// await delete_build(params.build_id);
									// dispatch(
									// 	incrementByAmount(
									// 		await fetch_builds_list(),
									// 	),
									// );
								}}
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
			{buildInfo && (
				<DataTable
					build_id={params.build_id}
					columns={columns}
					data={buildInfo}
					fetch_build_info={fetch_build_info}
				/>
			)}
		</div>
	);
}
