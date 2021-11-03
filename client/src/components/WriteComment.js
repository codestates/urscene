function WriteComment({ handleInputValue, postComment, curImg }) {
  return (
    <div className="post-writecomment">
      <form onSubmit={() => postComment()}>
        {/* <form> */}
        <img className="post-wc-image" src={curImg} />
        <input
          type="text"
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
