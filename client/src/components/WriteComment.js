import React, { useState } from "react";
import Jake from "../img/UserImage-Jake.png";
import Meg from "../img/UserImage-Meg.png";
import Mili from "../img/UserImage-Mili.png";
import Steven from "../img/UserImage-Steven.png";

function WriteComment({
  handleInputValue,
  postComment,
  userInfo,
  writeComment,
}) {
  const imgId = { 0: Jake, 1: Meg, 2: Mili, 3: Steven };
  const [userImg] = useState(imgId[userInfo.image]);

  //console.log("댓글쓰기 userInfo => ", userInfo.image);
  return (
    <div className="post-writecomment">
      <form onSubmit={(e) => e.preventDefault()}>
        <img className="post-wc-image" src={userImg} alt={userImg} />
        <input
          type="text"
          value={writeComment}
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
