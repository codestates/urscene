import axios from "axios";
require("dotenv").config();
axios.defaults.withCredentials = true;

const likeAPI = {
  // 갤러리 좋아요 정보 가져오기
  getGallery: async (galleryid) => {
    const result = await axios.get(
      `${process.env.REACT_APP_EC2_URL}/gallery/like/${galleryid}`,
    );
    if (result.data.Like === false) {
      console.log("좋아요 정보 요청에 실패하였습니다.");
    }
    return result.data.Like;
  },

  // 갤러리 좋아요 추가 요청하기
  postGallery: async (galleryid) => {
    const result = await axios.post(
      `${process.env.REACT_APP_EC2_URL}/gallery/like/${galleryid}`,
    );
    if (result.data.Likedata.id === false) {
      console.log("좋아요 추가 요청에 실패하였습니다.");
    }
    return result.data.Likedata.id;
  },

  // 갤러리 좋아요 삭제 요청하기
  deleteGallery: async (galleryLikeid) => {
    const result = await axios.delete(
      `${process.env.REACT_APP_EC2_URL}/gallery/like/${galleryLikeid}`,
    );
    if (result === false) {
      console.log("좋아요 추가 요청에 실패하였습니다.");
    }
    return result;
  },
};

export default likeAPI;
