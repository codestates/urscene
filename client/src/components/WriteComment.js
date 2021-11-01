function WriteComment({ handleInputValue, postComment }) {
  return (
    <div className="post-writecomment">
      <form onSubmit={(e) => e.preventDefault()}>
        <img className="post-wc-image" src="img/UserImage-Jake.png" />
        <input
          onChange={(e) => handleInputValue(e)}
          className="post-wc-input"
          placeholder="댓글 달기..."
        ></input>
        <div onClick={() => postComment()} className="post-wc-submit">
          게시
        </div>
      </form>
    </div>
  );
}

export default WriteComment;
