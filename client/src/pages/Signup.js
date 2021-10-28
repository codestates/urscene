import React, { useState } from "react";
import MainNav from "../components/MainNav";
import SignupModal from "../components/SignupModal";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";

function Signup() {
  const [modal, setModal] = useState(false);
  const [errMsg, setErrMsg] = useState(""); // 공통 에러 메세지
  const [emailErrMsg, setEmailErrMsg] = useState(""); // 이메일 에러 메세지
  const [pwErrMsg, setpwErrMsg] = useState(""); // 비밀번호 에러 메세지
  const [pwCheckErrMsg, setpwCheckErrMsg] = useState(""); // 비밀번호 확인 에러 메세지
  const [nickErrMsg, setNickErrMsg] = useState(""); // 닉네임 에러 메세지
  const [userinfo, setuserinfo] = useState({
    nickname: "",
    email: "",
    password: "",
  });
  //console.log("userinfo =>", userinfo);

  const handleInputValue = (key) => (e) => {
    setuserinfo({ ...userinfo, [key]: e.target.value });
  };

  const handleSignup = () => {
    setModal(!modal);
  };
  return (
    <div>
      <div>
        <MainNav />
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="signup">
            <div className="signupwrap">
              <div className="signup-title">회원가입</div>
              <div className="signup-email">
                <div className="signup-email-title">이메일</div>
                <input
                  onChange={handleInputValue("email")}
                  className="signup-email-input"
                ></input>
                {/* 정보 메세지 */}
                <div className="signup-email-warning">필수 정보입니다.</div>
                <div className="signup-email-warning">
                  사용하실 수 없는 이메일입니다.
                </div>
                <div className="signup-email-ok">사용 가능한 이메일입니다.</div>
                {/* 이메일 중복확인 기능 */}
                <button className="signup-email-check">중복확인</button>
              </div>
              <div className="signup-password">
                <div className="signup-email-title">비밀번호</div>
                <input
                  onChange={handleInputValue("password")}
                  className="signup-email-input"
                  type="password"
                ></input>
                <div className="signup-password-warning">
                  8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
                </div>
              </div>
              <div className="signup-repassword">
                <div className="signup-email-title">비밀번호 확인</div>
                <input className="signup-email-input" type="password"></input>
                <div className="signup-password-warning">필수정보입니다.</div>
                <div className="signup-password-warning">
                  비밀번호가 일치하지 않습니다.
                </div>
              </div>
              <div className="signup-nickname">
                <div className="signup-email-title">닉네임</div>
                <input
                  onChange={handleInputValue("nickname")}
                  className="signup-email-input"
                ></input>
                {/* 정보 메세지 */}
                <div className="signup-password-warning">필수정보입니다.</div>
                <div className="signup-password-warning">
                  비밀번호가 일치하지 않습니다.
                </div>
                <div className="signup-email-ok">사용 가능한 닉네임입니다.</div>
                <button className="signup-email-check">중복확인</button>
              </div>
              <div className="signup-image"> 프로필 이미지 선택</div>
              <div className="signup-image-group">
                <div className="signup-image-group-1"></div>
                <div className="signup-image-group-2"></div>
                <div className="signup-image-group-3"></div>
                <div className="signup-image-group-4"></div>
              </div>
              <div className="signup-btn" onClick={handleSignup}>
                <div className="signup-btn-text">가입하기</div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {modal ? <SignupModal handleSignup={handleSignup} /> : null}
      <MainFooter></MainFooter>
      <TopButton></TopButton>
    </div>
  );
}

export default Signup;
