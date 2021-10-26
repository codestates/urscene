"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("galleryposts", [
			{
				id: 1,
				user_id: 1,
				title: "너무행복한 장면들",
				content: "정말 재미있었던 장면들만",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				user_id: 2,
				title: "너무 오싹한이야기들..",
				content: "여름에 너무추웠어요",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				user_id: 3,
				title: "전쟁터의 잔혹함",
				content: "실제로 전쟁이나면 진짜 무서울듯",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				user_id: 1,
				title: "진짜 배꼽빠지게웃긴",
				content: "눈물이 났어요...웃겨서",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("galleryposts", null, {})
	},
}
