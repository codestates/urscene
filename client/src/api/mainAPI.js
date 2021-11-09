import axios from "axios";
require("dotenv").config();

const mainAPI = {
  // 인기 갤러리 API
  rangking: async () => {
    const result = await axios.get(`${process.env.REACT_APP_EC2_URL}/main`);
    if (result.data.Ranking_gallery === false) {
      console.log("인기 갤러리 요청이 실패하였습니다.");
    }
    return result.data.Ranking_gallery;
  },

  // 장르별 장면 API
  genre: async (genre, start, limit) => {
    const result = await axios.get(
      `${process.env.REACT_APP_EC2_URL}/main/single/?genre=${genre}&page=${start}&limit=${limit}`,
    );
    if (result.data.single === false) {
      console.log("장르별 요청이 실패하였습니다.");
    }
    return result.data.single;
  },
};

export default mainAPI;
