import axios from "axios";
require("dotenv").config();

const galleryAPI = {
  // 갤러리 정보 가져오기
  getGallery: async (galleryid) => {
    const result = await axios.get(
      `${process.env.REACT_APP_EC2_URL}/gallery/${galleryid}`,
    );
    if (result.data === false) {
      console.log("갤러리 정보 요청에 실패하였습니다.");
    }
    return result.data;
  },
};

export default galleryAPI;
