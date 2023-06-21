import { DataTypes } from "sequelize";
import { sequelize } from "../utils/PgDatabase";
import { User } from "./users.model";

export const RefreshToken = sequelize.define(
	"RefreshToken",
	{
		// Model attributes are defined here
		token: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		expiry_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		timestamps: false
	}
);

User.hasMany(RefreshToken);
