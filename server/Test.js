const axios = require("axios")
require("dotenv").config()

const movieList = [
	{
		movieCd: "20201002",
		movieNm: "조제",
		movieNmEn: "Josée",
		prdtYear: "2020",
		openDt: "20201210",
		typeNm: "장편",
		prdtStatNm: "개봉",
		nationAlt: "한국",
		genreAlt: "멜로/로맨스,드라마",
		repNationNm: "한국",
		repGenreNm: "멜로/로맨스",
		directors: [
			{
				peopleNm: "김종관",
			},
		],
		companys: [
			{
				companyCd: "20175501",
				companyNm: "볼미디어(주) ",
			},
		],
	},
	{
		movieCd: "20205155",
		movieNm: "조제, 호랑이 그리고 물고기들",
		movieNmEn: "Josee, The Tiger And The Fish",
		prdtYear: "2020",
		openDt: "20210331",
		typeNm: "장편",
		prdtStatNm: "개봉",
		nationAlt: "일본",
		genreAlt: "애니메이션",
		repNationNm: "일본",
		repGenreNm: "애니메이션",
		directors: [
			{
				peopleNm: "타무라 코타로",
			},
		],
		companys: [],
	},
	{
		movieCd: "20040703",
		movieNm: "조제, 호랑이 그리고 물고기들",
		movieNmEn: "Josee, The Tiger And The Fish",
		prdtYear: "2003",
		openDt: "20041029",
		typeNm: "장편",
		prdtStatNm: "개봉",
		nationAlt: "일본",
		genreAlt: "드라마",
		repNationNm: "일본",
		repGenreNm: "드라마",
		directors: [
			{
				peopleNm: "이누도 잇신 ",
			},
		],
		companys: [
			{
				companyCd: "20101897",
				companyNm: "아스믹에이스엔터테인먼트",
			},
		],
	},
]

const movieInfoData = movieList.map((el) => {
	const { movieNm: movieTitle, movieNmEn: movieTitleEng, genreAlt: genre, prdtYear: year } = el
	const { peopleNm: directors } = el.directors[0]
	return { year, movieTitle, movieTitleEng, directors, genre }
})

console.log(movieInfoData)

// require("dotenv").config()
// const { sign, verify } = require("jsonwebtoken")

// module.exports = {
// 	generateAccessToken: (data) => {
// 		return sign(data, process.env.ART_GROUND_ACCESS_SECRET, {
// 			expiresIn: "1d",
// 		})
// 	},
// 	isAuthorized: (req) => {
// 		const authorization = req.headers.cookie
// 		if (!authorization) {
// 			return null
// 		}
// 		const token = authorization.split("accessToken=")[1] //.split(";")[0].split("=")[1];
// 		try {
// 			return verify(token, process.env.ART_GROUND_ACCESS_SECRET)
// 		} catch (err) {
// 			return null
// 		}
// 	},
// 	sendAccessToken: (res, accessToken) => {
// 		res
// 			.cookie("accessToken", accessToken, {
// 				httpOnly: true,
// 				sameSite: "none",
// 				secure: true,
// 				maxAge: 60 * 60 * 24 * 1000,
// 				domain: "art-ground.link",
// 				path: "/",
// 				ovewrite: true,
// 			})
// 			.status(200)
// 			.send("AccessToken ready")
// 	},
// 	sendRefreshToken: (res, refreshToken) => {
// 		res
// 			.cookie("refreshToken", refreshToken, {
// 				httpOnly: true,
// 				secure: true,
// 				sameSite: "none",
// 			})
// 			.status(200)
// 			.send("RefreshToken ready")
// 	},
// 	checkRefeshToken: (refreshToken) => {
// 		try {
// 			return verify(refreshToken, process.env.ART_GROUND_REFRESH_SECRET)
// 		} catch (err) {
// 			return null
// 		}
// 	},
// }

const express = require("express")
const logger = require("morgan")
const cors = require("cors")
const cookieParser = require("cookie-parser")

class App {
	constructor() {
		this.app = express()

		// 미들웨어 셋팅
		this.setMiddleWare()

		// 라우팅
		this.getRouting()

		// 404 페이지를 찾을수가 없음
		this.status404()

		// 에러처리
		this.errorHandler()
	}

	setMiddleWare() {
		// 미들웨어 셋팅
		this.app.use(logger("dev"))
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: false }))
		this.app.use(
			cors({
				origin: ["https://localhost:3000", "http://localhost:3000", "https://art-ground.io", "http://art-ground.io"],
				credentials: true,
				methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
			})
		) // 응답 상태 200으로 설정}));
		this.app.use(cookieParser())
	}

	getRouting() {
		// this.app.use(require("./controllers"));
		this.app.use(require("./controllers"))
		this.app.get("/", (req, res) => {
			res.status(200).send("hello world...")
		})
	}

	status404() {
		this.app.use((req, res, _) => {
			res.status(404)
		})
	}

	errorHandler() {
		this.app.use((err, req, res, _) => {
			res.status(500)
		})
	}
}

module.exports = new App().app
