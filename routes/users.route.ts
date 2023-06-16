import express from "express";
import { userAuthValidator } from "../validators/users.validator";
import { userLogIn, userSignUp } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", userAuthValidator, userSignUp);

router.post("/login", userAuthValidator, userLogIn);

export default router;