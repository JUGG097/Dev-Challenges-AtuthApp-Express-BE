import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import logger from "morgan";
import createError from "http-errors";
import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.get("/check", (req: Request, res: Response) => {
	res.status(200).json({ success: true, message: "Server is up and running" });
});

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
	next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	// res.status(err.status || 500);
	res.status(err.status || 500);
	res.json({ success: false, error: err.message });
});

export default app;