import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Download } from "lucide-react";
import { jsonFileUpload } from "../lib/utils";
import { import_build } from "../lib/networking";

export const ImportButton = ({ local_refresh_builds }: any) => {
	return (
		<div>
			<Input
				id="btn-import"
				type="file"
				className="hidden"
				onChange={(e) => {
					jsonFileUpload(e)
						.then((parsedJson) => {
							import_build(JSON.stringify(parsedJson));
						})
						.then(local_refresh_builds)
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
	);
};
