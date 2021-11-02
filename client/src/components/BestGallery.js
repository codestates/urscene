import React from "react";

function BestGallery({ gallery }) {
  // const rendering = [];
  // for (let i = 0; i < 4; i++) {
  //   rendering.push(gallery.image[i]);
  // }
  const rendering = [];
  for (let i = 0; i < 4; i++) {
    if (gallery.image[i] === undefined) {
      rendering.push(
        "https://urscene-s3-image.s3.us-east-2.amazonaws.com/noresult.png",
      );
    } else {
      rendering.push(gallery.image[i]);
    }
  }

  return (
    <div>
      <div className="BG-container">
        <div className="BG-title">{gallery.title}</div>
        <div className="BG-img-wrap">
          {gallery.image.map((ele, idx) => {
            return (
              <div className="BG-img" key={idx}>
                <img src={ele} alt={ele} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BestGallery;
