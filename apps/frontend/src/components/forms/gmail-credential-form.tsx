import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff, Save, RefreshCw } from "lucide-react";

const gmailCredentialSchema = z.object({
	title: z.string().min(1, "Title is required"),
	email: z.string().email("Valid email is required"),
	apiKey: z.string().min(1, "API Key is required"),
});

type GmailCredentialFormData = z.infer<typeof gmailCredentialSchema>;

interface GmailCredentialFormProps {
	onSubmit: (data: { title: string; platform: string; data: { email: string; apiKey: string } }) => Promise<void>;
	isSubmitting?: boolean;
}

export function GmailCredentialForm({ onSubmit, isSubmitting = false }: GmailCredentialFormProps) {
	const [showApiKey, setShowApiKey] = useState(false);

	const form = useForm<GmailCredentialFormData>({
		resolver: zodResolver(gmailCredentialSchema),
		defaultValues: {
			title: "",
			email: "",
			apiKey: "",
		},
	});

	const handleSubmit = async (data: GmailCredentialFormData) => {
		// Transform data to match API schema
		const apiData = {
			title: data.title,
			platform: "Gmail",
			data: {
				email: data.email,
				apiKey: data.apiKey,
			},
		};
		await onSubmit(apiData);
		form.reset();
	};

	return (
		<div className="space-y-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-foreground font-medium">Credential Title</FormLabel>
								<FormControl>
									<Input
										placeholder="My Gmail API"
										{...field}
										className="bg-input/50 border-border text-foreground placeholder:text-muted-foreground focus:border-ring"
									/>
								</FormControl>
								<FormMessage className="text-destructive" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-foreground font-medium">Gmail Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="your-email@gmail.com"
										{...field}
										className="bg-input/50 border-border text-foreground placeholder:text-muted-foreground focus:border-ring"
									/>
								</FormControl>
								<FormMessage className="text-destructive" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="apiKey"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-foreground font-medium">API Key</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type={showApiKey ? "text" : "password"}
											placeholder="Enter Gmail API Key"
											{...field}
											className="bg-input/50 border-border text-foreground placeholder:text-muted-foreground focus:border-ring pr-10"
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
											onClick={() => setShowApiKey(!showApiKey)}>
											{showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
										</Button>
									</div>
								</FormControl>
								<FormMessage className="text-destructive" />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-gradient-to-r from-primary to-chart-5 hover:from-primary/90 hover:to-chart-5/90 text-primary-foreground">
						{isSubmitting ? (
							<>
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
								Saving Gmail Credentials...
							</>
						) : (
							<>
								<Save className="h-4 w-4 mr-2" />
								Save Gmail Credentials
							</>
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
