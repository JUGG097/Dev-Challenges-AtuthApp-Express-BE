import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface updatePayload {
	name?: string;
	image?: string;
	phoneNumber?: string;
	bio?: string;
}

export interface createPayload extends updatePayload {
	email: string;
	password: string;
	provider: string;
}

export interface CustomRequest extends Request {
	userDetails?: string | JwtPayload | any;
}
