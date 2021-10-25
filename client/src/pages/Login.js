import React from "react";
import MainNav from "../components/MainNav";

function Login() {
  return (
    <div>
      <MainNav />
      <div className="login">
        <div className="loginwrap">
          <div className="lin-title">로그인</div>
          <div className="lin-email">
            <div className="lin-email-title">이메일</div>
            <input className="lin-email-input"></input>
            <div className="lin-email-warning">필수 정보입니다.</div>
          </div>
          <div className="lin-password">
            <div className="lin-password-title">비밀번호</div>
            <input className="lin-password-input" type="password"></input>
            <div className="lin-password-warning">필수 정보입니다.</div>
          </div>
          <button type="submit" id="lin-btnLogin">
            로그인
          </button>
          <div className="lin-signup">
            <div className="lin-signup-text">회원가입</div>
          </div>
          <div className="lin-divider"></div>
          <div>
            <button className="lin-kakao">
              <div className="lin-kakao-logo"></div>
              <div className="lin-kakao-text">카카오 로그인</div>
            </button>
          </div>
          <div>
            <button className="lin-google">
              <div className="lin-google-logo"></div>
              <div className="lin-google-text">구글 로그인</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

{
  /* 
          <div className="lin-email">
            <div className="lin-em-group">
              <div className="lin-em-group-label">
                <div className="lin-em-group-label2">
                  <div className="lin-em-group-label2-text">이메일</div>
                </div>
              </div>
            </div>
            <div className="lin-em-text">
              <div className="lin-em-text-label">
                <input className="lin-em-text-label-input"></input>
              </div>
            </div>
            <div className="lin-em-warning">
              <div className="lin-em-warning-label">
                <div className="lin-em-warning-label-text">필수 정보입니다.</div>
              </div>
            </div>
          </div>
          <div className="lin-password">
            <div className="lin-pw-group">
              <div className="lin-pw-group-label">
                <div className="lin-pw-group-label2">
                  <div className="lin-pw-group-label2-text">비밀번호</div>
                </div>
              </div>
            </div>
            <div className="lin-pw-text">
              <div className="lin-pw-text-label">
                <input className="lin-pw-text-label-input" type="password"></input>
              </div>
            </div>
            <div className="lin-pw-warning">
              <div className="lin-pw-warning-label">
                <div className="lin-pw-warning-label-text">필수 정보입니다.</div>
              </div>
            </div>
          </div>
          <button type="submit" id="lin-loginbtn">
            <div className="lin-loginbtn-text">로그인</div>
          </button>
          <div className="lin-signup">회원가입</div>
          <div className="lin-divider"></div>
          <div className="lin-kakao">
            <div className="lin-kakao-text">카카오 로그인</div>
            <div className="lin-kakao-logo">로고</div>
          </div>
          <div className="lin-google"></div>
          <div className="lin-google-text">구글 로그인</div>
          <div className="lin-google-logo">로고</div> */
}
