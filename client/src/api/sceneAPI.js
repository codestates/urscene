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
    if (result.data.likedSinglepostData === false) {
      console.log("내가 좋아요한 갤러리 요청에 실패하였습니다.");
    }
    return result.data.likedSinglepostData;
  },

  // 장면 작성하기
  make: async (title, image, content, genre) => {
    const result = await axios.post(
      `${process.env.REACT_APP_EC2_URL}/singlepost`,
      {
        title: title,
        image: image,
        content: content,
        genre: genre,
      },
      {
        withCredentials: true,
      },
    );
    if (result.data === false) {
      console.log("장면 생성 요청에 실패하였습니다.");
    }
    return result.data;
  },
};

export default sceneAPI;
