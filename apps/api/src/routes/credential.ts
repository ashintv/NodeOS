import { CredentialModel } from "@repo/backend-core/db";
import { CredentialSchema } from "@repo/definitions/schema";
import { Router } from "express";

const credentialRouter: Router = Router();

credentialRouter.post("/", async (req, res) => {
	const userId = req.userId;
	const parse = CredentialSchema.safeParse(req.body);
	if (!parse.success) {
		res.status(404).json({ message: "invalid schema" });
		return;
	}
	try {
		const credential = await CredentialModel.create({ ...parse.data, userId });
		res.json({
			id: credential._id,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "S" });
	}
});

credentialRouter.delete("/", (req, res) => {
	const userId = req.userId;
	const _id = req.body._id;
	if (!_id) {
		res.status(403).json({ message: "invalid id or id not provided" });
	}
	try {
		const response = CredentialModel.deleteOne({
			_id: _id,
            userId
		});
		if (!response) {
			res.status(401).json({ message: "invalid id" });
			return;
		}
		res.status(200).json({ message: "Success" });
	} catch (e) {
		console.log(e);
		res.status(501).json({ message: "unable to delete" });
	}
});
