import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
require("dotenv").config();

function SceneInGalleryAddModal({ handleSetAddModal, postId, haveGallery }) {
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
    axios
      .post(
        `${process.env.REACT_APP_EC2_URL}/gallery/${galleryId}`,
        {
          singlepost_id: postId,
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
        console.log(err);
      });
  };

  return (
    <div className="addModal-background">
      <div className="addModal">
        <div className="add-text">어떤 갤러리에 추가할까요?</div>
        <input
          readOnly
          type="text"
          placeholder="🖇 갤러리 선택"
          className={drop ? "addModal-input-drop" : "addModal-input"}
          onFocus={() => setDrop(true)}
          value={galleryTitle}
        />
        {drop ? (
          <div className="addModal-Drop">
            {haveGallery.map((gallery) => {
              return (
                <li key={gallery.id} onClick={() => handle(gallery)}>
                  <div>{gallery.title}</div>
                  <div className="addModal-hr"></div>
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
          <div
            className="add-btn-ok"
            onClick={() => {
              handleSetAddModal();
              setErrModal(false);
            }}
          >
            취소
          </div>
          <button className="add-btn-cancel" onClick={handleAddSceneinGallery}>
            담기
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
