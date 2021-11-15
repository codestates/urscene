/*eslint-disable*/
import React, { useState, useContext } from "react";
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
  const { userInfo, setUserInfo } = useContext(MyContext); // 유저 정보를 확인
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
    nickname: null,
    password: null,
    passwordCheck: null,
  });

  const handleInputValue = (key) => (e) => {
    setuserinfo({ ...userinfo, [key]: e.target.value });
  };

  // 닉네임 유효성 검사
  const nicknameValidation = (e) => {
    // TODO: 서버에 닉네임이 있는지 요청하고 응답을 받는다.
    axios
      .post(
        `${process.env.REACT_APP_EC2_URL}/signup/takenname`,
        {
          nickname: userinfo.nickname,
        },
        { accept: "application/json" },
      )
      .then((res) => {
        setNickErrMsg("");
        setNickCheckMsg("사용 가능한 닉네임입니다.");
      })
      .catch((err) => {
        setNickErrMsg("이미 사용중인 닉네임입니다.");
        console.error(err);
      });
  };

  // 비밀번호 유효성 검사
  const passwordValidation = (e) => {
    const regExp =
      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!e.target.value) {
      setpwErrMsg("");
    } else if (!regExp.test(e.target.value)) {
      setpwErrMsg("8자 이상, 영문, 숫자 및 특수문자를 사용하세요");
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
    setErrMsg("");
    const { nickname, password } = userinfo;
    const patchBody = {};
    if (!!nickname) {
      patchBody.newName = nickname;
    }
    if (!!password) {
      patchBody.newPassword = password;
    }
    if (!!selectImg) {
      patchBody.newImage = selectImg;
    }

    axios
      .patch(`${process.env.REACT_APP_EC2_URL}/user`, { patchBody })
      .then((res) => {
        console.log("save success", res.data);
        axios
          .get(`${process.env.REACT_APP_EC2_URL}/user`, {
            withCredentials: true,
          })
          .then((res) => {
            setUserInfo(res.data);
            window.location.replace("/mygallery");
          });
      })
      .catch((err) => {
        console.log("userinfo err message =>", err);
      });
  };

  // 로그아웃 요청
  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_EC2_URL}/signout`)
      .then((res) => {
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
      .delete(`${process.env.REACT_APP_EC2_URL}/user`, {
        accept: "application/json",
      })
      .then((res) => {
        window.location.replace("/");
        window.sessionStorage.removeItem("userInfo");
        window.sessionStorage.removeItem("isLogin");
        sessionStorage.clear();
      })
      .catch((err) => {
        console.log("delete error =>", err);
      });
  };

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
            <img src={curImg} alt="curImg" className="ui-image"></img>
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
                {userinfo.nickname === "" ? null : nickErrMsg ? ( // <div className="ui-nickname-warning">{errMsg}</div>n
                  <div className="ui-nickname-warning">{nickErrMsg}</div>
                ) : (
                  <div className="ui-nickname-ok">{nickCheckMsg}</div>
                )}
              </div>
              <div className="ui-password">
                <div className="ui-nickname-title">비밀번호</div>
                <input
                  placeholder="새로운 비밀번호를 입력해주세요."
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
                  placeholder="새로운 비밀번호를 입력해주세요."
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
