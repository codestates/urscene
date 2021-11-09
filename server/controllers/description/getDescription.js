const axios = require("axios");
const db = require("../../db");
require("dotenv").config();

module.exports = async (req, res) => {
  const { title } = req.params;
  const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${process.env.OPEN_API_KEY}&itemPerPage=50&movieNm=${title}`;

  try {
    let korMovie = await db.getDescriptionByKorTitle(title);
    let engMovie = await db.getDescriptionByEngTitle(title);

    if (!korMovie.length && !engMovie.length) {
      const urlData = await axios.get(url);
      console.log("urlData", urlData);
      const movieList = urlData.data.movieListResult.movieList;
      const movieInfoData = movieList.map((el) => {
        const { movieNm: title, movieNmEn: title_eng, genreAlt: genre, prdtYear: released } = el;
        if (!el.directors[0]) {
          return { released, title, title_eng, genre, director: "director-not-found" };
        }
        const { peopleNm: director } = el.directors[0];
        return { released, title, title_eng, director, genre };
      });

      const movieDataInDB = await db.addDescription(movieInfoData);

      if (movieDataInDB === "ok") {
        korMovie = await db.getDescriptionByKorTitle(title);
        engMovie = await db.getDescriptionByEngTitle(title);
        if (korMovie.length) {
          return res.status(200).json({ korMovie });
        } else if (engMovie.length) {
          return res.status(200).json({ engMovie });
        }
      }
      return res.status(404).json({ message: "data-not-found" });
    }
    // DB
    if (korMovie.length) {
      return res.status(200).json({ korMovie });
    }
    if (engMovie.length) {
      return res.status(200).json({ engMovie });
    }

    return res.status(404).json({ message: "data-not-found" });
  } catch (err) {
    return res.status(500).json({ message: "server-error" });
  }
};
