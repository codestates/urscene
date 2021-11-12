import React, { useEffect, useContext, useState } from "react";
import MainNav from "../components/MainNav";
import GalleryContent from "../components/GalleryContent";
import GalleryDeleteModal from "../components/GalleryDeleteModal";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import { useHistory, useParams } from "react-router";
import { MyContext } from "../contexts/Store";
import galleryAPI from "../api/galleryAPI";
import likeAPI from "../api/likeAPI";
require("dotenv").config();

function Gallery() {
  const history = useHistory();
  const { userInfo } = useContext(MyContext); // 유저 정보를 확인
  const { galleryId } = useParams();
  const [likeModal, setlikeModal] = useState(false); // 좋아요 버튼 false가 안누른상태
  const [editDeleteModal, setEditDeleteModal] = useState(true); // 수정버튼 클릭시 장면 설명 수정
  const [editModal, setEditModal] = useState(false); // 수정버튼 클릭시 장면 설명 수정
  const [deleteModal, setDeleteModal] = useState(false); // 삭제 버튼 클릭시 삭제 모달 팝업
  const [galleryLikeId, setGalleryLikeId] = useState("");

  const [nicknameGallery, setNicknameGallery] = useState(""); // API로 받아온 갤러리 작성자 닉네임
  const [titleGallery, setTitleGallery] = useState(""); // API로 받아온 갤러리 타이틀
  const [contentGallery, setContentGallery] = useState(""); // API로 받아온 갤러리 설명
  const [sceneGallery, setSceneGallery] = useState([]); // API로 받아온 갤러리 장면

  const handleMatchingUserAndnickName = () => {
    if (userInfo === null) {
      setEditDeleteModal(true);
    } else if (userInfo.nickname === nicknameGallery) {
      setEditDeleteModal(false);
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

  // 갤러리 정보 불러오기
  const handleLandingDetailGallery = async () => {
    try {
      const result = await galleryAPI.getGalleryId(galleryId);
      setNicknameGallery(result.nickname);
      setTitleGallery(result.title);
      setContentGallery(result.content);
      setSceneGallery(result.singlepost);
    } catch (err) {
      console.log(err);
    }
  };

  // 갤러리 정보 수정 => 두번 연속 수정할시 오류, 수정 필요
  const handlePatchGallery = async () => {
    try {
      await galleryAPI.patchInfo(galleryId, titleGallery, contentGallery);
      setEditModal(false);
      history.push(`gallery/${galleryId}`);
    } catch (err) {
      console.log(err);
    }
  };

  // 좋아요 정보 불러오는 함수
  const handleLandingLike = async () => {
    if (userInfo === null) return;
    try {
      const result = await likeAPI.getGallery(galleryId);
      if (result === null) {
        setlikeModal(false);
      } else if (result) {
        setlikeModal(true);
        setGalleryLikeId(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    if (userInfo === null) return;
    if (likeModal === false) {
      // 좋아요가 아닌 상태
      try {
        const result = await likeAPI.postGallery(galleryId);
        setlikeModal(true);
        setGalleryLikeId(result);
      } catch (err) {
        console.log(err);
      }
    } else if (likeModal === true) {
      // 좋아요한 상태
      try {
        await likeAPI.deleteGallery(galleryLikeId);
        setlikeModal(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    handleLandingDetailGallery();
    handleLandingLike();
  }, []);

  useEffect(() => {
    handleMatchingUserAndnickName();
  }, [nicknameGallery]);

  return (
    <div>
      <div>
        <MainNav />
        <div className="gallery">
          <div className="gallerywrap">
            <div className="gallery-nickname">{nicknameGallery} 님의</div>
            <div className="gallery-group1">
              {editModal ? (
                <div>
                  <input
                    className="gallery-titleinput"
                    value={titleGallery}
                    onChange={(e) => {
                      handleTitleGallery(e);
                    }}
                  ></input>
                  <div className="gallery-btn" onClick={handlePatchGallery}>
                    완료
                  </div>
                </div>
              ) : (
                <div>
                  <div className="gallery-title">{titleGallery}</div>
                  {editDeleteModal ? null : (
                    <div className="gallery-edit-group">
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
                  wrap="hard"
                  className="gallery-descinput"
                  value={contentGallery}
                  onChange={(e) => {
                    handleContentGallery(e);
                  }}
                ></textarea>
              ) : (
                <div className="gallery-desc-group">
                  <div className="gallery-desc">
                    <pre>{contentGallery}</pre>
                  </div>
                  <div className="gallery-likeGroup">
                    {userInfo === null ? null : (
                      <div
                        className={
                          likeModal ? "gallery-like" : "gallery-unlike"
                        }
                        onClick={handleLike}
                      ></div>
                    )}
                  </div>
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
                      galleryId={galleryId}
                      handleLandingDetailGallery={handleLandingDetailGallery}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="gallery-nocontent-wrap">
                <div className="gallery-nocontent-img"></div>
                <div className="gallery-nocontent-title">
                  장면이 없습니다.
                  <br />
                  갤러리에 장면을 추가해주세요.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <MainFooter></MainFooter>
      <TopButton></TopButton>
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
