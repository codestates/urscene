const axios = require("axios")
const db = require("../../db")

module.exports = async (req, res) => {
	const { title } = req.params
	const url = encodeURI(
		`http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=N&listCount=70&ServiceKey=${process.env.KMDB_API_KEY}&title=${title}`
	)

	try {
		let korMovie = await db.getDescriptionByKorTitle(title)
		let engMovie = await db.getDescriptionByEngTitle(title)

		if (korMovie.length === 0 && engMovie.length === 0) {
			const urlData = await axios.get(url)
			const movieData = urlData.data.Data[0].Result
			const movieList = movieData.map((el) => {
				let { title: title } = el
				title = title.replace(/\!HS/g, "")
				title = title.replace(/\!HE/g, "")
				title = title.replace(/^\s+|\s+$/g, "")
				title = title.replace(/ +/g, " ")
				const { titleEng: title_eng, genre: genre, prodYear: released } = el
				const { directorNm: director } = el.directors.director[0]
				return { title, title_eng, director, genre, released }
			})
			const filtedMovieList = movieList.filter((el) => {
				return el.genre !== "에로" && el.director.length !== 0 && el.genre.length !== 0
			})

			const movieDataInDB = await db.addDescription(filtedMovieList)

			if (movieDataInDB === "ok") {
				korMovie = await db.getDescriptionByKorTitle(title)
				engMovie = await db.getDescriptionByEngTitle(title)
				if (korMovie.length) {
					return res.status(200).json({ korMovie })
				} else if (engMovie.length) {
					return res.status(200).json({ engMovie })
				}
			}
			return res.status(404).json({ message: "data-not-found" })
		}
		if (korMovie.length) {
			return res.status(200).json({ korMovie })
		}
		if (engMovie.length) {
			return res.status(200).json({ engMovie })
		}
		return res.status(404).json({ message: "data-not-found" })
	} catch (err) {
		return res.status(500).json({ message: "server-error" })
	}
}
