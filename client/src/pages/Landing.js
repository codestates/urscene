import React from "react";
import { Link } from "react-router-dom";
import MainFooter from "../components/MainFooter";

function Landing() {
  return (
    <div>
      <div className="mainNav-group-logo"></div>
      <center>
        <div className="landing-main-container">
          <div className="landing-main-img">
            <div className="landing-main-text">
              <span>서로 다른 장면으로</span>
              <br></br>
              <span>공감하는 하나의 영화</span>
            </div>
          </div>
          <div className="landing-main-subt-1">
            <span>잊을 수 없는, 강렬했던, 나만보기 아까운,</span>
            <br></br>
            <span>영화 속 그 장면</span> <hr />
          </div>
          <div className="landing-main-subt-2">
            <span>바로 이곳에서 그 장면을</span>
            <br></br>
            <span>함께 나누고 소통해 보세요.</span>
          </div>
        </div>
      </center>

      <div className="go-to-main-wrap">
        <Link className="link" to="/main">
          <span className="go-to-main">바로시작</span>
        </Link>
      </div>
      <div className="landing-2-container">
        <div className="landing-2-text-box">
          <div className="landing-2-icon-1"></div>
          <div className="landing-2-text-title">
            공유하고 싶은 영화 속 장면을
            <br></br>
            마음껏 게시하세요.
          </div>
          <div className="landing-2-text-sub">
            장면을 보고 댓글로 의견을 나누며 서로의
            <br></br>
            생각을 공유해 보세요.
          </div>
        </div>
        <div className="landing-2-img">시연영상 들어갈 예정</div>
      </div>
      <div className="landing-2-container">
        <div className="landing-2-text-box">
          <div className="landing-2-icon-2"></div>
          <div className="landing-2-text-title">
            테마별로 영화 속 장면들을
            <br></br>
            모아보고 싶다면?
          </div>
          <div className="landing-2-text-sub">
            영화 속 장면들을 모아 나만의
            <br></br>
            개성넘치는 갤러리를 만들어 보세요.
          </div>
        </div>
        <div className="landing-2-img">시연영상 들어갈 예정</div>
      </div>
      <div className="landing-2-container">
        <div className="landing-2-text-box">
          <div className="landing-2-icon-3"></div>
          <div className="landing-2-text-title">
            갤러리, 개성이 넘치다 못해
            <br></br>
            흐른다구요?
          </div>
          <div className="landing-2-text-sub">
            마음에 드는 갤러리는 좋아요 쿡!
            <br></br>
            인기 갤러리에 도전해 보세요.
          </div>
        </div>
        <div className="landing-2-img">시연영상 들어갈 예정</div>
      </div>
      <center>
        <div className="landing-start-wrap">
          <div className="start-box">
            <div className="start-sub">영화 속 한 장면이 떠오르시나요?</div>
            <div className="start-title">지금 바로 시작해 보세요!</div>
            <Link className="link" to="/main">
              <div className="start-btn">
                <div className="start-btn-text">Get Started</div>
                <div className="start-btn-arrow"></div>
              </div>
            </Link>
          </div>
        </div>
      </center>
      <MainFooter />
    </div>
  );
}

export default Landing;
