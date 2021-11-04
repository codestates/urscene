const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const Op = Sequelize.Op;
const {User} = require("./models");
const {Description} = require("./models");
const {Gallerypost} = require("./models");
const {Singlepost} = require("./models");
const {Singlepost_gallerypost} = require("./models");
const {Like} = require("./models");
require("dotenv").config();

module.exports = {
	getUserById: async (id) => await User.findOne({ where: { id } }),
	getUserByEmail: async (email) => await User.findOne({ where: { email } }),
	getUserByName: async (nickname) => await User.findOne({ where: { nickname } }),
	addUser: async (data) => await User.create(data),
	authenticateUser: async (email, password) => await User.findAll({ where: { [Op.and]: [{ email }, { password }] } }),
	updateUser: async (data) =>
		await User.update(
			{ password: data.newPassword, nickname: data.newName, image: data.newImage },
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
					[Op.substring]: title,
				},
				genre: {
					[Op.notLike]: "%" + "성인물" + "%",
				},
				director: {
					[Op.notLike]: "%" + "director" + "%",
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
	getDescriptionsByTitle: async (title) => {
		const data = await Description.findOne({
			where: {
				[Op.or]: [{ title }, { title_eng: title }],
			},
		})
		return data
	},
	addsinglepost: async (data) => {
		const { id, title, image, content, genre, descriptionsId } = data
		const list = await Singlepost.create({
			user_id: id,
			title,
			image,
			content,
			genre,
			description_id: descriptionsId,
		})
		return list
	},
	mygetSinglepost: async (id) => {
		const mysinglepost = await Singlepost.findAll({
			where: { user_id: id },
		})
		return mysinglepost
	},
	getSinglepost: async (data) => {
		const singlepost = await Singlepost.findOne({
			include: [
				{
					model: User,
					attributes: ["nickname", "image"],
				},
				{
					model: Description,
					attributes: ["title", "title_eng", "genre", "director", "released"],
				},
			],
			where: { id: data },
		})
		return singlepost
	},
	getDeleteSinglepost: async (data) => {
		const singleId = await Singlepost.findOne({
			where: { id: data.singlepostid, user_id: data.id },
		})
		return singleId
	},
	deleteSinglepost: async (singlepostid) => {
		const destroy = await Singlepost.destroy({
			where: { id: singlepostid },
		})
		return destroy
	},
	getLike: async (data) => {
		const userLike = await Like.findOne({
			where: {
				id: data.singlelikeid,
				user_id: data.userid, //userinfo.id
			},
		})
		return userLike
	},
	deleteSingleLike: async (data) => {
		const destroy = await Like.destroy({
			where: {
				id: data.id,
				singlepost_id: data.singlepost_id,
			},
		})
		return destroy
	},
	mygetSinglepost: async (id) => await Singlepost.findOne({ where: { id } }),
	updateSinglepost: async (data) => {
		const edit = await Singlepost.update(
			{
				content: data.content,
			},
			{
				where: { id: data.singleid },
			}
		)
		return edit
	},
	getSinglepostLike: async (data) =>
		await Like.findOrCreate({
			where: { user_id: data.id, singlepost_id: data.singlepostid }, //userinfo.id
		}),
	getSingleLike: async (data) =>
		await Like.findOne({
			where: { user_id: data.id, singlepost_id: data.singlepostid },
		}),
}
