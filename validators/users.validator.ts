import { body, param } from "express-validator";

export const userAuthValidator = [
	body("email", "Email is required").exists({
		checkFalsy: true,
		checkNull: true,
	}).escape(),
    // escape helps to sanitize the value
	body("password", "Password is required").exists({
		checkFalsy: true,
		checkNull: true,
	}).escape(),
    body("provider", "Provider is required").exists({
		checkFalsy: true,
		checkNull: true,
	}).escape(),
];