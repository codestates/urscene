import axios from "axios";
import React, { useEffect, useState } from "react";
require("dotenv").config();

function ResultGallery({ gallery }) {
  const temp =
    "https://urscene-s3-image.s3.us-east-2.amazonaws.com/noresult.png";
  const [nickname, setNickname] = useState("");
  const [scenes, setScenes] = useState([]);
  const [renderingGallery, setRenderingGallery] = useState([
    temp,
    temp,
    temp,
    temp,
  ]);

  const handleLandingGalleryImage = () => {
    axios
      .get(`${process.env.REACT_APP_EC2_URL}/gallery/${gallery.id}`)
      .then((res) => {
        console.log(res.data);
        setNickname(res.data.user.nickname);
        setScenes(res.data.result);
      });
  };

  useEffect(() => {
    handleLandingGalleryImage();
  }, []);

  for (let i = 0; i < scenes.length; i++) {
    renderingGallery[i] = scenes[i]["Singlepost"].image;
  }

  return (
    <div>
      <div className="BG-container">
        <div className="BG-title">
          {nickname}의 {gallery.title}
        </div>
        <div className="BG-img-wrap">
          <div className="BG-img">
            <img src={renderingGallery[0]} alt="" />
          </div>
          <div className="BG-img">
            <img src={renderingGallery[1]} alt="" />
          </div>
          <div className="BG-img">
            <img src={renderingGallery[2]} alt="" />
          </div>
          <div className="BG-img">
            <img src={renderingGallery[3]} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultGallery;
