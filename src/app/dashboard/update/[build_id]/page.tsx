"use client";

import { Icons } from "@/src/components/icons";
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
import { Button, buttonVariants } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { pagePath } from "@/src/constants/enum";
import {
	delete_build_by_build_id,
	get_all_step_build_by_build_id,
	get_connected_user_builds,
} from "@/src/lib/networking";
import { cn, jsonFileDownload } from "@/src/lib/utils";
import {
	ArrowDownUp,
	ClipboardEdit,
	Download,
	Save,
	Settings2,
	Trash2,
	Upload,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { columns } from "../../../../components/columns";
import { DataTable } from "../../../../components/data-table";
import { useRouter } from "next/navigation";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select";
import { Switch } from "@/src/components/ui/switch";

export default function Page({ params }: { params: { build_id: string } }) {
	const [selectedUserBuild, setSelectedUserBuild] = useState<any>(null);
	const router = useRouter();

	const local_refresh_steps = async () => {
		const connected_user_builds = await get_connected_user_builds();
		const selected_user_build = await connected_user_builds.find(
			(x: any) => x.id == params.build_id,
		);
		const stepsUnSort = await get_all_step_build_by_build_id(
			selected_user_build.id,
		);
		const steps = stepsUnSort.sort(
			(a: any, b: any) => a.position - b.position,
		);
		setSelectedUserBuild({ ...selected_user_build, steps });
	};

	useEffect(() => {
		(async () => {
			local_refresh_steps();
		})();
	}, [params]);

	if (!selectedUserBuild) return <></>;

	return (
		<div className="flex flex-col gap-5 flex-1 p-3">
			<div className="flex flex-row gap-5 justify-between">
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
				<div />

				<div className="flex flex-col items-center animate-fade animate-once animate-duration-300">
					<h2 className="font-medium leading-none self-center">
						{selectedUserBuild.title}
					</h2>
					<div className="flex text-xs gap-2 font-mono text-muted-foreground ">
						<p className="animate-fade animate-once animate-duration-300 animate-delay-500">
							{selectedUserBuild.race}
						</p>
						<Separator
							className="animate-fade animate-once animate-duration-300 animate-delay-[2000ms]"
							orientation="vertical"
						/>
						<p className="animate-fade animate-once animate-duration-300 animate-delay-[1000ms]">
							VS
						</p>
						<Separator
							className="animate-fade animate-once animate-duration-300 animate-delay-[2000ms]"
							orientation="vertical"
						/>
						<p className="animate-fade animate-once animate-duration-300 animate-delay-[1500ms]">
							{selectedUserBuild.v_race}
						</p>
					</div>
				</div>
				<div className="flex flex-row gap-2">
					<Button
						variant={"outline"}
						onClick={() => {
							jsonFileDownload(selectedUserBuild);
						}}
						className="gap-2"
					>
						<Upload className="h-4 w-4" />
						<p>Export</p>
					</Button>

					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline" className="gap-2">
								<ClipboardEdit className="h-4 w-4" />
								Edit
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<div className="flex flex-col gap-3">
								<Label htmlFor="email">Title</Label>
								<Input
									type="email"
									id="email"
									defaultValue={selectedUserBuild.title}
								/>
							</div>

							<div className="flex flex-col gap-3">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									className="h-56"
									defaultValue={selectedUserBuild.description}
								/>
							</div>

							<div className="flex flex-row gap-3">
								<div className="flex flex-col gap-2 items-center flex-1">
									<p>Play race</p>
									<Select>
										<SelectTrigger className="flex-1">
											<SelectValue
												placeholder={
													selectedUserBuild.race
												}
											/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="light">
												Zerg
											</SelectItem>
											<SelectItem value="dark">
												Terran
											</SelectItem>
											<SelectItem value="system">
												Protoss
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="flex flex-col flex-1 gap-2 items-center">
									<p>Opponent race</p>
									<Select>
										<SelectTrigger className="flex-1">
											<SelectValue
												placeholder={
													selectedUserBuild.v_race
												}
											/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="light">
												Zerg
											</SelectItem>
											<SelectItem value="dark">
												Terran
											</SelectItem>
											<SelectItem value="system">
												Protoss
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="flex gap-2 items-center">
								<Switch
									id="public_build"
									onCheckedChange={(e) => {
										console.log(e);
									}}
								/>
								<Label htmlFor="public_build">
									Public build
								</Label>
							</div>
							<DialogFooter>
								<Button type="submit">Save changes</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								variant="outline"
								className="hover:text-destructive gap-2"
							>
								<Trash2 className="h-4 w-4" />
								Delete
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Are you absolutely sure?
								</AlertDialogTitle>
								<AlertDialogDescription>
									Do you really want to delete the build
									order? This action cannot be undone.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={async () => {
										await delete_build_by_build_id(
											selectedUserBuild.id,
										);
										router.push(pagePath.DASHBOARD);
									}}
								>
									<Trash2 className="mr-2 h-4 w-4" />
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
			<DataTable
				build_id={params.build_id}
				columns={columns}
				selectedUserBuild={selectedUserBuild}
				local_refresh_steps={local_refresh_steps}
			/>
		</div>
	);
}


