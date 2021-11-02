import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../contexts/Store";
import MainNav from "../components/MainNav";
import SignoutModal from "../components/SignoutModal";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";

function Userinfo() {
  const { userInfo, isLogin } = useContext(MyContext); // 유저 정보를 확인
  console.log(userInfo, "=> userinfo page");

  const [modal, setModal] = useState(false);
  const [editImg, setEditImg] = useState(false);
  const [curImg, setCurImg] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };

  const handleImgEdit = () => {
    setEditImg(true);
  };

  const handleImgClick = (e) => {
    console.log(e.target.className);
  };

  return (
    <div>
      <div>
        <MainNav />
        <div className="userinfo">
          <div className="userinfowrap">
            <div className="ui-title">개인정보 수정</div>
            <div className="ui-image"></div>
            <div onClick={handleImgEdit} className="ui-description">
              프로필 사진 바꾸기
            </div>
            {!editImg ? null : (
              <div className="ui-imagegroup">
                <div className="ui-imagegroup-title">
                  변경하실 이미지를 선택해 주세요.
                </div>
                <div className="ui-imagegroup-wrap">
                  <div
                    className="ui-imagegroup-wrap-1"
                    onClick={handleImgClick}
                  ></div>
                  <div className="ui-imagegroup-wrap-2"></div>
                  <div className="ui-imagegroup-wrap-3"></div>
                  <div className="ui-imagegroup-wrap-4"></div>
                </div>
              </div>
            )}
            <div className="ui-nickname">
              <div className="ui-nickname-title">닉네임</div>
              <input className="ui-nickname-input"></input>
              <div className="ui-nickname-warning">필수정보입니다.</div>
              <div className="ui-nickname-warning">
                사용하실 수 없는 닉네임입니다.
              </div>
              <div className="ui-nickname-ok">
                사용하실 수 없는 닉네임입니다.
              </div>
              <div className="ui-nickname-check">중복확인</div>
            </div>
            <div className="ui-password">
              <div className="ui-nickname-title">비밀번호</div>
              <input className="ui-nickname-input" type="password"></input>
              <div className="ui-nickname-warning">
                8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
              </div>
            </div>
            <div className="ui-repassword">
              <div className="ui-nickname-title">비밀번호확인</div>
              <input className="ui-nickname-input" type="password"></input>
              <div className="ui-nickname-warning">필수 정보입니다.</div>
              <div className="ui-nickname-warning">
                비밀번호가 일치하지 않습니다.
              </div>
            </div>
            <button className="ui-btn">저장</button>
            <div className="ui-logout">로그아웃</div>
            <div className="ui-signout" onClick={handleModal}>
              회원탈퇴
            </div>
          </div>
          <MainFooter></MainFooter>
          <TopButton></TopButton>
        </div>
      </div>
      {modal ? <SignoutModal handleModal={handleModal} /> : null}
    </div>
  );
}

export default Userinfo;
