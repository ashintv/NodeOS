import express from "express";
import { UserRouter } from "./routes/user";
import { WorkflowRouter } from "./routes/workflow";
import { CredentialRouter } from "./routes/credential";
import { WebhookRouter } from "./routes/webhook";
import { mongoose } from "@repo/backend-core/db";
import { config } from "dotenv";
config()
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors())

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/workflow", WorkflowRouter);
app.use("/api/v1/credential", CredentialRouter);
app.use("/api/v1/webhook", WebhookRouter);

async function Starserver() {
    await mongoose.connect("mongodb://localhost:27017/x4x_db");
	app.listen(3000, () => {
		console.log("Server started successfully");
	});
}

Starserver();
