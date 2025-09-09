import { JWT_SECRET } from "@repo/backend-core/credentials";
import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const token = req.headers["authorization"];
	if (!token) {
		res.status(401).json({ message: "invalid token" });
		return;
	}
	try {
		const verify = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if(verify){
            req.userId = verify._id
        }
	} catch (e) {
		console.log(e);
		res.status(401).json({ message: "invalid token" });
		return;
	}
}
