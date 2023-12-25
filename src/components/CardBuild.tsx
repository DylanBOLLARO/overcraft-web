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
					src={
						"https://w0.peakpx.com/wallpaper/816/229/HD-wallpaper-francisco-joel-on-starcraft-starcraft-starcraft-2-space-warriors-starcraft-2-marine.jpg"
					}
					alt={"https://github.com/shadcn.png"}
					width={width}
					height={height}
					className={cn(
						"h-auto w-auto object-cover transition-all hover:scale-105 aspect-square ",
						!styleView && "w-12 h12",
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
