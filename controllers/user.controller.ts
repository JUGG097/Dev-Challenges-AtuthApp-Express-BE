import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import { getUserByEmail, updateUser } from "../services/users.service";
import { omit } from "lodash";
import { CustomRequest } from "../utils/Types";

export const userProfileDetails = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		// Check if userDetails is already set
		if (!req.userDetails) {
			return res
				.status(400)
				.json({ success: false, message: "User not found" });
		}

		// Check if user exists
		const userDetails = await getUserByEmail(req.userDetails["email"]);
		if (!userDetails) {
			return res
				.status(400)
				.json({ success: false, message: "User not found" });
		}

		return res.status(200).json({
			success: true,
			data: omit(userDetails, ["password"]),
		});
	} catch (error) {
		return next(error);
	}
};

export const userProfileUpdate = async (
	req: CustomRequest,
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

		// Check if userDetails is already set
		if (!req.userDetails) {
			return res
				.status(400)
				.json({ success: false, message: "User not found" });
		}

		const payload = {
			name: req.body.name,
			image: req.body.image,
			bio: req.body.bio,
			phoneNumber: req.body.phoneNumber,
		};

		// Update user details
		const updatedUserDetails = await updateUser(
			req.userDetails["email"],
			payload
		);
		if (!updatedUserDetails) {
			return res
				.status(400)
				.json({ success: false, message: "User not found" });
		}

		return res.status(200).json({
			success: true,
			data: omit(updatedUserDetails, ["password"]),
		});
	} catch (error) {
		return next(error);
	}
};
