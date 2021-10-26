import React from "react";
import MainNav from "../components/MainNav";

function Gallery() {
  return (
    <div>
      <MainNav />
      <div className="gallery">
        <div className="gallerywrap">
          <div className="gallery-title">나의 장면</div>
          <div className="gallery-editgroup">
            <div className="gallery-edit-edit"></div>
            <div className="gallery-edit-delete"></div>
          </div>
          <img className="gallery-image" src="img/background.jpeg" />
          <div className="gallery-label">
            <div className="gallery-label-title">닉네임 자리</div>
            <div className="gallery-label-like1"></div>
            <div className="gallery-label-like2"></div>
          </div>
          <div className="gallery-desc">영화 초반, 코드와 아서가 사이토에게 정보를 추출하는 일을 한다. 피셔에게 인셉션을 실행하는데 이것을 정보를 심는 일</div>
          <div className="gallery-devider" />
          <div className="gallery-infogroup">
            <div className="gallery-infogroup-label">영화정보 -</div>
            <ul className="gallery-infogroup-title">
              <li className="gallery-infogroup-list">영화제목 : 이상한 나라의 엘리스</li>
              <li className="gallery-infogroup-list">장르 : 판타지</li>
              <li className="gallery-infogroup-list">감독 : 토끼</li>
              <li className="gallery-infogroup-list">개봉 : 2009년</li>
            </ul>
          </div>
          <div className="gallery-devider2" />
          <div className="gallery-writecomment">
            <img className="gallery-wc-image" src="img/UserImage-Jake.png" />
            <input className="gallery-wc-input" placeholder="댓글 달기..."></input>
            <div className="gallery-wc-submit">게시</div>
          </div>
          <div className="gallery-comments">
            <div className="gallery-mycomment">
              <div className="gallery-mycomment-group1">
                <img className="gallery-mycomment-group1-logo" src="img/UserImage-Jake.png"></img>
              </div>
              <div className="gallery-mycomment-group2">
                <div className="gallery-mycomment-group2-nickname">닉네임자리</div>
                <div className="gallery-mycomment-group2-comment">닉네임자리</div>
                <div className="gallery-mycomment-group2-delete"> </div>
              </div>
            </div>
            <div className="gallery-mycomment">
              <div className="gallery-mycomment-group1">
                <img className="gallery-mycomment-group1-logo" src="img/UserImage-Jake.png"></img>
              </div>
              <div className="gallery-mycomment-group2">
                <div className="gallery-mycomment-group2-nickname">닉네임자리</div>
                <div className="gallery-mycomment-group2-comment">닉네임자리</div>
                <div className="gallery-comment-group2-delete"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
