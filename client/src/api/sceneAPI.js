import axios from "axios";
require("dotenv").config();

const sceneAPI = {
  // 내가 작성한 모든 장면 가져오기
  user: async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_EC2_URL}/user/singlepost`,
    );
    if (result.data.my === false) {
      console.log("내가 작성한 장면 요청에 실패하였습니다.");
    }
    return result.data.my.reverse();
  },

  // 내가 좋아요한 모든 장면 가져오기
  userLike: async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_EC2_URL}/user/like/singlepost`,
    );
    if (result.data.likedGalleryData === false) {
      console.log("내가 좋아요한 갤러리 요청에 실패하였습니다.");
    }
    return result.data.likedGalleryData;
  },
};

export default sceneAPI;
