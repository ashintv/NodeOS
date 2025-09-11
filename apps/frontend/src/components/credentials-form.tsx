import { use, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Key, Plus, Trash2, RefreshCw } from "lucide-react";
import { GmailCredentialForm, TelegramCredentialForm } from "@/components/forms";
import axios from "axios";
import { BASE_URL } from "@/config";

type CredentialType = "Gmail" | "Telegram" | "";

interface Credential {
	id: string;
	title: string;
	platform: string;
	status: "active" | "inactive";
}

export function CredentialsForm() {
	const [credentials, setCredentials] = useState<Credential[]>([]);

	async function fetchCredentials() {
		const response = await axios.get(BASE_URL + "/credential", {
			headers: {
				token: localStorage.getItem("token"),
			},
		});
		if (response.status === 200) {
			setCredentials(response.data.credentials);
		}
	}

	useEffect(() => {
		fetchCredentials();
	}, []);

	const [selectedCredentialType, setSelectedCredentialType] = useState<CredentialType>("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleCredentialSubmit = async (data: { title: string; platform: string; data: any }) => {
		setIsSubmitting(true);

		try {
			console.log("Sending credential data:", data);
			await axios.post(BASE_URL + "/credential", data, {
				headers: {
					token: localStorage.getItem("token"),
				},
			});
			fetchCredentials();
			setSelectedCredentialType(""); // Reset form selection
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
				{/* Credential Type Selector and Form */}
				<Card className="backdrop-blur-xl bg-card/95 border-border">
					<CardHeader>
						<CardTitle className="text-card-foreground flex items-center space-x-2">
							<Plus className="h-5 w-5" />
							<span>Add New Credential</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							{/* Credential Type Selector */}
							<div>
								<label className="text-foreground font-medium text-sm">Select Credential Type</label>
								<Select
									onValueChange={(value: CredentialType) => setSelectedCredentialType(value)}
									value={selectedCredentialType}>
									<SelectTrigger className="bg-input/50 border-border text-foreground focus:border-ring mt-2">
										<SelectValue placeholder="Choose a credential type" />
									</SelectTrigger>
									<SelectContent className="bg-popover border-border text-popover-foreground">
										<SelectItem value="Gmail">Gmail API</SelectItem>
										<SelectItem value="Telegram">Telegram Bot</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Conditional Form Rendering */}
							{selectedCredentialType === "Gmail" && (
								<div>
									<div className="flex items-center space-x-2 mb-4">
										<div className="h-0.5 bg-border flex-1"></div>
										<span className="text-sm text-muted-foreground px-2">Gmail Credentials</span>
										<div className="h-0.5 bg-border flex-1"></div>
									</div>
									<GmailCredentialForm onSubmit={handleCredentialSubmit} isSubmitting={isSubmitting} />
								</div>
							)}

							{selectedCredentialType === "Telegram" && (
								<div>
									<div className="flex items-center space-x-2 mb-4">
										<div className="h-0.5 bg-border flex-1"></div>
										<span className="text-sm text-muted-foreground px-2">Telegram Bot Credentials</span>
										<div className="h-0.5 bg-border flex-1"></div>
									</div>
									<TelegramCredentialForm onSubmit={handleCredentialSubmit} isSubmitting={isSubmitting} />
								</div>
							)}

							{selectedCredentialType && (
								<Button
									variant="outline"
									onClick={() => setSelectedCredentialType("")}
									className="w-full border-border text-foreground hover:bg-accent">
									Cancel & Choose Different Type
								</Button>
							)}
						</div>
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
											<h4 className="text-foreground font-medium">{credential.title}</h4>
											<p className="text-muted-foreground text-sm">{credential.platform}</p>
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
