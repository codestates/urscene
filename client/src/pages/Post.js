import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../contexts/Store";
import MainNav from "../components/MainNav";
import MyComment from "../components/MyComment";
import WriteComment from "../components/WriteComment";
import Comment from "../components/Comment";
import MovieInfo from "../components/MovieInfo";
import SceneDeleteModal from "../components/SceneDeleteModal";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import axios from "axios";
import { useParams } from "react-router";
axios.defaults.withCredentials = true;

function Post() {
  const { postId } = useParams();
  const { userInfo } = useContext(MyContext); // 유저 정보를 확인
  const [movieModal, setMoiveModal] = useState(false); // 영화정보 열기닫기
  const [editModal, setEditModal] = useState(false); // 수정버튼 클릭시 장면 설명 수정
  const [likeModal, setlikeModal] = useState(false); // 좋아요 버튼 false가 안누른상태
  const [deleteModal, setDeleteModal] = useState(false); // 좋아요 버튼 false가 안누른상태
  const [comments, setComments] = useState([]); //
  const [writeComment, setWriteComment] = useState("");
  console.log(writeComment);

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  // 싱글포스트 생성 시 얻은 id, 잠시 임의의 값 넣어둠
  const singlepostid = 11;

  // 댓글 가져오기
  const getComments = () => {
    axios
      .get(`http://localhost:80/comment/${singlepostid}`)
      .then((res) => {
        console.log("comment res ???", res);
        setComments(res.data.data.comment); // 응답 데이터 확인 필요
      })
      .catch((err) => console.error(err));
  };

  const handleInputValue = (e) => {
    setWriteComment(e.target.value);
  };

  // 댓글 달기
  const postComment = () => {
    axios
      .post(
        "http://localhost:80/comment",
        {
          singlepostid: singlepostid, // id 확인 필요
          comment: writeComment,
        },
        { accept: "application/json" },
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getComments();
  }, [comments]);

  return (
    <div>
      <MainNav />
      <div className="post">
        <div className="postwrap">
          <div className="post-title">나의 장면, postId = {postId}</div>
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
          <WriteComment
            handleInputValue={handleInputValue}
            postComment={postComment}
          />
          <div className="post-comments">
            <MyComment />
            {!comments ? (
              <div className="post-comment-no">첫 댓글을 남겨보세요!</div>
            ) : (
              <Comment />
            )}
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
