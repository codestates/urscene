import React from "react";

function MadeScene() {
  return (
    <div>
      <div className="made-scene-wrap">
        <div className="result-scene-img">
          {/* TODO: 북마커 클릭 시 갤러리리스트에 추가 되어야 함 */}
          <div className="bookmarker"></div>
          <img src="./img/UserImage-Jake.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default MadeScene;
