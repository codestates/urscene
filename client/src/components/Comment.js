import React, { useState, useEffect, useContext } from "react";
import Jake from "../img/UserImage-Jake.png";
import Meg from "../img/UserImage-Meg.png";
import Mili from "../img/UserImage-Mili.png";
import Steven from "../img/UserImage-Steven.png";

function Comment({ comments, userInfo, deleteComment }) {
  const [isUser, setIsUser] = useState(userInfo);
  const imgId = { 0: Jake, 1: Meg, 2: Mili, 3: Steven };
  const [userImg, setUserImg] = useState(imgId[comments.User.image]);

  console.log("comment userinfo =>", isUser);
  console.log("comments userinfo =>", comments.User);
  return (
    <>
      <div className="post-mycomment">
        <div className="post-mycomment-group1">
          <img className="post-mycomment-group1-logo" src={userImg}></img>
        </div>
        <div className="post-mycomment-group2">
          <div className="post-mycomment-group2-nickname">
            {comments.User.nickname}
          </div>
          <div className="post-mycomment-group2-comment">
            {comments.comment}
          </div>

          {isUser === null ? null : userInfo.nickname ===
            comments.User.nickname ? (
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
