const Sequelize = require("sequelize")
const Op = Sequelize.Op
const { User, Description, Gallerypost, Singlepost, Singlepost_gallerypost, Like } = require("./models")

module.exports = {
	getUserById: async (id) => await User.findOne({ where: { id } }),
	getUserByEmail: async (email) => await User.findOne({ where: { email } }),
	getUserByName: async (nickname) => await User.findOne({ where: { nickname } }),
	addUser: async (data) => await User.create(data),
	addGoogleUser: async (email) =>
		await User.findOrCreate({ where: { email }, defaults: { nickname: email.slice(0, email.indexOf("@")), image: 1 } }),
	updateUser: async (data) =>
		await User.update(
			{ password: data.hashPassword, nickname: data.newName, image: data.newImage },
			{ raw: true, where: { id: data.id } }
		),
	deleteUser: async (id) => await User.destroy({ where: { id } }),
	addGallery: async (data) => await Gallerypost.create(data),
	addSinglepostToGallery: async (data) => await Singlepost_gallerypost.create(data),
	getSinglePostById: async (singlepost_id) => await Singlepost.findOne({ raw: true, where: { id: singlepost_id } }),
	getGalleryById: async (gallerypost_id) => await Gallerypost.findOne({ raw: true, where: { id: gallerypost_id } }),
	getJunctionTableData: async (singlepost_id, gallerypost_id) =>
		await Singlepost_gallerypost.findAll({ raw: true, where: { [Op.and]: [{ singlepost_id }, { gallerypost_id }] } }),
	getLikedSinglepostById: async (id) =>
		await Like.findAll({
			raw: true,
			attributes: ["id", "user_id", "singlepost_id"],
			order: [["id", "DESC"]],
			where: {
				user_id: id,
				singlepost_id: {
					[Op.ne]: null,
				},
			},
		}),
	getLikedGalleryById: async (id) =>
		await Like.findAll({
			raw: true,
			attributes: ["id", "user_id", "gallerypost_id"],
			order: [["id", "DESC"]],
			where: {
				user_id: id,
				gallerypost_id: {
					[Op.ne]: null,
				},
			},
		}),
	getDescriptionByKorTitle: async (title) =>
		await Description.findAll({
			raw: true,
			attributes: ["id", "title", "title_eng", "genre", "director", "released"],
			order: [["title", "ASC"]],
			where: {
				title: {
					[Op.like]: title + "%",
				},
			},
			limit: 5,
		}),
	getDescriptionByEngTitle: async (title) =>
		await Description.findAll({
			raw: true,
			attributes: ["id", "title", "title_eng", "genre", "director", "released"],
			order: [["title_eng", "ASC"]],
			where: {
				title_eng: {
					[Op.like]: title + "%",
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
