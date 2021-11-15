"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Users", [
			{
				id: 1,
				email: "final@project.com",
				password: "12341234",
				nickname: "kimcoding",
				image: "123456789.jpg",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				email: "kjssaa3@gmail.com",
				password: "12341234",
				nickname: "kang",
				image: "987654321.jpg",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				email: "sonyeonju7@gmail.com",
				password: "12341234",
				nickname: "son",
				image: "654987123.jpg",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Users", null, {})
	},
}
