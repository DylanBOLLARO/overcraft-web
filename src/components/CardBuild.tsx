import Image from "next/image";
import { cn } from "@/src/utils/utils";
import { useRouter } from "next/navigation";
import { divVariants } from "./ui/custom-colors";

export function CardBuild({
	width,
	build,
	styleView,
	height,
	className,
	...props
}: any) {
	const router = useRouter();

	const truncateText = (text: string) => {
		return text.length > 75 ? `${text.slice(0, 75)}...` : text;
	};

	return (
		<div
			className={cn(
				"flex flex-1 flex-row hover:bg-muted p-2 cursor-pointer gap-3 rounded",
				className,
				divVariants,
			)}
			{...props}
			onClick={() => {
				router.push(`/dashboard/update/${build.id}`);
			}}
		>
			<Image
				src={`/picture_build.png`}
				alt={build.title}
				width={width}
				height={height}
				className={cn(
					"object-cover transition-all hover:scale-105 aspect-square h-10 w-10 rounded",
				)}
			/>
			<div className="space-y-1 text-sm">
				<h3 className="font-medium leading-none">{build.title}</h3>
				<p className="text-muted-foreground text-xs">
					{truncateText(build.description)}
				</p>
			</div>
		</div>
	);
}
