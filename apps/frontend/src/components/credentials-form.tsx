import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Key, Plus, Trash2, Eye, EyeOff, Save, RefreshCw } from "lucide-react";

const credentialSchema = z.object({
	name: z.string().min(1, "Name is required"),
	type: z.string().min(1, "Type is required"),
	apiKey: z.string().min(1, "API Key is required"),
	baseUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
	description: z.string().optional(),
});

type CredentialFormData = z.infer<typeof credentialSchema>;

interface Credential {
	id: string;
	name: string;
	type: string;
	createdAt: string;
	status: "active" | "inactive";
}

const mockCredentials: Credential[] = [
	{
		id: "1",
		name: "Gmail API",
		type: "Google",
		createdAt: "2025-01-10",
		status: "active",
	},
	{
		id: "2",
		name: "Slack Webhook",
		type: "Slack",
		createdAt: "2025-01-09",
		status: "active",
	},
	{
		id: "3",
		name: "Database Connection",
		type: "PostgreSQL",
		createdAt: "2025-01-08",
		status: "inactive",
	},
];

export function CredentialsForm() {
	const [credentials, setCredentials] = useState<Credential[]>(mockCredentials);
	const [showApiKey, setShowApiKey] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<CredentialFormData>({
		resolver: zodResolver(credentialSchema),
		defaultValues: {
			name: "",
			type: "",
			apiKey: "",
			baseUrl: "",
			description: "",
		},
	});

	const onSubmit = async (data: CredentialFormData) => {
		setIsSubmitting(true);

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Add new credential to the list
			const newCredential: Credential = {
				id: Date.now().toString(),
				name: data.name,
				type: data.type,
				createdAt: new Date().toISOString().split("T")[0],
				status: "active",
			};

			setCredentials((prev) => [newCredential, ...prev]);
			form.reset();
		} catch (error) {
			console.error("Error saving credential:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const deleteCredential = (id: string) => {
		setCredentials((prev) => prev.filter((cred) => cred.id !== id));
	};

	const testConnection = async (id: string) => {
		// Simulate connection test
		console.log("Testing connection for credential:", id);
	};

	return (
		<div className="h-full flex flex-col">
			{/* Header */}
			<div className="p-4 border-b border-border">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-xl font-bold text-foreground">Credentials Manager</h2>
						<p className="text-muted-foreground text-sm">Manage your API keys and service connections</p>
					</div>
					<div className="flex items-center space-x-2">
						<Badge variant="outline" className="text-foreground border-border">
							{credentials.length} credentials
						</Badge>
					</div>
				</div>
			</div>

			<div className="flex-1 overflow-auto p-4 space-y-6">
				{/* Add New Credential Form */}
				<Card className="backdrop-blur-xl bg-card/95 border-border">
					<CardHeader>
						<CardTitle className="text-card-foreground flex items-center space-x-2">
							<Plus className="h-5 w-5" />
							<span>Add New Credential</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-foreground font-medium">Credential Name</FormLabel>
												<FormControl>
													<Input
														placeholder="My API Credential"
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
										name="type"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-foreground font-medium">Service Type</FormLabel>
												<Select onValueChange={field.onChange} defaultValue={field.value}>
													<FormControl>
														<SelectTrigger className="bg-input/50 border-border text-foreground focus:border-ring">
															<SelectValue placeholder="Select a service type" />
														</SelectTrigger>
													</FormControl>
													<SelectContent className="bg-popover border-border text-popover-foreground">
														<SelectItem value="Google">Google Services</SelectItem>
														<SelectItem value="Slack">Slack</SelectItem>
														<SelectItem value="GitHub">GitHub</SelectItem>
														<SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
														<SelectItem value="MongoDB">MongoDB</SelectItem>
														<SelectItem value="Custom">Custom API</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage className="text-destructive" />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name="apiKey"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground font-medium">API Key / Token</FormLabel>
											<FormControl>
												<div className="relative">
													<Input
														type={showApiKey ? "text" : "password"}
														placeholder="Enter your API key or token"
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
											<FormDescription className="text-muted-foreground">
												Your API key will be encrypted and stored securely
											</FormDescription>
											<FormMessage className="text-destructive" />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="baseUrl"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground font-medium">Base URL (Optional)</FormLabel>
											<FormControl>
												<Input
													placeholder="https://api.example.com"
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
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground font-medium">Description (Optional)</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Describe what this credential is used for..."
													{...field}
													className="bg-input/50 border-border text-foreground placeholder:text-muted-foreground focus:border-ring resize-none"
													rows={3}
												/>
											</FormControl>
											<FormMessage className="text-destructive" />
										</FormItem>
									)}
								/>

								<Button
									type="submit"
									disabled={isSubmitting}
									className="bg-gradient-to-r from-primary to-chart-5 hover:from-primary/90 hover:to-chart-5/90 text-primary-foreground">
									{isSubmitting ? (
										<>
											<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
											Saving...
										</>
									) : (
										<>
											<Save className="h-4 w-4 mr-2" />
											Save Credential
										</>
									)}
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>

				<Separator className="bg-border" />

				{/* Existing Credentials */}
				<Card className="backdrop-blur-xl bg-card/95 border-border">
					<CardHeader>
						<CardTitle className="text-card-foreground flex items-center space-x-2">
							<Key className="h-5 w-5" />
							<span>Existing Credentials</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{credentials.map((credential) => (
								<div
									key={credential.id}
									className="flex items-center justify-between p-4 bg-muted/30 border border-border rounded-lg hover:bg-muted/50 transition-colors">
									<div className="flex items-center space-x-4">
										<div
											className={`w-3 h-3 rounded-full ${
												credential.status === "active" ? "bg-emerald-500" : "bg-muted-foreground"
											} animate-pulse`}
										/>
										<div>
											<h4 className="text-foreground font-medium">{credential.name}</h4>
											<p className="text-muted-foreground text-sm">
												{credential.type} • Created {credential.createdAt}
											</p>
										</div>
									</div>
									<div className="flex items-center space-x-2">
										<Badge
											variant={credential.status === "active" ? "default" : "secondary"}
											className={
												credential.status === "active" ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300" : ""
											}>
											{credential.status}
										</Badge>
										<Button
											size="sm"
											variant="ghost"
											onClick={() => testConnection(credential.id)}
											className="text-muted-foreground hover:text-foreground hover:bg-accent">
											<RefreshCw className="h-4 w-4" />
										</Button>
										<Button
											size="sm"
											variant="ghost"
											onClick={() => deleteCredential(credential.id)}
											className="text-destructive hover:text-destructive/80 hover:bg-destructive/10">
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
