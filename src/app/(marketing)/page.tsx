"use client";

import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../../redux/authSlice";

export default function IndexPage() {
	const user = useSelector(selectCurrentUser);
	const token = useSelector(selectCurrentToken);

	const welcome = user ? `Welcome ${JSON.stringify(user)}!` : "Welcome!";
	const tokenAbbr = `${token?.slice(0, 9)}...`;

	return (
		<section id="open-source" className="container py-8 md:py-12 lg:py-24">
			<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
				<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
					Make your build !
				</h2>
				<h1>{welcome}</h1>
				{user && <p>Token: {tokenAbbr}</p>}
			</div>
		</section>
	);
}
