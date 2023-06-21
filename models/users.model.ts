import { DataTypes } from "sequelize";
import { sequelize } from "../utils/PgDatabase";

export const User = sequelize.define(
	"User",
	{
		// Model attributes are defined here
		name: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		bio: {
			type: DataTypes.STRING,
		},
		image: {
			type: DataTypes.STRING,
		},
		phoneNumber: {
			type: DataTypes.STRING,
		},
		provider: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		// Other model options go here
	}
);

// (async () => {
// 	await sequelize.sync({ force: true });
// 	// Code here
// })();

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
