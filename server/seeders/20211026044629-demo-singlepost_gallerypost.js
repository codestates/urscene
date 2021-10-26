"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Singlepost_galleryposts", [
			{
				id: 1,
				singlepost_id: 1,
				gallerypost_id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Singlepost_galleryposts", null, {})
	},
}
