import { body, param } from "express-validator";

export const userAuthValidator = [
	body("email", "Email is required")
		.exists({
			checkFalsy: true,
			checkNull: true,
		})
		.escape(),
	// escape helps to sanitize the value
	body("password", "Password is required")
		.exists({
			checkFalsy: true,
			checkNull: true,
		})
		.escape(),
	body("provider", "Provider is required")
		.exists({
			checkFalsy: true,
			checkNull: true,
		})
		.escape(),
];

export const updateProfileValidator = [
	body("name", "Name is required")
		.exists({
			checkFalsy: true,
			checkNull: true,
		})
		.escape(),
	// escape helps to sanitize the value
	body("bio", "Bio is required")
		.exists({
			checkFalsy: true,
			checkNull: true,
		})
		.escape(),
	body("image", "Image is required")
		.exists({
			checkFalsy: true,
			checkNull: true,
		})
		.escape(),
	body("phoneNumber", "Phone Number is required")
		.exists({
			checkFalsy: true,
			checkNull: true,
		})
		.escape(),
];

export const refreshTokenValidator = [
	body("refreshToken", "Token is required")
		.exists({
			checkFalsy: true,
			checkNull: true,
		})
		.escape(),
	// escape helps to sanitize the value
];
