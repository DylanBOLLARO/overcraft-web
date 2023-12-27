"use client";

import { Separator } from "../components/ui/separator";
import { CircleUserRound } from "lucide-react";

export default function IndexPage() {
	const fonc = [
		"Création de profil utilisateur",
		"Système permettant de mettre en avant les builds orders créés par les utilisateurs avec un système de like",
		"Clonage de build order public afin de pouvoir les modifier",
		"Notion de build order public et privé",
		"Système de commentaires sous le build order ?",
		"Ajout d&apos;explications entre les étapes de build ?",
		"Unités de référence pour l&apos;exécution du build ? Temps, @100% unité -> Faire ->...",
		"Logiciel d&apos;overlay (similaire à Discord) permettant l&apos;affichage en temps réel du build order pendant le jeu.",
	];

	return (
		<main className="container pt-5">
			<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-5 overflow-hidden text-justify text-lg">
				<h2 className="font-heading text-7xl leading-[1.1] animate-fade animate-once animate-duration-[3000ms] animate-delay-[500ms] animate-ease-out">
					Welcome to{" "}
					<span className="font-medium text-indigo-500">
						OverCraft{" "}
					</span>{" "}
					!
				</h2>
				<p className="animate-fade animate-once animate-duration-[2000ms] animate-delay-[1500ms] animate-ease-out">
					Bienvenue sur OverCraft, votre futur site de référence dédié
					aux builds orders sur StarCraft II. Actuellement en cours de
					développement, notre équipe s&apos;active pour créer une
					expérience exceptionnelle. Prévoyez une interface
					conviviale, des contenus riches et des fonctionnalités
					innovantes.
				</p>

				<p className="animate-fade animate-once animate-duration-[2000ms] animate-delay-[3000ms] animate-ease-out">
					Nous sommes impatients de recueillir vos retours sur
					l&apos;expérience utilisateur actuelle. N&apos;hésitez pas à
					partager vos suggestions et idées afin d&apos;améliorer le
					site, que ce soit au niveau de la navigation, des
					fonctionnalités ou du contenu. Votre feedback est essentiel
					pour façonner OverCraft en une plateforme répondant
					parfaitement aux attentes de la communauté de StarCraft II.
				</p>

				<div className="flex flex-col gap-2 animate-fade animate-once animate-duration-[2000ms] animate-delay-[4000ms] animate-ease-out border p-3 rounded">
					<h4 className="text-sm font-medium leading-none">
						Contactez nous via discord !
					</h4>
					<Separator />
					<div className="flex justify-center items-center gap-2">
						<CircleUserRound className="w-8 h-8" />
						<Separator orientation="vertical" />
						<p className="font-medium text-indigo-500">vipalisk</p>
					</div>
				</div>
			</div>
		</main>
	);
}
