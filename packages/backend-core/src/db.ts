import { supportedPlatforms } from "@repo/definitions/schema";
import mongoose, { model, Schema } from "mongoose";
import { Types } from "mongoose";


const UserSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
});

const CredentialSchema = new Schema({
	userId: { type: Types.ObjectId, ref: "user" },
	title: { type: String, required: true },
	platform: { type: String, enum: supportedPlatforms.options, required: true },
	data: {},
});

const WorkflowSchema = new Schema({
	userId: { type: Types.ObjectId, ref: "user" },
	title: { type: String, required: true },
	enabled: { type: Boolean, required: true },

	// define as ypu go
	nodes: {},
	connections: {},
});

export const WorkflowModel = model("workflow", WorkflowSchema);
export const UserModel = model("user", UserSchema);
export const CredentialModel = model("creadetial", CredentialSchema);
export { mongoose };
