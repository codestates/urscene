/*eslint-disable*/
import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../contexts/Store";
import MainNav from "../components/MainNav";
import WriteComment from "../components/WriteComment";
import Comment from "../components/Comment";
import MovieInfo from "../components/MovieInfo";
import SceneDeleteModal from "../components/SceneDeleteModal";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import SceneInGalleryAddModal from "../components/SceneInGalleryAddModal";
import axios from "axios";
import { useParams, useHistory } from "react-router";
axios.defaults.withCredentials = true;

function Post() {
  const { postId } = useParams();
  const { isLogin, userInfo } = useContext(MyContext); // 로그인 유저 정보
  const [movieModal, setMoiveModal] = useState(false); // 영화정보 열기닫기
  const [editModal, setEditModal] = useState(false); // 수정버튼 클릭시 장면 설명 수정
  const [likeModal, setlikeModal] = useState(false); // 좋아요 버튼 false가 안누른상태
  const [deleteModal, setDeleteModal] = useState(false); // 삭제 모달
  const [comments, setComments] = useState([]); // get 댓글목록 불러온거
  const [commentContent, setCommentContent] = useState(comments.length); // post 완료된 댓글목록 불러온거
  const [writeComment, setWriteComment] = useState(""); // 댓글 작성하기
  const [user, setuser] = useState(null); // 작성자 닉네임
  const [content, setcontent] = useState(null); // 작성 내용
  const [image, setimage] = useState(null); // 게시한 이미지
  const [description, setdescription] = useState(null); // 영화정보
  const [, setSinglePost] = useState(null);
  const [isUser] = useState(userInfo);
  const [likeId, setLikeId] = useState(""); // 좋아요 id
  const history = useHistory();
  const [addModal, setAddModal] = useState(false);
  const [haveGallery] = useState([]); // 갤러리 리스트

  const handleSetAddModal = () => {
    setAddModal(!addModal);
  };

  useEffect(() => {
    getSinglePost();
    getComments();
    getLikeinfo();
  }, []);

  useEffect(() => {
    getComments();
  }, [commentContent]);

  // 좋아요 정보 불러오기
  const getLikeinfo = () => {
    if (isLogin === false) return;
    axios
      .get(`${process.env.REACT_APP_EC2_URL}/singlepost/like/${postId}`)
      .then((res) => {
        //console.log("like info => ", res);
        if (res.data.Like === null) {
          setlikeModal(false);
        } else {
          setlikeModal(true);
          setLikeId(res.data.Like);
        }
      })
      .catch((err) => {
        console.log("getLikeinfo err=>", err);
      });
  };

  // 좋아요 요청 및 취소
  const onClickLikePost = () => {
    if (likeModal === false) {
      axios
        .post(`${process.env.REACT_APP_EC2_URL}/singlepost/like/${postId}`)
        .then((res) => {
          //console.log("like res =>", res.data);
          setlikeModal(true);
          setLikeId(res.data.check.id);
        })
        .catch((err) => {
          console.log("like post err =>", err);
        });
    } else if (likeModal === true) {
      axios
        .delete(`${process.env.REACT_APP_EC2_URL}/singlepost/like/${likeId}`)
        .then((res) => {
          setlikeModal(false);
        })
        .catch((err) => {
          console.log("unlike post err =>", err);
        });
    }
  };

  // 싱글 포스트 삭제하기
  const deletePost = () => {
    axios
      .delete(`${process.env.REACT_APP_EC2_URL}/singlepost/${postId}`)
      .then((res) => {
        history.push("/main");
      })
      .catch((err) => {
        console.log("delete post err => ", err);
      });
  };

  //싱글 포스트 수정하기
  const patchPostContent = () => {
    axios
      .patch(`${process.env.REACT_APP_EC2_URL}/singlepost/${postId}`, {
        content: content,
      })
      .then((res) => {
        setEditModal(false);
      })
      .catch((err) => {
        console.log("patch content err => ", err);
      });
  };

  const handleChangeContent = (e) => {
    setcontent(e.target.value);
  };

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  // 싱글포스트 가져오기
  const getSinglePost = () => {
    axios
      .get(`${process.env.REACT_APP_EC2_URL}/singlepost/${postId}`)
      .then((res) => {
        setSinglePost(res);
        setuser(res.data.data.User.nickname);
        setcontent(res.data.data.content);
        setimage(res.data.data.image);
        setdescription(res.data.data.Description);
      })
      .catch((err) => {
        console.log("getsinglepost err =>", err);
      });
  };

  // 댓글 가져오기
  const getComments = () => {
    axios
      .get(`${process.env.REACT_APP_EC2_URL}/comment/${postId}`)
      .then((res) => {
        setComments(res.data.data); // 응답 데이터 확인 필요
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
        `${process.env.REACT_APP_EC2_URL}/comment`,
        {
          singlepostid: postId,
          comment: writeComment,
        },
        { accept: "application/json" },
      )
      .then((res) => {
        writeCommentDeleted();
        setCommentContent(commentContent + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const writeCommentDeleted = () => {
    setWriteComment("");
  };

  // 댓글 삭제하기
  const deleteComment = (e) => {
    axios
      .delete(`${process.env.REACT_APP_EC2_URL}/comment/${e.target.id}`)
      .then((res) => {
        setCommentContent(commentContent - 1);
      })
      .catch((err) => {
        console.log("deleteComment err", err);
        console.log("comments.id");
      });
  };

  return (
    <div>
      <MainNav />
      <div className="post">
        <div className="postwrap">
          <div className="post-title">나의 장면</div>
          {isUser === null ? null : userInfo.nickname === user ? (
            <div className="post-editgroup">
              {editModal ? (
                <button className="post-edit-btn" onClick={patchPostContent}>
                  완료
                </button>
              ) : (
                <div>
                  <div
                    className="post-addTogall"
                    onClick={() => setAddModal(true)}
                  >
                    <div className="post-add-icon"></div>
                    갤러리에 추가
                  </div>
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
          ) : null}
          <div className="post-img-wrap">
            <img
              className="post-image"
              src={`https://urscene-s3-image.s3.us-east-2.amazonaws.com/${image}`}
              alt=""
            />
          </div>
          <div className="post-label">
            <div className="post-label-title">{user}</div>
            {userInfo !== null ? (
              <div
                className={likeModal ? "post-label-like2" : "post-label-like1"}
                onClick={onClickLikePost}
              ></div>
            ) : null}
          </div>
          {editModal ? (
            // 장면 설명 수정
            <>
              <textarea
                wrap="hard"
                onChange={handleChangeContent}
                className="post-editdesc"
              >
                {content}
              </textarea>
            </>
          ) : (
            <div className="post-desc">
              <pre>{content}</pre>
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
            {movieModal === false ? null : (
              <MovieInfo description={description} />
            )}
          </div>
          <div className="post-devider2" />
          {!isUser ? null : (
            <WriteComment
              writeComment={writeComment}
              userInfo={userInfo}
              handleInputValue={handleInputValue}
              postComment={postComment}
            />
          )}
          <div className="post-comments">
            {/* <MyComment /> */}
            {comments.length === 0 ? (
              <div className="post-comment-no">첫 댓글을 남겨보세요!</div>
            ) : (
              comments.map((el) => {
                return (
                  <Comment
                    key={el.id}
                    userInfo={userInfo}
                    comments={el}
                    deleteComment={deleteComment}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
      <MainFooter></MainFooter>
      <TopButton></TopButton>
      {deleteModal ? (
        <SceneDeleteModal
          deletePost={deletePost}
          handleDeleteModal={handleDeleteModal}
        />
      ) : null}
      {addModal ? (
        <SceneInGalleryAddModal
          handleSetAddModal={handleSetAddModal}
          postId={postId}
          haveGallery={haveGallery}
        />
      ) : null}
    </div>
  );
}

export default Post;
