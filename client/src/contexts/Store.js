import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import Jake from "../img/UserImage-Jake.png";
import Meg from "../img/UserImage-Meg.png";
import Mili from "../img/UserImage-Mili.png";
import Steven from "../img/UserImage-Steven.png";
export const MyContext = createContext({
  userInfo: { nickname: "" },
  isLogin: false,
  setUserInfo: () => {},
  setIsLogin: () => {},
  handleResponseSuccess: () => {},
  isAuthenticated: () => {},
});

const Store = (props) => {
  const history = useHistory();
  const userImg = [Jake, Meg, Mili, Steven];
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", null);
  const [isLogin, setIsLogin] = useLocalStorage("isLogin", false);

  // 로그인 성공 시 인증정보 요청 함수실행
  const handleResponseSuccess = () => {
    isAuthenticated();
  };

  const handleLogin = () => {
    if (sessionStorage.userInfo === "null") {
      setIsLogin(false);
    }
  };

  // 유저 정보 호출, 로그인 상태 변경
  const isAuthenticated = () => {
    axios
      .get("http://localhost:80/user", { withCredentials: true })
      .then((res) => {
        setUserInfo(res.data);
        setIsLogin(true);
        history.push("/main");
      })
      .catch((err) => {
        console.log("store err message =>", err);
        setIsLogin(false);
      });
  };

  const handleGetKakoAccessToken = async (authorizationCode) => {
    console.log("AccessToken 얻는 함수 실행");
    axios.post(
      `${process.env.REACT_APP_EC2_URL}/sign/kakao`,
      {
        authorizationCode: authorizationCode,
      },
      {
        headers: { accept: `application/json` },
      },
    );
  };

  const handlerKakaoLogin = () => {
    console.log("구글 로그인 핸들러");
    const url = new URL(window.location.href);
    console.log("url ===", url);
    const authorizationCode = url.searchParams.get("code");
    console.log("authorizationCode ===", authorizationCode);
    if (authorizationCode) {
      handleGetKakoAccessToken(authorizationCode);
    }
  };

  useEffect(() => {
    handlerKakaoLogin();
    handleLogin();
    setUserInfo(JSON.parse(window.sessionStorage.getItem("userInfo")));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    window.sessionStorage.setItem("isLogin", JSON.stringify(isLogin));
  }, [isLogin]);

  return (
    <MyContext.Provider
      value={{
        handleResponseSuccess,
        userInfo,
        isLogin,
        setUserInfo,
        setIsLogin,
        userImg,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};
export default Store;
