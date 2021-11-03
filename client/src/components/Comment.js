function Comment({ comments, userInfo, deleteComment }) {
  // console.log("login userinfo =>", userInfo);
  // console.log("comments userinfo =>", comments.User);
  return (
    <>
      <div className="post-mycomment">
        <div className="post-mycomment-group1">
          <img className="post-mycomment-group1-logo" src={"curImg"}></img>
        </div>
        <div className="post-mycomment-group2">
          <div className="post-mycomment-group2-nickname">
            {comments.User.nickname}
          </div>
          <div className="post-mycomment-group2-comment">
            {comments.comment}
          </div>
          {userInfo.nickname === comments.User.nickname ? (
            <div
              onClick={deleteComment}
              id={comments.id}
              className="post-mycomment-group2-delete"
            ></div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Comment;
