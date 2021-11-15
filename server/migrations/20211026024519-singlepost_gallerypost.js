"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addConstraint("Singlepost_galleryposts", {
			fields: ["gallerypost_id"],
			type: "foreign key",
			name: "fk_Singlepost_galleryposts_gallerypost_id",
			references: {
				table: "Galleryposts",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		})

		await queryInterface.addConstraint("Singlepost_galleryposts", {
			fields: ["singlepost_id"],
			type: "foreign key",
			name: "fk_Singlepost_galleryposts_singlepost_id",
			references: {
				table: "Singleposts",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeConstraint("Galleryposts", "fk_Singlepost_galleryposts_gallerypost_id")
		await queryInterface.removeConstraint("Singleposts", "fk_Singlepost_galleryposts_singlepost_id") //1:1
	},
}
