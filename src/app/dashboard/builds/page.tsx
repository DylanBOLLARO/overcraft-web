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
import { Download, RefreshCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { VIEW } from "@/src/constants/enum";

import { CardBuild } from "@/src/components/CardBuild";
import { get_connected_user_builds, import_build } from "@/src/lib/networking";
import DialogCreationNewBuild from "@/src/components/DialogCreationNewBuild";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { jsonFileUpload } from "@/src/lib/utils";

export default function Page() {
	const [userBuilds, setUserBuilds] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const local_refresh_builds = async () => {
		try {
			setIsLoading(true);
			setUserBuilds(await get_connected_user_builds());
		} catch (error) {
			console.error("Error fetching user builds:", error);
		} finally {
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				local_refresh_builds();
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
						<TabsTrigger value={`${VIEW.DRAFT}`} disabled>
							Drafts
						</TabsTrigger>
					</TabsList>
					<Button
						variant={"outline"}
						onClick={local_refresh_builds}
						className="gap-2"
					>
						<RefreshCcw
							className={`h-4 w-4 ${
								isLoading &&
								"animate-spin animate-once animate-reverse"
							}`}
						/>
						Refresh
					</Button>

					<DialogCreationNewBuild
						local_refresh_builds={local_refresh_builds}
					/>
					<div>
						<Input
							id="btn-import"
							type="file"
							className="hidden"
							onChange={(e) => {
								jsonFileUpload(e)
									.then((parsedJson) => {
										import_build(
											JSON.stringify(parsedJson),
										);
									})
									.then(() => {
										local_refresh_builds();
									})
									.catch((error) => {
										console.error(error);
									});
								e.target.value = "";
							}}
						/>

						<Label
							htmlFor="btn-import"
							className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2 cursor-pointer"
						>
							<Download className="h-4 w-4" />
							<p>Import</p>
						</Label>
					</div>
				</div>
				<TabsContent
					value={`${VIEW.BUILD}`}
					className="h-[calc(100%-49px)]"
				>
					<ScrollArea className="border rounded h-full">
						<div className="flex flex-col gap-1 p-1">
							{userBuilds?.length > 0 ? (
								userBuilds.map((build: any) => {
									return (
										<CardBuild
											className={`animate-fade animate-once animate-duration-300`}
											build={build}
											key={build.id}
											width={120}
											height={120}
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
