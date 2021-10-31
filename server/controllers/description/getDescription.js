const axios = require("axios")
const db = require("../../db")
require("dotenv").config()

// 한국제목 찾고
// 영어 제목 찾고
// 둘 다 없으면 API 검색해서 add영화정보
// 그리고 나서 다시
// db에서 한국 제목
// 영어 제목 찾은 후 response

//

module.exports = async (req, res) => {
	try {
		const { title } = req.params // params 값이 객체로 들어옴
		const url = encodeURI(
			`http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${process.env.OPEN_API_KEY}&movieNm=${title}`
		)

		let korMovie = await db.getDescriptionByKorTitle(title)
		let engMovie = await db.getDescriptionByEngTitle(title)

		if (!korMovie.length && !engMovie.length) {
			const urlData = await axios.get(url)
			const movieList = urlData.data.movieListResult.movieList
			const movieInfoData = movieList.map((el) => {
				const { movieNm: title, movieNmEn: titleEng, genreAlt: genre, prdtYear: released } = el
				if (!el.directors[0]) {
					return { released, title, titleEng, genre, director: "director-not-found" }
				}
				const { peopleNm: director } = el.directors[0]
				return { released, title, titleEng, director, genre }
			})
			const reply = await db.addDescription(movieInfoData)

			if (reply === "ok") {
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
		} else if (engMovie.length) {
			return res.status(200).json({ engMovie })
		}
		return res.status(404).json({ message: "data-not-found" })
	} catch (err) {
		return res.status(500).json({ message: "server-error" })
	}
}
