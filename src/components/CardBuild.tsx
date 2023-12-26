import Image from "next/image";
import { cn } from "@/src/utils/utils";
import { useRouter } from "next/navigation";

export function CardBuild({
	width,
	build,
	styleView,
	height,
	className,
	...props
}: any) {
	const router = useRouter();
	return (
		<div
			className={cn(
				"flex flex-1 flex-row hover:bg-muted p-2 cursor-pointer gap-3 rounded",
				className,
			)}
			{...props}
			onClick={() => {
				router.push(`/dashboard/update/${build.id}`);
			}}
		>
			<div className="overflow-hidden rounded">
				<Image
					src={`/picture_build.png`}
					alt={""}
					width={width}
					height={height}
					className={cn(
						"object-cover transition-all hover:scale-105 w-10 h-10",
					)}
				/>
			</div>
			<div className="space-y-1 text-sm">
				<h3 className="font-medium leading-none">{build.title}</h3>
				<p className="text- text-muted-foreground">{build.desc}</p>
			</div>
		</div>
	);
}
