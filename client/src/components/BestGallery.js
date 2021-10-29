import React from "react";

function BestGallery({ gallery }) {
  return (
    <div>
      <div className="BG-container">
        <div className="BG-title">{gallery.title}</div>
        <div className="BG-img-wrap">
          {gallery.image.map((ele) => {
            return (
              <div className="BG-img">
                <img src={ele.image} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BestGallery;
