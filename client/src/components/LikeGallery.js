import React from "react";

function LikeGallery() {
  return (
    <div>
      <div className="like-gallery-container">
        <div className="BG-title">강석호님의 로맨스만 모았다.</div>
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

export default LikeGallery;
