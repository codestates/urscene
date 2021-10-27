const axios = require("axios")
require("dotenv").config()

module.exports = {
	getMovieData: async (req, res) => {
		try {
			const { title } = req.params // params 값이 객체로 들어옴
			const url = encodeURI(
				`http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${process.env.OPEN_API_KEY}&movieNm=조제`
			)
			const urlData = await axios.get(url)
			const movieList = urlData.data.movieListResult.movieList

			const movieInfoData = movieList.map((el) => {
				const { movieNm: title, movieNmEn: titleEng, genreAlt: genre, prdtYear: released } = el
				const { peopleNm: director } = el.directors[0]
				return { released, title, titleEng, director, genre }
			})
			return res.status(200).json(movieInfoData)
		} catch (err) {
			console.log(err)
		}
	},
}
// DB에는 title 컬럼만 있는데 영어타이틀 값도 필요할 것 같다.. 타이틀 안에 객체로 넣을 수 있나?
