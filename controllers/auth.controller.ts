import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { createUser, getUserByEmail } from "../services/users.service";
import { omit } from "lodash";
import bcrypt from "bcrypt";

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

		// Encrypt Password
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		const payload = {
			email: req.body.email,
			password: hashedPassword,
			provider: req.body.provider,
		};

		const user = await createUser(payload);

		return res.status(200).json({
			success: true,
			data: omit(user, ["password"]),
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

		return res.status(200).json({
			success: true,
			data: omit(userDetails, ["password"]),
		});
	} catch (error) {
		return next(error);
	}
};
