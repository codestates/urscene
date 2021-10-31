"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addConstraint("Likes", {
			fields: ["user_id"],
			type: "foreign key",
			name: "fk_Likes_user_id",
			references: {
				table: "Users",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		})

		await queryInterface.addConstraint("Singleposts", {
			fields: ["user_id"],
			type: "foreign key",
			name: "fk_Singleposts_user_id",
			references: {
				table: "Users",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		})

		await queryInterface.addConstraint("Galleryposts", {
			fields: ["user_id"],
			type: "foreign key",
			name: "fk_Galleryposts_user_id",
			references: {
				table: "Users",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		})

		await queryInterface.addConstraint("Comments", {
			fields: ["user_id"],
			type: "foreign key",
			name: "fk_Comments_user_id",
			references: {
				table: "Users",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeConstraint("Likes", "fk_Likes_user_id")
		await queryInterface.removeConstraint("Singleposts", "fk_Singleposts_user_id")
		await queryInterface.removeConstraint("Galleryposts", "fk_Galleryposts_user_id")
		await queryInterface.removeConstraint("Comments", "fk_Comments_user_id")
	},
}
