import express from "express";
import {
	updateProfileValidator,
	userAuthValidator,
} from "../validators/users.validator";
import { userLogIn, userSignUp } from "../controllers/auth.controller";
import { authenticateJWT } from "../middlewares/JwtAuthentication";
import {
	userProfileDetails,
	userProfileUpdate,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/auth/signup", userAuthValidator, userSignUp);

router.post("/auth/login", userAuthValidator, userLogIn);

router.get("/user/profile", authenticateJWT, userProfileDetails);

router.put(
	"/user/editProfile",
	authenticateJWT,
	updateProfileValidator,
	userProfileUpdate
);

export default router;
