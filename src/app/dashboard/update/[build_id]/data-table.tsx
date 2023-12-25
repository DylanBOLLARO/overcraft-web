"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/src/components/ui/table";
import { ChevronDown, ChevronUp, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
	add_new_line,
	delete_line,
	swap_line_down,
	swap_line_up,
} from "@/src/utils/networking";
import { Input } from "@/src/components/ui/input";
import { useState } from "react";

export function DataTable({ columns, data, fetch_build_info, build_id }: any) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const [description, setDescription] = useState("");
	const [population, setPopulation] = useState<any>();
	const [timerMin, setTimerMin] = useState<any>();
	const [timerSec, setTimerSec] = useState<any>();

	function secondsToTime(e: number) {
		const h = Math.floor(e / 3600)
				.toString()
				.padStart(2, "0"),
			m = Math.floor((e % 3600) / 60)
				.toString()
				.padStart(2, "0"),
			s = Math.floor(e % 60)
				.toString()
				.padStart(2, "0");

		return h + ":" + m + ":" + s;
	}

	const handleAddButtonClick = async () => {
		if (description && population && timerMin && timerSec) {
			const timer = +timerMin * 60 + +timerSec;

			await add_new_line({
				desc: "" + description,
				population: "" + population,
				timer: "" + timer,
				buildName_id: "" + build_id,
				position: "" + (data.length + 1),
			});
			fetch_build_info();
		}
	};

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext(),
											  )}
									</TableHead>
								);
							})}
							<TableHead>Options</TableHead>
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length > 0 &&
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext(),
										)}
									</TableCell>
								))}
								<TableCell className="flex flex-row gap-2">
									<Button
										variant="ghost"
										size="sm"
										className="h-6 w-6 px-0"
										onClick={async () => {
											const { id, buildName_id }: any =
												row.original;
											await swap_line_up(
												"" + id,
												"" + buildName_id,
											);
											fetch_build_info();
										}}
									>
										<ChevronUp className="w-3 h-3" />
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="h-6 w-6 px-0"
										onClick={async () => {
											const { id, buildName_id }: any =
												row.original;
											await swap_line_down(
												"" + id,
												"" + buildName_id,
											);
											fetch_build_info();
										}}
									>
										<ChevronDown className="w-3 h-3" />
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="h-6 w-6 px-0 hover:text-destructive"
										onClick={async () => {
											const { id, buildName_id }: any =
												row.original;
											await delete_line(
												"" + id,
												"" + buildName_id,
											);
											fetch_build_info();
										}}
									>
										<Trash2 className="w-3 h-3" />
									</Button>
								</TableCell>
							</TableRow>
						))}

					<TableRow>
						<TableCell>
							<Input
								className="h-8"
								placeholder="Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</TableCell>
						<TableCell>
							<Input
								className="h-8"
								placeholder="Population"
								value={population}
								onChange={(e) => setPopulation(e.target.value)}
							/>
						</TableCell>
						<TableCell className="flex flex-row gap-3">
							<Input
								className="h-8 w-16"
								placeholder="min"
								value={timerMin}
								onChange={(e) => setTimerMin(e.target.value)}
							/>

							<Input
								className="h-8 w-16"
								placeholder="sec"
								value={timerSec}
								onChange={(e) => setTimerSec(e.target.value)}
							/>
						</TableCell>
						<TableCell>
							<Button
								className="h-8"
								variant="outline"
								onClick={() => {
									handleAddButtonClick();
									setDescription("");
									setPopulation("");
									setTimerSec("");
									setTimerMin("");
								}}
								disabled={
									!description ||
									!population ||
									!timerMin ||
									!timerSec
								}
							>
								<PlusCircle className="mr-2 h-4 w-4" />
								Add
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
