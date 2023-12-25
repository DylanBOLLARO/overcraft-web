"use client";

import { get_connected_user_builds } from "@/src/utils/networking";
import { useEffect } from "react";

export default function Page({ params }: { params: { build_id: string } }) {

	useEffect(() => {
		(async () => {
			const build = await get_connected_user_builds();
		})();
	}, []);

	return <div>My Post: {params.build_id}</div>;
}


// export default function Page({ params }: any) {
// 	const router = useRouter();
// 	//same name as name of your file, can be [slug].js; [specialId].js - any name you want
// 	const { pid } = router.query;
// 	//result will be '55' (string)
// 	return <p>Post: {pid}</p>;

// 	return (
// 		<></>
// 		// <div className="flex flex-col gap-5 flex-1">
// 		// 	<div className="flex flex-row gap-5">
// 		// 		<Link
// 		// 			href={pagePath.DASHBOARD}
// 		// 			className={cn(
// 		// 				buttonVariants({ variant: "secondary" }),
// 		// 				"left-4 top-4 md:left-8 md:top-8 self-start",
// 		// 			)}
// 		// 		>
// 		// 			<>
// 		// 				<Icons.chevronLeft className="mr-2 h-4 w-4" />
// 		// 				Back
// 		// 			</>
// 		// 		</Link>
// 		// 		<AlertDialog>
// 		// 			<AlertDialogTrigger asChild>
// 		// 				<Button
// 		// 					variant="outline"
// 		// 					className="hover:text-destructive"
// 		// 				>
// 		// 					<Trash2 className="mr-2 h-4 w-4" />
// 		// 					Delete
// 		// 				</Button>
// 		// 			</AlertDialogTrigger>
// 		// 			<AlertDialogContent>
// 		// 				<AlertDialogHeader>
// 		// 					<AlertDialogTitle>
// 		// 						Are you absolutely sure?
// 		// 					</AlertDialogTitle>
// 		// 					<AlertDialogDescription>
// 		// 						Do you really want to delete the build order?
// 		// 						This action cannot be undone.
// 		// 					</AlertDialogDescription>
// 		// 				</AlertDialogHeader>
// 		// 				<AlertDialogFooter>
// 		// 					<AlertDialogCancel>Cancel</AlertDialogCancel>
// 		// 					<AlertDialogAction
// 		// 						onClick={async () => {
// 		// 							// router.push(pagePath.DASHBOARD);
// 		// 							// await delete_build(params.build_id);
// 		// 							// dispatch(
// 		// 							// 	incrementByAmount(
// 		// 							// 		await fetch_builds_list(),
// 		// 							// 	),
// 		// 							// );
// 		// 						}}
// 		// 					>
// 		// 						<Trash2 className="mr-2 h-4 w-4" />
// 		// 						Continue
// 		// 					</AlertDialogAction>
// 		// 				</AlertDialogFooter>
// 		// 			</AlertDialogContent>
// 		// 		</AlertDialog>
// 		// 	</div>
// 		// 	{buildInfo && (
// 		// 		<DataTable
// 		// 			build_id={params.build_id}
// 		// 			columns={columns}
// 		// 			data={buildInfo}
// 		// 			fetch_build_info={fetch_build_info}
// 		// 		/>
// 		// 	)}
// 		// </div>
// 	);
// }
