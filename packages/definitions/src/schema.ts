import { z } from "zod";

export const UserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(3, "Invalid password (3 char)"),
});

export const supportedPlatforms = z.enum(["TELEGRAM", "WHATSAPP", "EMAIL"]);
export type SupportedPlatforms = z.infer<typeof supportedPlatforms>;

export const CredentialSchema = z.object({
	title: z.string().min(1, "Title is required"),
	platform: supportedPlatforms,
	data: z.any(),
});

export const WorkflowSchema = z.object({
	title: z.string().min(1, "Title is required"),
	enabled: z.boolean(),
	nodes: z.any(),
	connections: z.any(),
});

export type Workflow = z.infer<typeof WorkflowSchema>