/*eslint-disable*/
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
      <div className="RG-container">
        <div
          className="RG-title"
          onClick={() => {
            history.push(`/gallery/${gallery.id}`);
          }}
        >
          {nickname}의 {gallery.title}
        </div>
        <div className="RG-img-wrap">
          {rendering.map((ele) => {
            return (
              <div className="RG-img" key={ele.id}>
                <img
                  src={`${process.env.REACT_APP_S3_URL_ImageUpload}/${ele.image}`}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ResultGallery;
