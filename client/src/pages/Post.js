import React, { useState } from "react";
import MainNav from "../components/MainNav";
import MyComment from "../components/MyComment";
import WriteComment from "../components/WriteComment";
import Comment from "../components/Comment";
import MovieInfo from "../components/MovieInfo";
import SceneDeleteModal from "../components/SceneDeleteModal";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";

function Post() {
  const [movieModal, setMoiveModal] = useState(false); // 영화정보 열기닫기
  const [editModal, setEditModal] = useState(false); // 수정버튼 클릭시 장면 설명 수정
  const [likeModal, setlikeModal] = useState(false); // 좋아요 버튼 false가 안누른상태
  const [deleteModal, setDeleteModal] = useState(false); // 좋아요 버튼 false가 안누른상태

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  return (
    <div>
      <MainNav />
      <div className="post">
        <div className="postwrap">
          <div className="post-title">나의 장면</div>
          <div className="post-editgroup">
            {editModal ? (
              <button
                className="post-edit-btn"
                onClick={() => setEditModal(false)}
              >
                완료
              </button>
            ) : (
              <div>
                <div
                  className="post-edit-delete"
                  onClick={() => setDeleteModal(true)}
                ></div>
                <div
                  className="post-edit-edit"
                  onClick={() => setEditModal(true)}
                ></div>
              </div>
            )}
          </div>
          <img
            className="post-image"
            src={
              "https://urscene-s3-image.s3.us-east-2.amazonaws.com/521635346301520.jpeg"
            }
            alt=""
          />
          <div className="post-label">
            <div className="post-label-title">닉네임 자리</div>
            {likeModal ? (
              <div
                className="post-label-like2"
                onClick={() => setlikeModal(false)}
              ></div>
            ) : (
              <div
                className="gallery-label-like1"
                onClick={() => setlikeModal(true)}
              ></div>
            )}
          </div>
          {editModal ? (
            <textarea className="post-editdesc">
              영화 초반, 코드와 아서가 사이토에게 정보를 추출하는 일을 한다.
              피셔에게 인셉션을 실행하는데 이것을 정보를 심는 일
            </textarea>
          ) : (
            <div className="post-desc">
              영화 초반, 코드와 아서가 사이토에게 정보를 추출하는 일을 한다.
              피셔에게 인셉션을 실행하는데 이것을 정보를 심는 일
            </div>
          )}
          <div className="post-devider" />
          <div
            className="post-infogroup"
            onClick={() => setMoiveModal(!movieModal)}
          >
            <div className="post-infogroup-label">영화정보</div>
            <div className="post-infogroup-plusminus">
              {movieModal === false ? (
                <div className="post-infogroup-plus"></div>
              ) : (
                <div className="post-infogroup-minus"></div>
              )}
            </div>
            {movieModal === false ? null : <MovieInfo />}
          </div>
          <div className="post-devider2" />
          <WriteComment />
          <div className="post-comments">
            <MyComment />
            <Comment />
          </div>
        </div>
      </div>
      <MainFooter></MainFooter>
      <TopButton></TopButton>
      {deleteModal ? (
        <SceneDeleteModal handleDeleteModal={handleDeleteModal} />
      ) : null}
    </div>
  );
}

export default Post;
