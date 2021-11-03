function Comment({ comments }) {
  return (
    <div className="post-mycomment">
      <div className="post-mycomment-group1">
        <img
          className="post-mycomment-group1-logo"
          src="img/UserImage-Jake.png"
        ></img>
      </div>
      <div className="post-mycomment-group2">
        <div className="post-mycomment-group2-nickname">
          {comments.User.nickname}
        </div>
        <div className="post-mycomment-group2-comment">{comments.comment}</div>
      </div>
    </div>
  );
}

export default Comment;
