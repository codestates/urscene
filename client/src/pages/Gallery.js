import React, { useEffect, useContext, useState } from "react";
import MainNav from "../components/MainNav";
import GalleryContent from "../components/GalleryContent";
import GalleryDeleteModal from "../components/GalleryDeleteModal";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { MyContext } from "../contexts/Store";
require("dotenv").config();

function Gallery() {
  const history = useHistory();
  const { userInfo } = useContext(MyContext); // 유저 정보를 확인
  const { galleryId } = useParams();
  const [likeModal, setlikeModal] = useState(false); // 좋아요 버튼 false가 안누른상태
  const [editDeleteModal, setEditDeleteModal] = useState(true); // 수정버튼 클릭시 장면 설명 수정
  const [editModal, setEditModal] = useState(false); // 수정버튼 클릭시 장면 설명 수정
  const [deleteModal, setDeleteModal] = useState(false); // 삭제 버늩 클릭시 삭제 모달 팝업

  const [nicknameGallery, setNicknameGallery] = useState(""); // API로 받아온 갤러리 작성자 닉네임
  const [titleGallery, setTitleGallery] = useState(""); // API로 받아온 갤러리 타이틀
  const [contentGallery, setContentGallery] = useState(""); // API로 받아온 갤러리 설명
  const [sceneGallery, setSceneGallery] = useState([]); // API로 받아온 갤러리 장면

  const handleMatchingUserAndnickName = () => {
    if (userInfo === null) {
      // 기능 구현을 위해 임시로 false로 바꿔놓음. 원래는 true가 정상
      return setEditDeleteModal(false);
    } else if (userInfo.nickname === nicknameGallery) {
      return setEditDeleteModal(false);
    }
  };

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const handleTitleGallery = (e) => {
    setTitleGallery(e.target.value);
  };

  const handleContentGallery = (e) => {
    setContentGallery(e.target.value);
  };

  const handleLandingDetailGallery = () => {
    axios
      .get(`${process.env.REACT_APP_EC2_URL}/gallery/${galleryId}`)
      .then((res) => {
        console.log("handleLandingDetailGallery 함수 트리거");
        console.log(res.data);
        setNicknameGallery(res.data.nickname);
        setTitleGallery(res.data.title);
        setContentGallery(res.data.content);
        setSceneGallery(res.data.singlepost);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePatchGallery = () => {
    axios
      .patch(`${process.env.REACT_APP_EC2_URL}/gallery/${galleryId}`, {
        title: titleGallery,
        content: contentGallery,
      })
      .then((res) => {
        setEditModal(false);
        history.push(`gallery/${galleryId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleLandingDetailGallery();
    handleMatchingUserAndnickName();
  }, []);

  return (
    <div>
      <div>
        <MainNav />
        <div className="gallery">
          <div className="gallerywrap">
            <div className="gallery-nickname">
              {nicknameGallery} 님의 gallery id = {galleryId}
            </div>
            <div className="gallery-group1">
              {editModal ? (
                <div>
                  <textarea
                    className="gallery-titleinput"
                    value={titleGallery}
                    onChange={(e) => {
                      handleTitleGallery(e);
                    }}
                  ></textarea>
                  <div
                    className="gallery-btn"
                    // onClick={() => setEditModal(!editModal)}
                    onClick={handlePatchGallery}
                  >
                    완료
                  </div>
                </div>
              ) : (
                <div>
                  <div className="gallery-title">{titleGallery}</div>
                  {editDeleteModal ? null : (
                    <div>
                      <div
                        className="gallery-edit"
                        onClick={() => setEditModal(!editModal)}
                      ></div>
                      <div
                        className="gallery-delete"
                        onClick={() => setDeleteModal(!deleteModal)}
                      ></div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="gallery-group2">
              {editModal ? (
                <textarea
                  className="gallery-descinput"
                  value={contentGallery}
                  onChange={(e) => {
                    handleContentGallery(e);
                  }}
                ></textarea>
              ) : (
                <div>
                  <div className="gallery-desc">{contentGallery}</div>
                  {likeModal ? (
                    <div
                      className="gallery-like2"
                      onClick={() => setlikeModal(!likeModal)}
                    ></div>
                  ) : (
                    <div
                      className="gallery-like1"
                      onClick={() => setlikeModal(!likeModal)}
                    ></div>
                  )}
                </div>
              )}
            </div>
            {sceneGallery.length !== 0 ? (
              <div className="gallery-group3">
                {sceneGallery.map((scene) => {
                  return (
                    <GalleryContent
                      key={scene.id}
                      scene={scene}
                      editModal={editModal}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="gallery-nocontent">
                <div className="gallery-nocontent-img"></div>
                <div className="gallery-nocontent-title">
                  장면을 추가해 주세요.
                </div>
              </div>
            )}
          </div>
          <MainFooter></MainFooter>
          <TopButton></TopButton>
        </div>
      </div>
      {deleteModal ? (
        <GalleryDeleteModal
          galleryId={galleryId}
          handleDeleteModal={handleDeleteModal}
        />
      ) : null}
    </div>
  );
}

export default Gallery;
