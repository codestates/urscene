const jwt = require("jsonwebtoken")
require("dotenv").config()

const User = require("./models/User")

module.exports = {
	getUserById: async (id) =>
		User.findOne({
			where: { id: id },
		}),
	getverify: async (token) => {
		userinfo = jwt.verify(token, process.env.ACCESS_SECRET)
		return userinfo
	},
	getUserByEmail: async (email) => User.findOne({ email }),
	getUserByName: async (name) => User.findOne({ name }),
	addUser: async (data) => new User(data).save(),
	deleteUser: async (_id) => User.deleteOne({ _id }),
	updatePassword: async (_id, password) => User.updateOne({ _id }, { $set: { password } }),
	close: () => mongoose.connection.close(),
	addPosts: async (data) => new Posts(data).save(),
	getPostsByTitle: async (title) => Posts.findOne({ title }),
	getAllPosts: async () => Posts.find({}),
	getPostById: async (id) => Posts.findOne({ id }),
	editPosts: async (id, content) => Posts.updateOne({ id }, { $set: { content } }),
	deletePosts: async (id) => Posts.deleteOne({ id }),
}
