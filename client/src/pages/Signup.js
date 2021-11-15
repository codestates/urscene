/*eslint-disable*/
import React, { useState } from "react";
import MainNav from "../components/MainNav";
import SignupModal from "../components/SignupModal";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import Jake from "../img/UserImage-Jake.png";
import Meg from "../img/UserImage-Meg.png";
import Mili from "../img/UserImage-Mili.png";
import Steven from "../img/UserImage-Steven.png";
import axios from "axios";

axios.defaults.withCredentials = true;

function Signup() {
  const [modal, setModal] = useState(false);
  const [errMsg, setErrMsg] = useState(""); // 공통 에러 메세지
  const [emailErrMsg, setEmailErrMsg] = useState(""); // 이메일 에러 메세지
  const [emailCheckMsg, setEmailCheckMsg] = useState(""); // 이메일 사용가능 메세지
  const [pwErrMsg, setpwErrMsg] = useState(""); // 비밀번호 에러 메세지
  const [pwCheckErrMsg, setpwCheckErrMsg] = useState(""); // 비밀번호 확인 에러 메세지
  const [nickErrMsg, setNickErrMsg] = useState(""); // 닉네임 에러 메세지
  const [nickCheckMsg, setNickCheckMsg] = useState(""); // 닉네임 사용가능 메세지
  const [userinfo, setuserinfo] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  const userImg = [Jake, Meg, Mili, Steven];
  const [curImg, setCurImg] = useState(userImg[0]);
  const [selectImg, setSelectImg] = useState("");

  const handleInputValue = (key) => (e) => {
    setuserinfo({ ...userinfo, [key]: e.target.value });
  };

  // 이메일 유효성 검사
  const emailValidation = (e) => {
    const regExp = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if (!regExp.test(e.target.value)) {
      setEmailErrMsg("이메일 형식이 맞지 않습니다.");
    } else {
      setEmailErrMsg("");
      axios
        .post(`${process.env.REACT_APP_EC2_URL}/signup/takenemail`, {
          email: userinfo.email,
        })
        .then((res) => {
          setEmailCheckMsg("사용 가능한 이메일입니다.");
        })
        .catch((err) => {
          console.log("err message =>", err);
          setEmailErrMsg("이미 사용중인 이메일입니다.");
        });
    }
  };

  // 비밀번호 유효성 검사
  // 최소 8자~최대 16자, 대문자 1개 이상, 소문자 1개, 숫자 1개, 특수 문자 1개
  const passwordValidation = (e) => {
    const regExp =
      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!regExp.test(e.target.value)) {
      setpwErrMsg("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
    } else {
      setpwErrMsg("");
    }
  };

  // 비밀번호 재확인 검사
  const passwordCheckValidation = (e) => {
    if (e.target.value !== userinfo.password) {
      setpwCheckErrMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setpwCheckErrMsg("");
    }
  };

  // 닉네임 유효성 검사
  const nicknameValidation = (e) => {
    axios
      .post(`${process.env.REACT_APP_EC2_URL}/signup/takenname`, {
        nickname: userinfo.nickname,
      })
      .then((res) => {
        setNickErrMsg("");
        setNickCheckMsg("사용 가능한 닉네임입니다.");
      })
      .catch((err) => {
        setNickErrMsg("이미 사용중인 닉네임입니다.");
        console.error(err);
      });
    // console.log("nickname valid??", e.target.value);
  };

  const clickUserImage = (e) => {
    setCurImg(e.target.src);
    setSelectImg(e.target.alt);
  };

  // 회원가입
  const handleSignup = () => {
    const { email, password, passwordCheck, nickname } = userinfo;
    if (!email || !password || !passwordCheck || !nickname) {
      setErrMsg("필수 정보입니다.");
      setpwErrMsg("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
    } else {
      setErrMsg("");
      axios
        .post(`${process.env.REACT_APP_EC2_URL}/signup`, {
          nickname: nickname,
          email: email,
          password: password,
          image: selectImg,
        })
        .then((res) => {
          setModal(!modal);
        })
        .catch((err) => {
          console.log("err message =>", err);
        });
    }
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
                  type="email"
                  onChange={handleInputValue("email")}
                  onBlur={emailValidation}
                  className="signup-email-input"
                ></input>
                {userinfo.email === "" ? (
                  <div className="signup-email-warning">{errMsg}</div>
                ) : emailErrMsg ? (
                  <div className="signup-email-warning">{emailErrMsg}</div>
                ) : (
                  <div className="signup-email-ok">{emailCheckMsg}</div>
                )}
              </div>
              <div className="signup-password">
                <div className="signup-email-title">비밀번호</div>
                <input
                  onChange={handleInputValue("password")}
                  onBlur={passwordValidation}
                  className="signup-email-input"
                  type="password"
                ></input>
                <div className="signup-password-warning">{pwErrMsg}</div>
              </div>
              <div className="signup-repassword">
                <div className="signup-email-title">비밀번호 확인</div>
                <input
                  onBlur={passwordCheckValidation}
                  onChange={handleInputValue("passwordCheck")}
                  className="signup-email-input"
                  type="password"
                ></input>
                {userinfo.passwordCheck === "" ? (
                  <div className="signup-password-warning">{errMsg}</div>
                ) : (
                  <div className="signup-password-warning">{pwCheckErrMsg}</div>
                )}
              </div>
              <div className="signup-nickname">
                <div className="signup-email-title">닉네임</div>
                <input
                  onBlur={nicknameValidation}
                  onChange={handleInputValue("nickname")}
                  className="signup-email-input"
                ></input>
                {userinfo.nickname === "" ? (
                  <div className="signup-password-warning">{errMsg}</div>
                ) : nickErrMsg ? (
                  <div className="signup-password-warning">{nickErrMsg}</div>
                ) : (
                  <div className="signup-email-ok">{nickCheckMsg}</div>
                )}
              </div>
              <div className="signup-image"> 프로필 이미지 선택</div>
              <div className="signup-image-group">
                {userImg.map((src, idx) => {
                  return (
                    <img
                      onClick={clickUserImage}
                      src={src}
                      alt={idx}
                      key={idx}
                      className={
                        curImg === src
                          ? "signup-image-group-1-selected"
                          : "signup-image-group-1"
                      }
                    />
                  );
                })}
              </div>
              <div className="signup-btn" onClick={handleSignup}>
                <div className="signup-btn-text">가입하기</div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {modal ? <SignupModal /> : null}
      <MainFooter></MainFooter>
      <TopButton></TopButton>
    </div>
  );
}

export default Signup;
