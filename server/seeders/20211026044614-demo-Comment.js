"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Comments", [
			{
				id: 1,
				user_id: 1,
				comment: "소름끼치게 섬뜩했어요",
				singlepost_id: 1,
				gallerypost_id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Comments", null, {})
	},
}
