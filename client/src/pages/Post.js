import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../contexts/Store";
import MainNav from "../components/MainNav";
import WriteComment from "../components/WriteComment";
import Comment from "../components/Comment";
import MovieInfo from "../components/MovieInfo";
import SceneDeleteModal from "../components/SceneDeleteModal";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import axios from "axios";
import { useParams, useHistory } from "react-router";
axios.defaults.withCredentials = true;

function Post() {
  const { postId } = useParams();
  const { userInfo } = useContext(MyContext); // 로그인 유저 정보
  const [movieModal, setMoiveModal] = useState(false); // 영화정보 열기닫기
  const [editModal, setEditModal] = useState(false); // 수정버튼 클릭시 장면 설명 수정
  const [likeModal, setlikeModal] = useState(false); // 좋아요 버튼 false가 안누른상태
  const [deleteModal, setDeleteModal] = useState(false); // 삭제 모달
  const [comments, setComments] = useState([]); // 댓글목록
  const [writeComment, setWriteComment] = useState(""); // 댓글 작성하기
  const [user, setuser] = useState(null); // 작성자 닉네임
  const [content, setcontent] = useState(null); // 작성 내용
  const [image, setimage] = useState(null); // 게시한 이미지
  const [description, setdescription] = useState(null); // 영화정보
  const [singlePost, setSinglePost] = useState(null);
  const [isUser, setIsUser] = useState(userInfo);
  const [likeId, setLikeId] = useState("");
  const history = useHistory();
  console.log(singlePost, "<=singlepost");
  console.log("comments => ", comments);
  // console.log("user => ", user);
  console.log("post userInfo =>", userInfo);
  //console.log("likeId => ", likeId);

  useEffect(() => {
    getSinglePost();
    getComments();
  }, []);

  // 좋아요 요청 및 취소
  const onClickLikePost = () => {
    if (likeModal === false) {
      axios
        .post(`http://localhost:80/singlepost/like/${postId}`)
        .then((res) => {
          console.log("like res =>", res.data);
          setlikeModal(true);
          setLikeId(res.data.check.id);
        })
        .catch((err) => {
          console.log("like post err =>", err);
        });
    } else if (likeModal === true) {
      axios
        .delete(`http://localhost:80/singlepost/like/${likeId}`)
        .then((res) => {
          console.log("unlike res =>", res.data);
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
      .delete(`http://localhost:80/singlepost/${postId}`)
      .then((res) => {
        console.log(res.data);
        history.push("/main");
      })
      .catch((err) => {
        console.log("delete post err => ", err);
      });
  };

  //싱글 포스트 수정하기
  const patchPostContent = () => {
    axios
      .patch(`http://localhost:80/singlepost/${postId}`, {
        content: content,
      })
      .then((res) => {
        setEditModal(false);
        console.log(res.status);
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
      .get(`http://localhost:80/singlepost/${postId}`)
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
      .get(`http://localhost:80/comment/${postId}`)
      .then((res) => {
        //console.log("comment res ???", res.data.data);
        setComments(res.data.data); // 응답 데이터 확인 필요
        //comments.concat(res.data.data);
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
          singlepostid: postId,
          comment: writeComment,
        },
        { accept: "application/json" },
      )
      .then((res) => {
        console.log(res.status);
        setWriteComment("");
        // window.location.replace(`/post/${postId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 댓글 삭제하기
  const deleteComment = (e) => {
    axios
      .delete(`http://localhost:80/comment/${e.target.id}`)
      .then((res) => {
        console.log(res.data);
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
          {isUser === null ? null : (
            <div className="post-editgroup">
              {editModal ? (
                <button className="post-edit-btn" onClick={patchPostContent}>
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
          )}

          <img
            className="post-image"
            src={`https://urscene-s3-image.s3.us-east-2.amazonaws.com/${image}`}
            alt=""
          />
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
            <textarea onChange={handleChangeContent} className="post-editdesc">
              {content}
            </textarea>
          ) : (
            <div className="post-desc">{content}</div>
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
    </div>
  );
}

export default Post;
