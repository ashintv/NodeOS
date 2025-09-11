import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/auth-form";
import { BackgroundAesthetic } from "@/components/background-aesthetic";
import { BASE_URL } from "@/config";
import axios from "axios";

interface SignUpData {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export default function SignUp() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const backend_url = BASE_URL;

	const handleSignUp = async (data: SignUpData) => {
		setIsLoading(true);

		try {
			await axios.post(BASE_URL + "/user/signup", {
				email: data.email,
				password: data.password,
			});

			const response = await axios.post(BASE_URL + "/user/signin", {
				email: data.email,
				password: data.password,
			});
			localStorage.setItem("token", response.data.token);
			navigate("/dashboard");
		} catch (error) {
			console.error("Sign up error:", error);
			alert("Sign up failed. Please try again.");
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

					<AuthForm mode="signup" onSubmit={handleSignUp} isLoading={isLoading} />
				</div>
			</div>
		</BackgroundAesthetic>
	);
}
