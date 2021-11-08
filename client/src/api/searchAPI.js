import axios from "axios";
require("dotenv").config();

const searchAPI = {
  // 장면 검색 API
  scene: async (searchWord, start, limit) => {
    const result = await axios.get(
      `${process.env.REACT_APP_EC2_URL}/search/single?content=${searchWord}&page=${start}&limit=${limit}`,
    );
    if (result.data.search_single === false) {
      console.log("장면 검색 요청이 실패하였습니다.");
    }
    return result.data.search_single;
  },

  //갤러리 검색 API
  gallery: async (searchWord, start, limit) => {
    const result = await axios.get(
      `${process.env.REACT_APP_EC2_URL}/search/gallery?content=${searchWord}&page=${start}&limit=${limit}`,
    );
    if (result.data.search_single === false) {
      console.log("갤러리 검색 요청이 실패하였습니다.");
    }
    return result.data.search_gallery;
  },
};

export default searchAPI;
