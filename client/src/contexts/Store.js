import React, { createContext, useState } from "react";
import axios from "axios";

export const MyContext = createContext({
  state: { userInfo: null, isLogin: false },
  actions: {
    setUserInfo: () => {},
    setIsLogin: () => {},
    handleResponseSuccess: () => {},
    isAuthenticated: () => {},
  },
});

const Store = (props) => {
  // useContext 를 사용해서 유저정보와 로그인 상태를 전역으로 관리
  const [userInfo, setUserInfo] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const value = {
    state: { userInfo, isLogin },
    actions: {
      setUserInfo,
      setIsLogin,
      // handleResponseSuccess,
      // isAuthenticated,
    },
  };

  // 로그인 성공 시 인증정보 요청 함수실행
  const handleResponseSuccess = () => {
    isAuthenticated();
  };

  // 유저 정보 호출, 로그인 상태 변경
  const isAuthenticated = () => {
    axios
      .get("http://localhost:80/user", { withCredentials: true })
      .then((res) => {
        //console.log(res.data.data.userInfo);
        setUserInfo(res.data.data.userInfo);
        setIsLogin(true);
      })
      .catch((err) => console.log("err messege =>", err));
  };

  return (
    <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
  );
};

export default Store;
