import React, { createContext, useEffect } from "react";
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
    console.log("카카오 로그인 핸들러");
    const url = new URL(window.location.href);
    console.log("url ===", url);
    const authorizationCode = url.searchParams.get("code");
    console.log("authorizationCode ===", authorizationCode);
    if (authorizationCode) {
      handleGetKakoAccessToken(authorizationCode);
    }
  };

  // 구글 소셜 로그인
  const handleGetAccessToken = async (authorizationCode) => {
    // code를 가지고 서버에 요청을 보내어 악세스 토큰을 얻는다.
    console.log("AccessToken 얻는 함수 실행");
    axios
      .post(
        "http://localhost:80/sign/google",
        {
          //code 전달
          authorizationCode: authorizationCode,
        },
        {
          headers: { accept: `application/json` },
        },
      )
      .then((res) => {
        // 받은 결과값을 확인하고 로그인상태 및 유저 정보를 셋팅해준다.
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlerGoogleLogin = () => {
    console.log("구글 로그인 핸들러");
    const url = new URL(window.location.href);
    console.log("url ===", url);
    const authorizationCode = url.searchParams.get("code");
    console.log("authorizationCode ===", authorizationCode);
    if (authorizationCode) {
      handleGetAccessToken(authorizationCode);
    }
  };

  useEffect(() => {
    handlerKakaoLogin();
    handleLogin();
    setUserInfo(JSON.parse(window.sessionStorage.getItem("userInfo")));
    handlerGoogleLogin();
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    window.sessionStorage.setItem("isLogin", JSON.stringify(isLogin));
  }, [isLogin]);

  // 소셜 로그인

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
