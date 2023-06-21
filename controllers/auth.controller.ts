import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { createUser, getUserByEmail } from "../services/users.service";
import { omit } from "lodash";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { signJWT } from "../utils/JwtHelpers";
import { createRefreshToken } from "../services/refreshToken.service";

export const userSignUp = async (
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

		// Check if user exists
		const userDetails = await getUserByEmail(req.body.email);
		if (userDetails) {
			return res
				.status(400)
				.json({ success: false, message: "User Already Exists" });
		}

		// Encrypt Password
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		const payload = {
			email: req.body.email,
			password: hashedPassword,
			provider: req.body.provider,
		};

		const user = await createUser(payload);

		// Generate JWT token
		const token = signJWT(user["email"]);
		if (!token) {
			return res
				.status(400)
				.json({ success: false, message: "Token generation failed" });
		}

		return res.status(200).json({
			success: true,
			data: omit(user, ["password"]),
			authToken: token,
		});
	} catch (error) {
		return next(error);
	}
};

export const userLogIn = async (
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

		// Check if user exists
		const userDetails = await getUserByEmail(req.body.email);
		if (!userDetails) {
			return res
				.status(400)
				.json({ success: false, message: "User not found" });
		}

		// Compare passwords
		const isPasswordMatch = await bcrypt.compare(
			req.body.password,
			userDetails["password"]
		);
		if (!isPasswordMatch) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid credentials" });
		}

		// Generate JWT token
		const authToken = signJWT(userDetails["email"]);
		if (!authToken) {
			return res
				.status(400)
				.json({ success: false, message: "Token generation failed" });
		}

		// Generate refresh token
		const tokenPayload = {
			UserId: userDetails["id"],
			token: crypto.randomUUID(),
			// expires 24 hours from now
			expiry_date: new Date(Date.now() + 86400000),
		};
		const refreshToken = await createRefreshToken(tokenPayload);

		return res.status(200).json({
			success: true,
			data: omit(userDetails, ["password"]),
			authToken,
			refreshToken: refreshToken["token"],
		});
	} catch (error) {
		return next(error);
	}
};
