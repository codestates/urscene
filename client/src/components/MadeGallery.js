import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
require("dotenv").config();

function MadeGallery({ gallery }) {
  const history = useHistory();

  const [renderPosts, setRenderPosts] = useState([]);
  const getGalleryInfo = () => {
    axios
      .get(`${process.env.REACT_APP_EC2_URL}/gallery/${gallery.id}`)
      .then((res) => {
        setRenderPosts(res.data.singlepost.slice(0, 4));
      });
  };

  useEffect(() => {
    getGalleryInfo();
  }, []);

  return (
    <div className="like-gallery-item">
      <div
        className="BG-title"
        onClick={() => history.push(`/gallery/${gallery.id}`)}
      >
        {gallery.title}
      </div>
      <div className="BG-img-wrap">
        {renderPosts.map((post) => {
          return (
            <div className="BG-img" key={post.id}>
              <img
                src={`${process.env.REACT_APP_S3_URL_ImageUpload}/${post.image}`}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MadeGallery;
