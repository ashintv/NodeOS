import { Router } from "express";

export const WebhookRouter: Router = Router();

WebhookRouter.get("/webhook/handler/:id", (req, res) => {
	console.log("Huttttt");
	res.send("sucess");
});
