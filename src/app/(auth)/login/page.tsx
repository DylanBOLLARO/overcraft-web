"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { buttonVariants } from "@/src/components/ui/button";
import { Icons } from "@/src/components/icons";
import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";

import { Input } from "@/src/components/ui/input";

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/src/components/ui/tabs";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/src/components/ui/form";

import * as z from "zod";
import { redirect, useRouter } from "next/navigation";
import { pagePath } from "@/src/constants/enum";
import { fetchCustom } from "@/src/services/networking";
import { SIGNUP } from "@/src/constants/api";
import { useLoginMutation } from "@/src/services/auth";
import { useEffect, useState } from "react";
import { create, getCookie } from "../../actions";

export default function LoginPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	const formSignin = z.object({
		email: z.string().email(),
		password: z.string().min(5),
	});

	const formSigninInstance = useForm<z.infer<typeof formSignin>>({
		resolver: zodResolver(formSignin),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const formSignup = z.object({
		username: z.string().min(3).max(30),
		email: z.string().email(),
		password: z.string().min(5),
	});

	const formSignupInstance = useForm<z.infer<typeof formSignup>>({
		resolver: zodResolver(formSignup),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const [login] = useLoginMutation();

	async function onSigninSubmit(values: z.infer<typeof formSignin>) {
		try {
			const { email, password } = values;
			const userData = await login({ email, password }).unwrap();
			await create({
				name: "overcraft_jwt",
				value: userData?.tokens?.access_token,
			});
			router.push(pagePath.DASHBOARD);
		} catch (error) {
			console.log(error);
		}
	}

	async function onSignupSubmit(values: z.infer<typeof formSignup>) {
		console.log("onSignupSubmit");
		try {
			await fetchCustom(SIGNUP, { ...values });
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		(async () => {
			const cookie = await getCookie();
			if (cookie) {
				router.push(pagePath.DASHBOARD);
				return;
			}
			setIsLoading(false);
		})();
	}, []);

	return (
		<div className="container flex flex-col items-center gap-5">
			<Link
				href={pagePath.HOME}
				className={cn(
					buttonVariants({ variant: "secondary" }),
					"self-start",
				)}
			>
				<>
					<Icons.chevronLeft className="mr-2 h-4 w-4" />
					Back
				</>
			</Link>
			<Tabs defaultValue="signin" className="w-[500px] bg-">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="signin">Sign in</TabsTrigger>
					<TabsTrigger value="signup">Sign up</TabsTrigger>
				</TabsList>
				<TabsContent value="signin">
					<Card>
						<CardHeader>
							<CardTitle>Already a member ? Sign in !</CardTitle>
							<CardDescription>
								Fill in the fields below to create your account.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<Form {...formSigninInstance}>
								<form
									onSubmit={formSigninInstance.handleSubmit(
										onSigninSubmit,
									)}
									className="space-y-8"
								>
									<FormField
										control={formSigninInstance.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="skywalker@gmail.com"
														{...field}
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={formSigninInstance.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														placeholder="**********"
														type="password"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button type="submit">Submit</Button>
								</form>
							</Form>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="signup">
					<Card>
						<CardHeader>
							<CardTitle>Become a member ! Sign up !</CardTitle>
							<CardDescription>
								Fill in the fields below to create your account.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<Form {...formSignupInstance}>
								<form
									onSubmit={formSignupInstance.handleSubmit(
										onSignupSubmit,
									)}
									className="space-y-8"
								>
									<FormField
										control={formSignupInstance.control}
										name="username"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Username</FormLabel>
												<FormControl>
													<Input
														placeholder="Skywalker"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={formSignupInstance.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="skywalker@gmail.com"
														{...field}
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={formSignupInstance.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														placeholder="**********"
														type="password"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button type="submit">Submit</Button>
								</form>
							</Form>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
