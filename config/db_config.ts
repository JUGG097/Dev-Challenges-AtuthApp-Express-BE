const path = require("path");
require("dotenv").config({
	path: path.resolve(__dirname, `../${process.env.NODE_ENV}.env`),
});

module.exports = {
	development: {
		username: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
		host: process.env.PGHOST,
		port: process.env.PGPORT,
		dialect: "postgres",
		dialectOptions: {
			bigNumberStrings: true,
		},
	},
	test: {
		username: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
		host: process.env.PGHOST,
		port: process.env.PGPORT,
		dialect: "postgres",
		dialectOptions: {
			bigNumberStrings: true,
		},
	},
	production: {
		username: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
		host: process.env.PGHOST,
		port: process.env.PGPORT,
		dialect: "postgres",
		dialectOptions: {
			bigNumberStrings: true,
			//   ssl: {
			//     ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
			//   }
		},
	},
};
