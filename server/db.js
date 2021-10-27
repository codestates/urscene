const Sequelize = require("sequelize")

const User = require("./models/user")
const Description = require("./models/description")

require("dotenv").config()

// if (!process.env.MONGO_URI) {
// 	console.error("MongoDB connection string is missing!")
// 	process.exit(1)
// }

// if (process.env.NODE_ENV !== "test") {
// 	mongoose
// 		.connect(process.env.MONGO_URI, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 		})
// 		.then(console.log("MongoDB Connectted!!"))
// 		.catch((err) => console.error(err))
// }

// seed user data (if nacessary)
// User.find()
// 	.then((users) => {
// 		if (users.length) return

// 		new User({
// 			name: "손연주",
// 			email: "sonyeonju7@gmail.com",
// 			password: "Test123@",
// 		}).save()
// 	})
// 	.catch((err) => console.error(err))

module.exports = {
	getUserById: async (id) =>
		User.findOne({
			where: { id: id },
		}),
	getUserByEmail: async (email) => User.findOne({ email }),
	getUserByName: async (name) => User.findOne({ name }),
	addUser: async (data) => new User(data).save(),
	deleteUser: async (_id) => User.deleteOne({ _id }),
	updatePassword: async (_id, password) => User.updateOne({ _id }, { $set: { password } }),
	// addPosts: async (data) => new Posts(data).save(),
	// getPostsByTitle: async (title) => Posts.findOne({ title }),
	// getAllPosts: async () => Posts.find({}),
	// getPostById: async (id) => Posts.findOne({ id }),
	// editPosts: async (id, content) => Posts.updateOne({ id }, { $set: { content } }),
	// deletePosts: async (id) => Posts.deleteOne({ id }),
	getDescriptionByTitle: async (title) => await Description.findOne({ where: { title } }),
}
