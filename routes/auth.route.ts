import express from "express";
import {
	refreshTokenValidator,
	userAuthValidator,
} from "../validators/users.validator";
import { userLogIn, userSignUp } from "../controllers/auth.controller";
import { refreshJWT } from "../controllers/refreshToken.controller";

const router = express.Router();

router.post("/signup", userAuthValidator, userSignUp);

router.post("/login", userAuthValidator, userLogIn);

router.post("/refreshToken", refreshTokenValidator, refreshJWT);

export default router;