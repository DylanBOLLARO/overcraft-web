"use client";

import { Sidebar } from "@/src/components/sidebar";
import { Button } from "@/src/components/ui/button";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/src/components/ui/tabs";
import { Bold, Grid2X2, Menu, RefreshCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import DialogCreationNewBuild from "@/src/components/DialogCreationNewBuild";
import { STYLE_VIEW, VIEW, pagePath } from "@/src/constants/enum";
import { fetch_builds_list } from "@/src/services/networking";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { CardBuild } from "@/src/components/CardBuild";
import { RootState } from "@/src/lib/store";
import { selectCurrentTokens } from "@/src/lib/features/auth/authSlice";

export default function Page() {
	const dispatch = useDispatch();
	// const count = useSelector((state: RootState) => state.counter.value);
	const tokens = useSelector(selectCurrentTokens);

	const [isSquareView, setIsSquareView] = useState<string>(
		STYLE_VIEW[STYLE_VIEW.SQUARE],
	);

	async function update_data() {
		// dispatch(incrementByAmount(await fetch_builds_list()));
	}

	// if (!count) update_data();

	useEffect(() => {
		if (!tokens) redirect(pagePath.SIGNIN);
	}, [tokens]);

	useEffect(() => {}, [isSquareView]);

	return (
		<div className="flex-1 flex flex-row gap-3">
			<Sidebar />
			<Tabs defaultValue={`${VIEW.BUILD}`} className="flex-1 py-2">
				<div className="flex flex-row gap-5">
					<TabsList>
						<TabsTrigger
							value={`${VIEW.BUILD}`}
							className="relative"
						>
							Builds
						</TabsTrigger>
						<TabsTrigger value={`${VIEW.DRAFT}`}>
							Drafts
						</TabsTrigger>
					</TabsList>
					<Button variant={"outline"} onClick={update_data}>
						<RefreshCcw className=" h-4 w-4" />
					</Button>
					<DialogCreationNewBuild />
					<Tabs
						defaultValue={isSquareView}
						onValueChange={(e: any) => {
							setIsSquareView(STYLE_VIEW[e]);
						}}
					>
						<TabsList>
							<TabsTrigger value={STYLE_VIEW[STYLE_VIEW.SQUARE]}>
								<Grid2X2 className="h-5 w-5" />
							</TabsTrigger>
							<TabsTrigger value={STYLE_VIEW[STYLE_VIEW.LINE]}>
								<Menu className="h-5 w-5" />
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
				<TabsContent
					value={`${VIEW.BUILD}`}
					className="h-[calc(100%-49px)]"
				>
					<ScrollArea className="rounded-md border h-full p-1">
						<div
							className={`flex flex-wrap justify-start ${
								isSquareView ? "gap-1" : "gap-3"
							}`}
						>
							{/* {count.map((build: any) => (
								<CardBuild
									styleView={isSquareView}
									build={build}
									key={build.id}
									aspectRatio="square"
									width={150}
									height={150}
								/>
							))} */}
						</div>
					</ScrollArea>
				</TabsContent>
			</Tabs>
		</div>
	);
}
