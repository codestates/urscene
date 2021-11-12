/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import galleryAPI from "../api/galleryAPI";
require("dotenv").config();

function BestGallery({ gallery }) {
  const history = useHistory();
  const [scenes, setScenes] = useState([]);

  const handleGetScenes = async () => {
    try {
      const result = await galleryAPI.getGalleryId(gallery.id);
      setScenes(result.singlepost.slice(0, 4));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetScenes();
  }, [gallery, scenes]);

  return (
    <div>
      <div className="BG-container">
        <div
          className="BG-title"
          onClick={() => {
            history.push(`/gallery/${gallery.id}`);
          }}
        >
          {gallery.title}
        </div>
        <div className="BG-img-wrap">
          {scenes.map((scene) => {
            return (
              <div className="BG-img" key={scene.id}>
                <img
                  src={`${process.env.REACT_APP_S3_URL_ImageUpload}/${scene.image}`}
                  alt={scene.image}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BestGallery;
