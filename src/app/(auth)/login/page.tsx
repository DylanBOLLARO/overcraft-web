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

import { Label } from "@/src/components/ui/label";
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

export default function LoginPage() {
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

	async function onSigninSubmit(values: z.infer<typeof formSignin>) {
		console.log("onSigninSubmit");
		// const { status, statusText, data }: any = await fetch(SIGNIN, {
		// 	...values,
		// });
		// switch (status) {
		// 	case 201:
		// 		dispatch(refresh(data));
		// 		break;
		// 	case 409:
		// 		setAlert(true);
		// 		setAlertData({
		// 			type: "destructive",
		// 			title: "Error",
		// 			message: statusText,
		// 		});
		// 		break;
		// 	default:
		// 		break;
		// }
	}

	async function onSignupSubmit(values: z.infer<typeof formSignup>) {
		console.log("onSignupSubmit");

		// const { status, statusText } = await fetch(SIGNUP, { ...values });
		// switch (status) {
		// 	case 201:
		// 		setAlert(true);
		// 		setAlertData({
		// 			type: "default",
		// 			title: "Succes",
		// 			message: statusText,
		// 		});
		// 		break;
		// 	case 409:
		// 		setAlert(true);
		// 		setAlertData({
		// 			type: "destructive",
		// 			title: "Error",
		// 			message: statusText,
		// 		});
		// 		break;
		// 	default:
		// 		break;
		// }
	}

	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<Link
				href="/"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute left-4 top-4 md:left-8 md:top-8",
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
