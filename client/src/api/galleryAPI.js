import axios from "axios";
require("dotenv").config();

const galleryAPI = {
  // 갤러리 정보 가져오기
  getGalleryId: async (galleryid) => {
    const result = await axios.get(
      `${process.env.REACT_APP_EC2_URL}/gallery/${galleryid}`,
    );
    if (result.data === false) {
      console.log("갤러리 정보 요청에 실패하였습니다.");
    }
    return result.data;
  },

  // 내가 작성한 갤러리 가져오기
  user: async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_EC2_URL}/user/gallerypost`,
    );
    if (result.data.my === false) {
      console.log("내가 작성한 장면 요청에 실패하였습니다.");
    }
    return result.data.my.reverse();
  },

  // 내가 좋아요한 갤러리 가져오기
  userLike: async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_EC2_URL}/user/like/gallerypost`,
    );
    if (result.data.my === false) {
      console.log("내가 작성한 장면 요청에 실패하였습니다.");
    }
    return result.data.likedGalleryData.reverse();
  },

  // 장면 작성하기
  make: async (title, desc) => {
    const result = await axios.post(
      `${process.env.REACT_APP_EC2_URL}/gallery`,
      {
        title: title,
        content: desc,
      },
      {
        withCredentials: true,
      },
    );
    if (result.data === false) {
      console.log("갤러리 생성 요청에 실패하였습니다.");
    }
    return result.data;
  },
};

export default galleryAPI;
