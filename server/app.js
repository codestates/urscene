require("dotenv").config()
const fs = require("fs")
const https = require("https")
const express = require("express")
const app = express()
const port = 80
const cors = require("cors")
const cookieParser = require("cookie-parser")

app.use(cookieParser())
app.use(express.json())
app.use(
	cors({
		origin: ["http://localhost:3000", "https://urscene.de"],
		credentials: true,
		methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
	})
)

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.use(require("./controllers/index"))

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
