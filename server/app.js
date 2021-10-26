require("dotenv").config()
const fs = require("fs")
const https = require("https")
const express = require("express")
const app = express()
const port = 80
const cors = require("cors")
const cookieParser = require("cookie-parser")
const commentRouter = require("./routes/comment.route")
const galleryRouter = require("./routes/gallery.route")
const likeRouter = require("./routes/like.route")
const mainRouter = require("./routes/main.route")
const searchRouter = require("./routes/search.route")
const singlepostRouter = require("./routes/singlepost.route")
const userRouter = require("./routes/user.route")
const oauthRouter = require("./routes/oauth.route")

app.use(cookieParser())
app.use(express.json())
app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
		methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
	})
)

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.use("/comment", commentRouter)
app.use("/gallery", galleryRouter)
app.use("/like", likeRouter)
app.use("/main", mainRouter)
app.use("/search", searchRouter)
app.use("/singlepost", singlepostRouter)
app.use("/user", userRouter)
app.use("/oauth", oauthRouter)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
