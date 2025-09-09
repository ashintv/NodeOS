import { WorkflowModel } from "@repo/backend-core/db";
import { WorkflowSchema } from "@repo/definitions/schema";
import { json, Router } from "express";

export const WorkflowRouter: Router = Router();

WorkflowRouter.post("/", async (req, res) => {
	const userId = req.userId;
	const parse = WorkflowSchema.safeParse(req.body);
	if (!parse.success) {
		res.status(404).json({ message: "Parseing failed" });
		return;
	}
	try {
		const model = await WorkflowModel.create({
			...parse.data,
			userId,
		});
		res.json({ _id: model._id });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "DB failed" });
	}
});

WorkflowRouter.get("/", async (req, res) => {
	const userId = req.userId;
	try {
		const workflows = await WorkflowModel.find({
			userId,
		});
		res.json({
			workflows,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "DB failed" });
	}
});

WorkflowRouter.get("/:id", async (req, res) => {
	const {id} = req.params;
	if (!id) {
		res.status(404).json({
			message: "Invalid if",
		});
		return;
	}
	try {
		const workflow = await WorkflowModel.findById(id);
		if (!workflow) {
			res.status(404).json({
				message: "Invalid if",
			});
			return;
		}
		res.json({ workflow });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "DB failed" });
	}
});



WorkflowRouter.put("/:id", async (req, res) => {
	const userId = req.userId;
	const parse = WorkflowSchema.safeParse(req.body);
	if (!parse.success) {
		res.status(404).json({ message: "Parseing failed" });
		return;
	}
	const {id } = req.params;
	console.log(id);
	if (!id) {
		res.status(404).json({
			message: "Invalid id",
		});
		return;
	}
	try {
		const workflow = await WorkflowModel.findByIdAndUpdate(id, {
			...parse.data,
			userId,
		});
		if (!workflow) {
			res.status(404).json({
				message: "Invalid if",
			});
			return;
		}
		res.json({ workflow });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "DB failed" });
	}
});
