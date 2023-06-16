import { Sequelize } from "sequelize";
import { PGDATABASE, PGHOST, PGPASSWORD, PGUSER } from "../config/default";

export const sequelize = new Sequelize(
	PGDATABASE,
	PGUSER,
	PGPASSWORD,
	{
		host: PGHOST,
		dialect: "postgres"
	}
);




// import pg from "pg";
// import {
// 	PGDATABASE,
// 	PGHOST,
// 	PGPASSWORD,
// 	PGPORT,
// 	PGUSER,
// } from "../config/default";

// const Pool = pg.Pool;
// export const pool = new Pool({
// 	user: PGUSER,
// 	host: PGHOST,
// 	database: PGDATABASE,
// 	password: PGPASSWORD,
// 	port: PGPORT,
// });
