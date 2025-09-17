import { Router } from "express";
import { excuteWorkflow } from "../executer";

export const WebhookRouter: Router = Router();

WebhookRouter.get("/webhook/handler/:id", async (req, res) => {
	const { id } = req.params;
	const result = await excuteWorkflow(id , res);
	res.json({
		result,
	});
});
