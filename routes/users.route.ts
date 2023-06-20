import express from "express";
import {
	updateProfileValidator,
} from "../validators/users.validator";
import { authenticateJWT } from "../middlewares/JwtAuthentication";
import {
	userProfileDetails,
	userProfileUpdate,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/profile", authenticateJWT, userProfileDetails);

router.put(
	"/editProfile",
	authenticateJWT,
	updateProfileValidator,
	userProfileUpdate
);

export default router;
