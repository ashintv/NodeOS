import { excuteWorkflow } from '../executer/excetuter';
import { Router } from "express";


export const WebhookRouter: Router = Router();

WebhookRouter.get("/webhook/handler/:id", async (req, res) => {
	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Cache-Control", "no-cache");
	res.setHeader("Connection", "keep-alive");
	const { id } = req.params;
	excuteWorkflow(id, res);
	
});
