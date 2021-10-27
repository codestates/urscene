import React, { useState } from "react";
import MainNav from "../components/MainNav";
import GalleryContent from "../components/GalleryContent";
import GalleryDeleteModal from "../components/GalleryDeleteModal";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";

function Gallery() {
  const [likeModal, setlikeModal] = useState(false); // 좋아요 버튼 false가 안누른상태
  const [editModal, setEditModal] = useState(false); // 수정버튼 클릭시 장면 설명 수정
  const [deleteModal, setDeleteModal] = useState(false); // 삭제 버늩 클릭시 삭제 모달 팝업

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  return (
    <div>
      <div>
        <MainNav />
        <div className="gallery">
          <div className="gallerywrap">
            <div className="gallery-nickname">닉네임자리</div>
            <div className="gallery-group1">
              {editModal ? (
                <div>
                  <textarea className="gallery-titleinput">
                    로맨스만 모았다.
                  </textarea>
                  <div
                    className="gallery-btn"
                    onClick={() => setEditModal(!editModal)}
                  >
                    완료
                  </div>
                </div>
              ) : (
                <div>
                  <div className="gallery-title">로맨스만 모았다.</div>
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
            <div className="gallery-group2">
              {editModal ? (
                <textarea className="gallery-descinput">
                  로맨스만 모았다.
                </textarea>
              ) : (
                <div>
                  <div className="gallery-desc">
                    로맨스라는 로맨스라는 로맨스 사랑이 넘치는 로맨스장면들만
                    가득있는 곳{" "}
                  </div>
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
            <div className="gallery-group3">
              {/* <div className="gallery-nocontent">

                  <div className="gallery-nocontent-img"></div>
                  <div className="gallery-nocontent-title">장면을 추가해 주세요.</div>
                </div> */}
              <GalleryContent editModal={editModal} />
              <GalleryContent editModal={editModal} />
              <GalleryContent editModal={editModal} />
              <GalleryContent editModal={editModal} />
            </div>
          </div>
          <MainFooter></MainFooter>
          <TopButton></TopButton>
        </div>
      </div>
      {deleteModal ? (
        <GalleryDeleteModal handleDeleteModal={handleDeleteModal} />
      ) : null}
    </div>
  );
}

export default Gallery;
