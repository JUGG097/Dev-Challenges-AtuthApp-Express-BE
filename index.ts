import { exit } from "process";
import app from "./app";
import { PORT } from "./config/default";
import { sequelize } from "./utils/PgDatabase";

app.listen(PORT, async () => {
	// Initialize and Test Sequelize PostGres connection
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}

	// Sync models wth DB
	sequelize
		.sync()
		.then(() => {
			console.log("Synced db.");
		})
		.catch((err) => {
			console.log("Failed to sync db: " + err.message);
			exit(1)
		});
	
	// Confirm server port
	console.log(
		`Listening on ${PORT}, App is running at http://localhost:${PORT}`
	);
});
