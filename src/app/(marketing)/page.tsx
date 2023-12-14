"use client";

import { decrement, increment, reset } from "@/src/lib/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";

export default function IndexPage() {
	const count = useAppSelector((state) => state.counterReducer.value);
	const dispatch = useAppDispatch();

	return (
		<section id="open-source" className="container py-8 md:py-12 lg:py-24">
			<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
				<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
					Make your build !
				</h2>
				<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
					{count}
				</h2>

				<button onClick={() => dispatch(increment())}>increment</button>
				<button
					onClick={() => dispatch(decrement())}
					style={{ marginInline: 16 }}
				>
					decrement
				</button>
				<button onClick={() => dispatch(reset())}>reset</button>
			</div>
		</section>
	);
}
