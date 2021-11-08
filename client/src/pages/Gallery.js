import React, { useEffect, useContext, useState } from "react";
import MainNav from "../components/MainNav";
import GalleryContent from "../components/GalleryContent";
import GalleryDeleteModal from "../components/GalleryDeleteModal";
import SceneInGalleryDeleteModal from "../components/SceneInGalleryDeleteModal";
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
  const [deleteModal, setDeleteModal] = useState(false); // 삭제 버튼 클릭시 삭제 모달 팝업
  const [requireLoginModal, setRequireLoginModal] = useState(false);
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

  const handleLandingDetailGallery = () => {
    axios
      .get(`${process.env.REACT_APP_EC2_URL}/gallery/${galleryId}`)
      .then((res) => {
        // console.log(res.data);
        setNicknameGallery(res.data.nickname);
        setTitleGallery(res.data.title);
        setContentGallery(res.data.content);
        setSceneGallery(res.data.singlepost);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 갤러리 정보 수정 함수
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

  // 좋아요 정보 불러오는 함수
  const handleLandingLike = () => {
    if (userInfo === null) return;
    axios
      .get(`${process.env.REACT_APP_EC2_URL}/gallery/like/${galleryId}`)
      .then((res) => {
        if (res.data.Like === null) {
          setlikeModal(false);
        } else if (res.data.Like) {
          setlikeModal(true);
          setGalleryLikeId(res.data.Like);
        }
      })
      .catch((err) => {
        console.log("좋아요 정보가 없습니다.");
        console.log(err);
      });
  };

  // 좋아요 생성 취소 함수
  const handleLike = () => {
    // 비로그인 사용자에게는 로그인이 필요합니다 안내메시지 표시
    if (userInfo === null) {
      setRequireLoginModal(true);
      return;
    }
    if (likeModal === false) {
      // 빈 하트 이므로 like 요청을 보내고
      // 성공을 하면 true로 바꿔준다.
      axios
        .post(`${process.env.REACT_APP_EC2_URL}/gallery/like/${galleryId}`)
        .then((res) => {
          setlikeModal(true);
          setGalleryLikeId(res.data.Likedata.id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (likeModal === true) {
      // 풀 하트 이므로 delete like 요청을 보내고
      // 성공을 하면 false로 바꿔준다.
      console.log("galleryLikeId===", galleryLikeId);
      axios
        .delete(
          `${process.env.REACT_APP_EC2_URL}/gallery/like/${galleryLikeId}`,
        )
        .then((res) => {
          setlikeModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
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
                  <textarea
                    className="gallery-titleinput"
                    value={titleGallery}
                    onChange={(e) => {
                      handleTitleGallery(e);
                    }}
                  ></textarea>
                  <div className="gallery-btn" onClick={handlePatchGallery}>
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
