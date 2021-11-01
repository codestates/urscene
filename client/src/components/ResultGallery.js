import axios from "axios";
import React, { useEffect } from "react";
require("dotenv").config();

function ResultGallery({ gallery }) {
  // const handleLandingGalleryImage = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_EC2_URL}/gallery/:${gallery.id}`)
  //     .then((res) => {
  //       console.log(res);
  //     });
  // };

  // useEffect(() => {
  //   handleLandingGalleryImage();
  // }, []);

  return (
    <div>
      <div className="BG-container">
        <div className="BG-title">{gallery.title}</div>
        <div className="BG-img-wrap">
          <div className="BG-img">
            <img src="/img/UserImage-Jake.png" alt="" />
          </div>
          <div className="BG-img">
            <img src="/img/UserImage-Meg.png" alt="" />
          </div>
          <div className="BG-img">
            <img src="/img/UserImage-Mili.png" alt="" />
          </div>
          <div className="BG-img">
            <img src="/img/UserImage-Steven.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultGallery;
