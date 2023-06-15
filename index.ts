import app from "./app"
import dotenv from "dotenv";
// import connectDB from "./utils/db";

dotenv.config();
const port = process.env.PORT;

app.listen(port, async () => {
    // Initialize MongoDB connection
    // await connectDB();
	console.log(
		`Listening on ${port}, App is running at http://localhost:${port}`
	);
});