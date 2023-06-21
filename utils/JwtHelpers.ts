import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SECRET } from "../config/default";

export const signJWT = (userEmail: string) => {
	try {
		return jwt.sign(
			{
				email: userEmail,
			},
			JWT_SECRET,
			{
				expiresIn: JWT_EXPIRATION,
			}
		);
	} catch (error) {
		return null;
	}
};

export const verifyJWS = (token: string) => {
	try {
		return jwt.verify(token, JWT_SECRET, {
		});
	} catch (error) {
		return null;
	}
};
