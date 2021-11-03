const Sequelize = require("sequelize")
const jwt = require("jsonwebtoken")
const Op = Sequelize.Op
const { User } = require("./models")
const { Description } = require("./models")
const { Gallerypost } = require("./models")
const { Singlepost } = require("./models")
const { Singlepost_gallerypost } = require("./models")
require("dotenv").config()

module.exports = {
	getUserById: async (id) => await User.findOne({ where: { id } }),
	getUserByEmail: async (email) => await User.findOne({ where: { email } }),
	getUserByName: async (nickname) => await User.findOne({ where: { nickname } }),
	addUser: async (data) => await User.create(data),
	authenticateUser: async (email, password) => await User.findAll({ where: { [Op.and]: [{ email }, { password }] } }),
	updateUser: async (data) => await User.update(data, { raw: true, where: { id: data.id } }),
	deleteUser: async (id) => await User.destroy({ where: { id } }),
	getSinglePostById: async (singlepost_id) => await Singlepost.findOne({ raw: true, where: { id: singlepost_id } }),
	getJunctionTableData: async (singlepost_id, gallerypost_id) =>
		await Singlepost_gallerypost.findAll({ raw: true, where: { [Op.and]: [{ singlepost_id }, { gallerypost_id }] } }),
	getGalleryById: async (gallerypost_id) => await Gallerypost.findOne({ raw: true, where: { id: gallerypost_id } }),
	getverify: async (token) => {
		userinfo = jwt.verify(token, process.env.ACCESS_SECRET)
		return userinfo
	},
	addGallery: async (data) => await Gallerypost.create(data),
	addSinglepostToGallery: async (data) => await Singlepost_gallerypost.create(data),
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
