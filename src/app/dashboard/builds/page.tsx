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
import { Grid2X2, Menu, RefreshCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { STYLE_VIEW, VIEW, pagePath } from "@/src/constants/enum";

import { useRouter } from "next/navigation";
import { CardBuild } from "@/src/components/CardBuild";
import { get_connected_user_builds } from "@/src/utils/networking";
import DialogCreationNewBuild from "@/src/components/DialogCreationNewBuild";

export default function Page() {
	const [userBuilds, setUserBuilds] = useState<any>(null);

	useEffect(() => {
		(async () => {
			try {
				setUserBuilds(await get_connected_user_builds());
			} catch (error: any) {}
		})();
	}, []);

	return (
		<div className="flex flex-row flex-1 h-full gap-3">
			<Sidebar />
			<Tabs defaultValue={`${VIEW.BUILD}`} className="flex-1 py-2 ">
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
					<Button variant={"outline"}>
						<RefreshCcw className=" h-4 w-4" />
					</Button>
					<DialogCreationNewBuild />
					<Tabs defaultValue={STYLE_VIEW[STYLE_VIEW.SQUARE]}>
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
					<ScrollArea className="border rounded h-full">
						<div className="flex flex-col gap-3 p-1">
							{userBuilds?.length > 0 ? (
								userBuilds.map((build: any) => {
									return (
										<CardBuild
											build={build}
											key={build.id}
											width={150}
											height={150}
										/>
									);
								})
							) : (
								<p className="p-5">
									You have not yet created a build order.
								</p>
							)}
						</div>
					</ScrollArea>
				</TabsContent>
			</Tabs>
		</div>
	);
}
