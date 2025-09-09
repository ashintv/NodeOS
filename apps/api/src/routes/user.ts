import { UserSchema } from "@repo/definitions/schema";
import { Router } from "express";
import { UserModel } from "@repo/backend-core/db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-core/credentials";
export const UserRouter: Router = Router();

UserRouter.post("/signup", async (req, res) => {
	const parse = UserSchema.safeParse(req.body);
	if (parse.error) {
		res.send("ParseFailed");
		return;
	}
	const { email, password } = parse.data;
	try {
		const user = await UserModel.findOne({ email });
		if (user) {
			res.status(404).json({ message: "User with email already exist" });
			return;
		}
		const new_user = await UserModel.create({ email, password });
		res.json({
			userId: new_user._id,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "error" });
	}
});




UserRouter.post("/signin", async (req, res) => {
	const parse = UserSchema.safeParse(req.body);
	if (parse.error) {
		res.send("ParseFailed");
		return;
	}
	const { email, password } = parse.data;
	try {
		const user = await UserModel.findOne({ email, password });
		if (!user) {
			res.status(404).json({ message: "Invalid creadentials" });
			return;
		}
		const token = jwt.sign({ email: user.email }, JWT_SECRET);
		res.json({
			token,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "error" });
	}
});
