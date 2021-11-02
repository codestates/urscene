import React, { useState, useContext } from "react";
import MainNav from "../components/MainNav";
import { Link } from "react-router-dom";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import axios from "axios";
import { MyContext } from "../contexts/Store";

axios.defaults.withCredentials = true;

function Login() {
  const { handleResponseSuccess } = useContext(MyContext);
  const [userinfo, setuserinfo] = useState({
    email: "",
    password: "",
  });
  console.log(userinfo);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleInputValue = (key) => (e) => {
    setuserinfo({ ...userinfo, [key]: e.target.value });
  };

  const emailValidation = (e) => {
    const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regExp.test(e.target.value)) {
      setEmailErrMsg("이메일 형식이 맞지 않습니다.");
    } else {
      setEmailErrMsg("");
    }
  };

  const handleLogin = () => {
    const { email, password } = userinfo;
    if (email === "" || password === "") {
      setErrMsg("필수 정보입니다.");
    } else {
      setErrMsg("");
      axios
        .post("http://localhost:80/signin", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log("login success ??", res);
          // 로그인이 성공했으니 유저 정보를 불러오고, 로그인 상태를 변경해야한다.
          handleResponseSuccess();
        })
        .catch((err) => {
          console.log("login err message=>", err);
        });
    }
  };

  return (
    <div>
      <MainNav />
      <div className="login">
        <div className="loginwrap">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="lin-title">로그인</div>
            <div className="lin-email">
              <div className="lin-email-title">이메일</div>
              <input
                onBlur={emailValidation}
                onChange={handleInputValue("email")}
                className="lin-email-input"
              ></input>
              {userinfo.email === "" ? (
                <div className="lin-email-warning">{errMsg}</div>
              ) : (
                <div className="lin-email-warning">{emailErrMsg}</div>
              )}
            </div>
            <div className="lin-password">
              <div className="lin-password-title">비밀번호</div>
              <input
                onChange={handleInputValue("password")}
                className="lin-password-input"
                type="password"
              ></input>
              {userinfo.password === "" ? (
                <div className="lin-password-warning">{errMsg}</div>
              ) : null}
            </div>
            <button type="submit" id="lin-btnLogin" onClick={handleLogin}>
              로그인
            </button>
            <Link to="signup">
              <div className="lin-signup">
                <div className="lin-signup-text">회원가입</div>
              </div>
            </Link>
            <div className="lin-divider"></div>
            <div>
              <button className="lin-kakao"></button>
            </div>
            <div>
              <button className="lin-google">
                <div className="lin-google-logo"></div>
                <div className="lin-google-text">구글 로그인</div>
              </button>
            </div>
          </form>
        </div>
      </div>
      <MainFooter></MainFooter>
      <TopButton></TopButton>
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
