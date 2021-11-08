import React from "react";
import { useHistory } from "react-router";
require("dotenv").config();

function BestGallery({ gallery }) {
  const history = useHistory();
  const imageGroup = [];
  for (let i = 0; i < gallery.image.length; i++) {
    imageGroup[i] = gallery.image[i];
  }

  const rendering = imageGroup.slice(0, 4);

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
          {rendering.map((ele, idx) => {
            return (
              <div className="BG-img" key={idx}>
                <img
                  src={`${process.env.REACT_APP_S3_URL_ImageUpload}/${ele.image}`}
                  alt={ele.image}
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
