import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
require("dotenv").config();

function ResultGallery({ gallery }) {
  const history = useHistory();
  const [nickname, setNickname] = useState("");
  const [scenes, setScenes] = useState([]);

  const rendering = scenes.slice(0, 4);

  const handleLandingGalleryImage = () => {
    axios
      .get(`${process.env.REACT_APP_EC2_URL}/gallery/${gallery.id}`)
      .then((res) => {
        setNickname(res.data.nickname);
        setScenes(res.data.singlepost);
      });
  };

  useEffect(() => {
    handleLandingGalleryImage();
  }, []);

  return (
    <div>
      <div className="BG-container">
        <div
          className="BG-title"
          onClick={() => {
            history.push(`/gallery/${gallery.id}`);
          }}
        >
          {nickname}의 {gallery.title}
        </div>
        <div className="BG-img-wrap">
          {rendering.map((ele) => {
            return (
              <div className="BG-img">
                <img key={ele.id} src={ele.image} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ResultGallery;
