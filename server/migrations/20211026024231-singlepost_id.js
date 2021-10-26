"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addConstraint("Likes", {
			fields: ["singlepost_id"],
			type: "foreign key",
			name: "fk_Likes_singlepost_id",
			references: {
				table: "Singleposts",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		})

		await queryInterface.addConstraint("Comments", {
			fields: ["singlepost_id"],
			type: "foreign key",
			name: "fk_Comments_singlepost_id",
			references: {
				table: "Singleposts",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeConstraint("Likes", "fk_Likes_singlepost_id")
		await queryInterface.removeConstraint("Comments", "fk_Comments_singlepost_id")
	},
}
