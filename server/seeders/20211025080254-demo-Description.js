"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Descriptions", [
			{
				id: 1,
				title: "예스맨",
				genre: "코미디",
				director: "노우맨",
				released: "2039",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Descriptions", null, {})
	},
}
