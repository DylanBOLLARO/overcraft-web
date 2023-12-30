import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { delete_build_by_build_id } from "../lib/networking";
import { useRouter } from "next/navigation";
import { pagePath } from "../constants/enum";

export const DialogDeleteBuild = ({ selectedUserBuildId }: any) => {
	const router = useRouter();
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="text-destructive hover:text-destructive"
				>
					<Trash2 className="mr-2 h-4 w-4" />
					Delete
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Are you absolutely sure ?</DialogTitle>
					<DialogDescription>
						Do you really want to delete the build order? This
						action cannot be undone.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button
						type="submit"
						variant="outline"
						className="text-destructive hover:text-destructive"
						onClick={async () => {
							await delete_build_by_build_id(selectedUserBuildId);
							router.push(pagePath.DASHBOARD);
						}}
					>
						<Trash2 className="mr-2 h-4 w-4" />
						Continue
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
