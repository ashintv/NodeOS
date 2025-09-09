import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Schema for sign-in form
const signInSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

// Schema for sign-up form
const signUpSchema = z
	.object({
		name: z.string().min(2, "Name must be at least 2 characters"),
		email: z.string().email("Please enter a valid email address"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string().min(6, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

interface AuthFormProps {
	mode: "signin" | "signup";
	onSubmit: (data: any) => void;
	isLoading?: boolean;
}

export function AuthForm({ mode, onSubmit, isLoading = false }: AuthFormProps) {
	const isSignUp = mode === "signup";

	const form = useForm<SignInFormData | SignUpFormData>({
		resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
		defaultValues: isSignUp ? { name: "", email: "", password: "", confirmPassword: "" } : { email: "", password: "" },
	});

	const handleSubmit = (data: SignInFormData | SignUpFormData) => {
		onSubmit(data);
	};

	return (
		<Card className="w-full max-w-md backdrop-blur-xl bg-card/95 border-border shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center text-card-foreground">
					{isSignUp ? "Create Account" : "Welcome Back"}
				</CardTitle>
				<CardDescription className="text-center text-muted-foreground">
					{isSignUp ? "Sign up to get started with your workflow automation" : "Sign in to your account"}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
						{isSignUp && (
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground font-medium">Full Name</FormLabel>
										<FormControl>
											<Input
												placeholder="John Doe"
												{...field}
												disabled={isLoading}
												className="bg-input/50 border-border text-foreground placeholder:text-muted-foreground focus:border-ring"
											/>
										</FormControl>
										<FormMessage className="text-destructive" />
									</FormItem>
								)}
							/>
						)}

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-foreground font-medium">Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="john@example.com"
											{...field}
											disabled={isLoading}
											className="bg-input/50 border-border text-foreground placeholder:text-muted-foreground focus:border-ring"
										/>
									</FormControl>
									<FormMessage className="text-destructive" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-foreground font-medium">Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="••••••••"
											{...field}
											disabled={isLoading}
											className="bg-input/50 border-border text-foreground placeholder:text-muted-foreground focus:border-ring"
										/>
									</FormControl>
									<FormMessage className="text-destructive" />
								</FormItem>
							)}
						/>

						{isSignUp && (
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground font-medium">Confirm Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="••••••••"
												{...field}
												disabled={isLoading}
												className="bg-input/50 border-border text-foreground placeholder:text-muted-foreground focus:border-ring"
											/>
										</FormControl>
										<FormMessage className="text-destructive" />
									</FormItem>
								)}
							/>
						)}

						<Button
							type="submit"
							className="w-full bg-gradient-to-r from-primary to-chart-5 hover:from-primary/90 hover:to-chart-5/90 text-primary-foreground font-semibold py-2 px-4 rounded-md transition-all duration-200 shadow-lg hover:shadow-xl"
							disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Please wait...
								</>
							) : isSignUp ? (
								"Create Account"
							) : (
								"Sign In"
							)}
						</Button>
					</form>
				</Form>

				<div className="mt-4 text-center text-sm">
					{isSignUp ? (
						<>
							<span className="text-muted-foreground">Already have an account?</span>{" "}
							<Link to="/signin" className="text-primary hover:text-primary/80 hover:underline transition-colors">
								Sign in
							</Link>
						</>
					) : (
						<>
							<span className="text-muted-foreground">Don't have an account?</span>{" "}
							<Link to="/signup" className="text-primary hover:text-primary/80 hover:underline transition-colors">
								Sign up
							</Link>
						</>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
