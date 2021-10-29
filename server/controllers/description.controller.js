const db = require("../db")
const axios = require("axios")
require("dotenv").config()

module.exports = {
	getMovieData: async (req, res) => {
		try {
			//const { title } = req.params
			const title = "똥파리"
			if (!title) {
				return res.status(400).json({ message: "bad-request" })
			}
			if (title.length < 2) {
				return res.status(400).json({ message: "title-is-too-short" })
			}
			const korMovie = await db.getDescriptionByKorTitle(title)
			const engMovie = await db.getDescriptionByEngTitle(title)

			if (!korMovie.length && !engMovie.length) {
				const cantFindDataInDB = async (title) => {
					const url = encodeURI(
						`http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${process.env.OPEN_API_KEY}&itemPerPage=50&movieNm=${title}`
					)
					const urlData = await axios.get(url)
					const movieList = urlData.data.movieListResult.movieList
					const movieInfoData = movieList.map((el) => {
						const { movieNm: title, movieNmEn: title_eng, genreAlt: genre, prdtYear: released } = el
						if (el.directors[0]) {
							const { peopleNm: director } = el.directors[0]
							return { released, title, title_eng, director, genre }
						} else {
							return { released, title, title_eng, genre, director: "감독 정보가 없습니다." }
						}
					})
					await db.addDescription(movieInfoData)
					const korMovie2 = await db.getDescriptionByKorTitle(title)
					const engMovie2 = await db.getDescriptionByEngTitle(title)

					if (korMovie2) {
						return res.status(200).json({ korMovie2 })
					} else if (engMovie2) {
						return res.status(200).json({ engMovie2 })
					}
					// 값이 5개 미만이면 다 보내주고 5개 이상이면 5개만 추려서(랜덤으로) 보내줌
					// return res.status(200).json({ movieInfoData })
					// 검색할 때 5개의 영화 제목을 보여주고 그 중에 선택을 함
					// 그럼 선택한 데이터가 디비에 들어가야 하는데
					// 5개 다 들어간 상태가 된다.. ?? -> 불필요 하지 않을까?
					// db로 요청했을 때 같은 영화만 들어온다.....
					// 프론트에서 포스트 요청 보낼 때 body값에 description pk
				}
				cantFindDataInDB(title)
			} else {
				if (korMovie) {
					return res.status(200).json({ korMovie })
				} else if (engMovie) {
					return res.status(200).json({ engMovie })
				}
			}
		} catch (err) {
			return res.status(500).json({ message: "server-error" })
		}
	},
}
