import { WorkflowModel } from "@repo/backend-core/db";
import { WorkflowSchema } from "@repo/definitions/schema";
import { json, Router } from "express";

const WorflowRouter: Router = Router();

WorflowRouter.post("/", async (req, res) => {
	//@ts-ignore
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

WorflowRouter.get("/", async (req, res) => {
	//@ts-ignore
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

WorflowRouter.get("/:id", async (req, res) => {
	const _id = req.params;
	if (_id) {
		res.status(404).json({
			message: "Invalid if",
		});
		return;
	}
	try {
		const workflow = await WorkflowModel.findById(_id);
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

WorflowRouter.put("/:id", async (req, res) => {
	//@ts-ignore
	const userId = req.userId;
	const parse = WorkflowSchema.safeParse(req.body);
	if (!parse.success) {
		res.status(404).json({ message: "Parseing failed" });
		return;
	}
	const _id = req.params;
	if (_id) {
		res.status(404).json({
			message: "Invalid if",
		});
		return;
	}
	try {
		const workflow = await WorkflowModel.findByIdAndUpdate(_id, {
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
