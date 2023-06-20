import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { getUserByEmail, getUserById } from "../services/users.service";
import { omit } from "lodash";
import { getRefreshTokenByToken } from "../services/refreshToken.service";
import { signJWT } from "../utils/JwtHelpers";

export const refreshJWT = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// Check for valdation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json({ success: false, message: errors.array() });
		}

		// Check if token exists
		const token = await getRefreshTokenByToken(req.body.refreshToken);
		if (!token) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid token" });
		}

		// Check if token is expired
		if (Date.now() > token["expiry_date"]) {
			return res
				.status(400)
				.json({ success: false, message: "Token expired" });
		}

		// Get User associated with the token
		const userDetails = await getUserById(token["UserId"]);
		if (!userDetails) {
			return res
				.status(400)
				.json({ success: false, message: "User not found" });
		}

		// Generate JWT
		const authToken = signJWT(userDetails["email"]);
		if (!token) {
			return res
				.status(400)
				.json({ success: false, message: "Token generation failed" });
		}

		return res.status(200).json({
			success: true,
			authToken,
			refreshToken: req.body.refreshToken,
		});
	} catch (error) {
		return next(error);
	}
};
