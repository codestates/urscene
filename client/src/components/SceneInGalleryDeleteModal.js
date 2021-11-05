import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
require("dotenv").config();

function SceneInGalleryDeleteModal({
  handleSceneDeleteModal,
  galleryId,
  sceneId,
  handleLandingDetailGallery,
}) {
  const history = useHistory();

  const handleDeleteGallery = () => {
    axios
      .delete(
        `${process.env.REACT_APP_EC2_URL}/gallery/photo/${galleryId}/${sceneId}`,
      )
      .then((res) => {
        console.log("삭제에 성공하였습니다.");
        handleLandingDetailGallery();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="deleteModal-background">
      <div className="deleteModal">
        <div className="delete-img"></div>
        <div className="delete-text">장면을 갤러리에서 삭제하시겠습니까?</div>
        <div className="delete-btn">
          <div className="delete-btn-ok" onClick={handleDeleteGallery}>
            삭제하기
          </div>
          <button
            className="delete-btn-cancel"
            onClick={handleSceneDeleteModal}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default SceneInGalleryDeleteModal;
