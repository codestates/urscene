import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
require("dotenv").config();

function GalleryDeleteModal({ galleryId, handleDeleteModal }) {
  const history = useHistory();

  const handleDeleteGallery = () => {
    axios
      .delete(`${process.env.REACT_APP_EC2_URL}/gallery/${galleryId}`)
      .then((res) => {
        history.push("/mygallery");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="deleteModal-background">
      <div className="deleteModal">
        <div className="delete-img"></div>
        <div className="delete-text">갤러리를 삭제하시겠습니까?</div>
        <div className="delete-btn">
          <div className="delete-btn-ok" onClick={handleDeleteGallery}>
            삭제하기
          </div>
          <button className="delete-btn-cancel" onClick={handleDeleteModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default GalleryDeleteModal;
