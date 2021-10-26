"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Likes", [
			{
				id: 1,
				user_id: 1,
				gallerypost_id: 1,
				singlepost_id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Likes", null, {})
	},
}
