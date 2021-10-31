"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addConstraint("Likes", {
			fields: ["gallerypost_id"],
			type: "foreign key",
			name: "fk_Likes_gallerypost_id",
			references: {
				table: "Galleryposts",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		})

		await queryInterface.addConstraint("Comments", {
			fields: ["gallerypost_id"],
			type: "foreign key",
			name: "fk_Comments_gallerypost_id",
			references: {
				table: "Galleryposts",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeConstraint("Likes", "fk_Likes_gallerypost_id")
		await queryInterface.removeConstraint("Comments", "fk_Comments_gallerypost_id")
	},
}
