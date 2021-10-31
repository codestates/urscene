const dotenv = require("dotenv")
dotenv.config()

const development = {
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_DATABASE,
	host: process.env.DATABASE_HOST,
	dialect: "mysql",
	port: process.env.DATABASE_PORT,
}

const test = {
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_DATABASE,
	host: process.env.DATABASE_HOST,
	dialect: "mysql",
	port: process.env.DATABASE_PORT,
}

const production = {
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_DATABASE,
	host: process.env.DATABASE_HOST,
	dialect: "mysql",
	port: process.env.DATABASE_PORT,
}

module.exports = { development, test, production }
