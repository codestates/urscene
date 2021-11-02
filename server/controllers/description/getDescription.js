const axios = require("axios")
const db = require("../../db")
require("dotenv").config()

// + 클라이언트로 리스폰스 보내줄 때 배열 길이 5개로 맞춰서 보내줘야 한다
// + db에서 검색한 값 랜덤으로 보내주는 알고리즘도 짜야 한다

module.exports = async (req, res) => {
	const { title } = req.params
	const url = encodeURI(
		`http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${process.env.OPEN_API_KEY}&itemPerPage=20&movieNm=${title}`
	)

	try {
		let korMovie = await db.getDescriptionByKorTitle(title)
		let engMovie = await db.getDescriptionByEngTitle(title)

		if (!korMovie.length && !engMovie.length) {
			const urlData = await axios.get(url)
			const movieList = urlData.data.movieListResult.movieList
			const movieInfoData = movieList.map((el) => {
				const { movieNm: title, movieNmEn: title_eng, genreAlt: genre, prdtYear: released } = el
				if (!el.directors[0]) {
					return { released, title, title_eng, genre, director: "director-not-found" }
				}
				const { peopleNm: director } = el.directors[0]
				return { released, title, title_eng, director, genre }
			})

			const movieDataInDB = await db.addDescription(movieInfoData)

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
		// DB
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
