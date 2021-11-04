import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
require("dotenv").config();

function SceneInGalleryAddModal({ handleSetAddModal, scene, haveGallery }) {
  const [drop, setDrop] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryId, setGalleryId] = useState("");
  const [errModal, setErrModal] = useState(false);
  const history = useHistory();
  // console.log("galleryTitle===", galleryTitle);

  const handle = (gallery) => {
    setGalleryTitle(gallery.title);
    setGalleryId(gallery.id);
    setDrop(false);
  };

  const handleAddSceneinGallery = () => {
    console.log("갤러리 아이디 ===", galleryId);
    console.log("장면 아이디 ===", scene.id);
    axios
      .post(
        `${process.env.REACT_APP_EC2_URL}/gallery/${galleryId}`,
        {
          singlepost_id: scene.id,
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res);
        if (res.data.message === "singlepost-already-exists") {
          setErrModal(true);
        } else {
          handleSetAddModal(false);
          window.location.replace("/mygallery");
        }
      })
      .catch((err) => {
        console.log("담기 실패");
        console.log(err);
      });
  };

  return (
    <div className="addModal-background">
      <div className="addModal">
        <div className="add-text">갤러리를 선택하고 담기를 눌러주세요</div>
        <input
          type="text"
          placeholder="담으실 갤러리를 선택해주세요"
          className="addModal-input"
          onFocus={() => setDrop(true)}
          value={galleryTitle}
        />
        {drop ? (
          <div className="addModal-Drop">
            {haveGallery.map((gallery) => {
              return (
                <li key={gallery.id} onClick={() => handle(gallery)}>
                  <div>{gallery.title}</div>
                </li>
              );
            })}
            <li
              onClick={() => {
                setDrop(false);
                setGalleryTitle("");
              }}
            >
              취소
            </li>
          </div>
        ) : null}
        <div className="add-btn">
          <div className="add-btn-ok" onClick={handleAddSceneinGallery}>
            담기
          </div>
          <button
            className="add-btn-cancel"
            onClick={() => {
              handleSetAddModal();
              setErrModal(false);
            }}
          >
            취소
          </button>
        </div>
        {errModal ? (
          <div className="addModal-err">이미 담겨져 있는 장면입니다.</div>
        ) : null}
      </div>
    </div>
  );
}

export default SceneInGalleryAddModal;
