"use client";
import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../components/ui/carousel";

export default function IndexPage() {
	return (
		<section id="open-source" className="container py-8">
			<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center overflow-hidden">
				<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl animate-fade-right animate-once animate-duration-[1000ms] animate-ease-out">
					Make your build !
				</h2>
				<h1 className="animate-fade animate-once animate-duration-2000 animate-delay-[500ms] animate-ease-out">
					Welcome !
				</h1>
				<Carousel className="w-full max-w-xs animate-fade animate-once animate-duration-1000 animate-delay-[1000ms] animate-ease-out">
					<CarouselContent>
						{Array.from({ length: 3 }).map((_, index) => (
							<CarouselItem key={index}>
								<div className="rounded-md overflow-hidden">
									<Image
										src={`/carousel/carousel_${
											index + 1
										}.png`}
										width={700}
										height={700}
										alt="Picture of the author"
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</section>
	);
}
