import { Response, NextFunction } from "express";
import { verifyJWS } from "../utils/JwtHelpers";
import { CustomRequest } from "../utils/Types";

export const authenticateJWT = (
	// Custom Request allowed me to added the decoded token to the request object
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		const decodedToken = verifyJWS(token);
		if (!decodedToken) {
			return res.status(401).json({
				sucess: false,
				message: "Authentication Failed: Invalid Token.",
			});
		}
		req.userDetails = decodedToken;
		return next();
	} else {
		return res.status(401).json({
			sucess: false,
			message: "Authentication Failed: No token provided.",
		});
	}
};
