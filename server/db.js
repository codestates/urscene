const Sequelize = require("sequelize")
const Op = Sequelize.Op
const axios = require("axios")

const { User } = require("./models")
const { Description } = require("./models")
const { Gallerypost } = require("./models")
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = {
	getUserById: async (id) => await User.findOne({ where: { id } }),
	getUserByEmail: async (email) => await User.findOne({ where: { email } }),
	getUserByName: async (nickname) => await User.findOne({ where: { nickname } }),
	addUser: async (data) => await User.create(data),
	authenticateUser: async (email, password) => await User.findAll({ where: { [Op.and]: [{ email }, { password }] } }),
	updateUser: async (id, nickname, password, image) => User.update({ nickname, password, image }, { where: { id } }),
	deleteUser: async (id) => await User.destroy({ where: { id } }),
	getverify: async (token) => {
		userinfo = jwt.verify(token, process.env.ACCESS_SECRET)
		return userinfo
	},
	addGallery: async (data) => await Gallerypost.create(data),
	getDescriptionByKorTitle: async (title) =>
		await Description.findAll({
			raw: true,
			attributes: ["id", "title", "title_eng", "genre", "director", "released"],
			order: [["title", "ASC"]],
			where: {
				title: {
					[Op.like]: "%" + title + "%",
				},
				genre: {
					[Op.notLike]: "%" + "성인물" + "%",
				},
				director: {
					[Op.notLike]: "director-not-found",
				},
			},
			limit: 5,
		}),
	getDescriptionByEngTitle: async (title) =>
		await Description.findAll({
			raw: true,
			attributes: ["id", "title", "title_eng", "genre", "director", "released"],
			where: {
				title_eng: {
					[Op.like]: "%" + title + "%",
				},
			},
			limit: 5,
		}),
	addDescription: (data) => {
		return new Promise((res, rej) => {
			let count = 0
			data.forEach(async (el) => {
				await Description.create(el)
				count++
				if (count === data.length) res("ok")
			})
		})
	},
}
