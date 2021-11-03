import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../contexts/Store";
import MainNav from "../components/MainNav";
import SignoutModal from "../components/SignoutModal";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import Jake from "../img/UserImage-Jake.png";
import Meg from "../img/UserImage-Meg.png";
import Mili from "../img/UserImage-Mili.png";
import Steven from "../img/UserImage-Steven.png";
import axios from "axios";

axios.defaults.withCredentials = true;

function Userinfo() {
  const { userInfo, setUserInfo, setIsLogin } = useContext(MyContext); // 유저 정보를 확인
  console.log(userInfo, "=> userinfo page");

  const userImg = [Jake, Meg, Mili, Steven];
  const [curImg, setCurImg] = useState(userImg[userInfo.image]);
  const [selectImg, setSelectImg] = useState(userInfo.image);
  const [modal, setModal] = useState(false);
  const [editImg, setEditImg] = useState(false);
  const [errMsg, setErrMsg] = useState(""); // 공통 에러 메세지
  const [pwErrMsg, setpwErrMsg] = useState(""); // 비밀번호 에러 메세지
  const [pwCheckErrMsg, setpwCheckErrMsg] = useState(""); // 비밀번호 확인 에러 메세지
  const [nickErrMsg, setNickErrMsg] = useState(""); // 닉네임 에러 메세지
  const [nickCheckMsg, setNickCheckMsg] = useState(""); // 닉네임 사용가능 메세지
  const [userinfo, setuserinfo] = useState({
    nickname: "",
    password: "",
    passwordCheck: "",
  });
  console.log("change userinfo ???", userinfo);

  const handleInputValue = (key) => (e) => {
    setuserinfo({ ...userinfo, [key]: e.target.value });
  };

  // 닉네임 유효성 검사
  const nicknameValidation = (e) => {
    // TODO: 서버에 닉네임이 있는지 요청하고 응답을 받는다.
    axios
      .post(
        "http://localhost:80/signup/takenname",
        {
          nickname: userinfo.nickname,
        },
        { accept: "application/json" },
      )
      .then((res) => {
        setNickErrMsg("");
        console.log("nicname res ???", res);
        setNickCheckMsg("사용 가능한 닉네임입니다.");
      })
      .catch((err) => {
        setNickErrMsg("이미 사용중인 닉네임입니다.");
        console.error(err);
      });
    // console.log("nickname valid??", e.target.value);
  };

  // 비밀번호 유효성 검사
  const passwordValidation = (e) => {
    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
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

  // 회원정보 수정 요청
  const handleChangeUserInfo = () => {
    const { nickname, password, passwordCheck } = userinfo;
    if (!password || !passwordCheck || !nickname) {
      setErrMsg("필수 정보입니다.");
      setpwErrMsg("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
    } else {
      setErrMsg("");
      console.log("save click");
      axios
        .patch("http://localhost:80/user", {
          newName: nickname,
          newPassword: password,
          newImage: selectImg,
        })
        .then((res) => {
          console.log("save success");
          console.log(res);
          window.location.replace("/mygallery");
        })
        .catch((err) => {
          console.log("userinfo err message =>", err);
        });
    }
  };

  // 로그아웃 요청
  const handleLogout = () => {
    axios
      .post("http://localhost:80/signout")
      .then((res) => {
        console.log("signout success", res);
        window.location.replace("/main");
        window.sessionStorage.removeItem("userInfo");
        window.sessionStorage.removeItem("isLogin");
        sessionStorage.clear();
      })
      .catch((err) => {
        console.log("signout err message =>", err);
      });
  };

  // 회원탈퇴 요청
  const handleSignOut = () => {
    axios
      .delete("http://localhost:80/user", { accept: "application/json" })
      .then((res) => {
        console.log("delete success");
        window.location.replace("/");
        window.sessionStorage.removeItem("userInfo");
        window.sessionStorage.removeItem("isLogin");
        sessionStorage.clear();
      })
      .catch((err) => {
        console.log("delete error =>", err);
      });
  };

  console.log("curImg ??? =>", curImg);
  const handleModal = () => {
    setModal(!modal);
  };

  const handleImgEdit = () => {
    setEditImg(true);
  };

  const handleImgClick = (e) => {
    setCurImg(e.target.src);
    setSelectImg(e.target.alt);
  };

  return (
    <div>
      <div>
        <MainNav />
        <div className="userinfo">
          <div className="userinfowrap">
            <div className="ui-title">개인정보 수정</div>
            <img src={curImg} alt="" className="ui-image"></img>
            <div onClick={handleImgEdit} className="ui-description">
              프로필 사진 바꾸기
            </div>
            {!editImg ? null : (
              <div className="ui-imagegroup">
                <div className="ui-imagegroup-title">
                  변경하실 이미지를 선택해 주세요.
                </div>
                <div className="ui-imagegroup-wrap">
                  {userImg.map((src, idx) => {
                    return (
                      <img
                        onClick={handleImgClick}
                        src={src}
                        key={idx}
                        alt={idx}
                        className={
                          curImg === src
                            ? "signup-image-group-1-selected"
                            : "signup-image-group-1"
                        }
                      />
                    );
                  })}
                </div>
              </div>
            )}
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="ui-nickname">
                <div className="ui-nickname-title">닉네임</div>
                <input
                  placeholder={userInfo.nickname}
                  onBlur={nicknameValidation}
                  onChange={handleInputValue("nickname")}
                  className="ui-nickname-input"
                ></input>
                {userinfo.nickname === "" ? (
                  <div className="ui-nickname-warning">{errMsg}</div>
                ) : nickErrMsg ? (
                  <div className="ui-nickname-warning">{nickErrMsg}</div>
                ) : (
                  <div className="ui-nickname-ok">{nickCheckMsg}</div>
                )}
              </div>
              <div className="ui-password">
                <div className="ui-nickname-title">비밀번호</div>
                <input
                  placeholder="새로운 비밀번호를 사용하시려면 입력해주세요."
                  onChange={handleInputValue("password")}
                  onBlur={passwordValidation}
                  className="ui-nickname-input"
                  type="password"
                ></input>
                <div className="ui-nickname-warning">{pwErrMsg}</div>
              </div>
              <div className="ui-password">
                <div className="ui-nickname-title">비밀번호 확인</div>
                <input
                  placeholder="새로운 비밀번호를 사용하시려면 입력해주세요."
                  onBlur={passwordCheckValidation}
                  onChange={handleInputValue("passwordCheck")}
                  className="ui-nickname-input"
                  type="password"
                ></input>
                {userinfo.passwordCheck === "" ? (
                  <div className="ui-nickname-warning">{errMsg}</div>
                ) : (
                  <div className="ui-nickname-warning">{pwCheckErrMsg}</div>
                )}
              </div>
              <button onClick={handleChangeUserInfo} className="ui-btn">
                저장
              </button>
              <div className="ui-logout" onClick={handleLogout}>
                로그아웃
              </div>
              <div className="ui-signout" onClick={handleModal}>
                회원탈퇴
              </div>
            </form>
          </div>
          <MainFooter></MainFooter>
          <TopButton></TopButton>
        </div>
      </div>
      {modal ? (
        <SignoutModal handleSignOut={handleSignOut} handleModal={handleModal} />
      ) : null}
    </div>
  );
}

export default Userinfo;
