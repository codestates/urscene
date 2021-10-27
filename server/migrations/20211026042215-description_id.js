"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addConstraint("Singleposts", {
			fields: ["description_id"],
			type: "foreign key",
			name: "fk_Singleposts_description_id",
			references: {
				table: "Descriptions",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeConstraint("Singleposts", "fk_Singleposts_description_id")
	},
}
