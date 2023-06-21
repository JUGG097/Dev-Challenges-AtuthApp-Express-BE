"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable("RefreshTokens", {
			id:  {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			token: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			UserId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Users",
					key: "id",
				},
			},
			expiry_date: { type: Sequelize.DATE, allowNull: false },
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.dropTable("RefreshTokens");
	},
};
