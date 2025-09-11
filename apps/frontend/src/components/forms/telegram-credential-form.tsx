import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff, Save, RefreshCw } from "lucide-react";

const telegramCredentialSchema = z.object({
	title: z.string().min(1, "Title is required"),
	apiKey: z.string().min(1, "Bot Token is required"),
});

type TelegramCredentialFormData = z.infer<typeof telegramCredentialSchema>;

interface TelegramCredentialFormProps {
	onSubmit: (data: { title: string; platform: string; data: { apiKey: string } }) => Promise<void>;
	isSubmitting?: boolean;
}

export function TelegramCredentialForm({ onSubmit, isSubmitting = false }: TelegramCredentialFormProps) {
	const [showApiKey, setShowApiKey] = useState(false);

	const form = useForm<TelegramCredentialFormData>({
		resolver: zodResolver(telegramCredentialSchema),
		defaultValues: {
			title: "",
			apiKey: "",
		},
	});

	const handleSubmit = async (data: TelegramCredentialFormData) => {
		// Transform data to match API schema
		const apiData = {
			title: data.title,
			platform: "Telegram",
			data: {
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
										placeholder="My Telegram Bot"
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
								<FormLabel className="text-foreground font-medium">Bot Token</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type={showApiKey ? "text" : "password"}
											placeholder="Enter Bot Token from @BotFather"
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
								Saving Telegram Credentials...
							</>
						) : (
							<>
								<Save className="h-4 w-4 mr-2" />
								Save Telegram Credentials
							</>
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
