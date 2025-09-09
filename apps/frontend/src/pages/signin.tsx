import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/auth-form";
import { BackgroundAesthetic } from "@/components/background-aesthetic";

interface SignInData {
	email: string;
	password: string;
}

export default function SignIn() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSignIn = async (data: SignInData) => {
		setIsLoading(true);

		try {
			// TODO: Replace with actual API call
			console.log("Sign in data:", data);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Handle successful sign in
			navigate("/dashboard");
		} catch (error) {
			console.error("Sign in error:", error);
			alert("Sign in failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<BackgroundAesthetic>
			<div className="min-h-screen flex items-center justify-center p-4">
				<div className="w-full max-w-md space-y-8">
					{/* Logo/Branding */}
					<div className="text-center">
						<div className="mx-auto w-fit">
							<div className="relative">
								{/* Logo background glow */}
								<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-lg opacity-30 animate-pulse" />

								{/* Logo container */}
								<div className="relative bg-gradient-to-r from-primary to-chart-5 p-3 rounded-lg border border-border backdrop-blur-sm">
									<span className="text-2xl font-bold text-primary-foreground tracking-wider drop-shadow-lg">NtoX</span>
								</div>
							</div>
						</div>
						<p className="mt-2 text-muted-foreground text-sm">Workflow Automation Platform</p>
					</div>

					<AuthForm mode="signin" onSubmit={handleSignIn} isLoading={isLoading} />
				</div>
			</div>
		</BackgroundAesthetic>
	);
}
