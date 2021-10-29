const Sequelize = require("sequelize")
const Op = Sequelize.Op
const axios = require("axios")

const { User } = require("./models")
// const User = require("./models/user") 이건 안 된다 왤까..
const { Description } = require("./models")
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = {
	getUserById: async (id) => await User.findOne({ where: { id } }),
	getUserByEmail: async (email) => await User.findOne({ where: { email } }),
	getUserByName: async (nickname) => await User.findOne({ where: { nickname } }),
	addUser: async (data) => await User.create(data),
	authenticateUser: async (email, password) => await Users.findOne({ where: { email, password } }),
	deleteUser: async (_id) => await User.deleteOne({ where: { _id } }),
	updatePassword: async (_id, password) => await User.updateOne({ _id }, { $set: { password } }),
	getverify: async (token) => {
		userinfo = jwt.verify(token, process.env.ACCESS_SECRET)
		return userinfo
	},
	// 타이틀에 있는 단어가 포함되는 건 다 찾아주기
	getDescriptionByKorTitle: async (title) =>
		await Description.findAll({
			raw: true,
			attributes: ["id", "title", "title_eng", "genre", "director", "released"],
			where: {
				title: {
					[Op.like]: "%" + title + "%",
				},
			},
		}),
	addDescription: async (title) =>
		await Description.findAll({
			raw: true,
			attributes: ["id", "title", "title_eng", "genre", "director", "released"],
			where: {
				title_eng: {
					[Op.like]: "%" + title + "%",
				},
			},
		}),
	insertDescriptionToDB: async (data) => {
		data.forEach(async (el) => {
			await Description.create(el)
		})
	},
}
