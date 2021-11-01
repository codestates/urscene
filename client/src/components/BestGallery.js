import React from "react";

function BestGallery({ gallery }) {
  const rendering = [];
  for (let i = 0; i < 4; i++) {
    rendering.push(gallery.image[i]);
  }

  return (
    <div>
      <div className="BG-container">
        <div className="BG-title">{gallery.title}</div>
        <div className="BG-img-wrap">
          {rendering.map((ele, idx) => {
            return (
              <div className="BG-img" key={idx}>
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
