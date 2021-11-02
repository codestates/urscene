import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
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
        console.log("userInfo res???", res.data);
        console.log("isLogin ???", isLogin);
        history.push("/main");
      })
      .catch((err) => console.log("store err message =>", err));
  };

  useEffect(() => {
    isAuthenticated();
    handleLogin();
    setUserInfo(JSON.parse(window.sessionStorage.getItem("userInfo")));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <MyContext.Provider value={{ handleResponseSuccess, userInfo, isLogin }}>
      {props.children}
    </MyContext.Provider>
  );
};
export default Store;
