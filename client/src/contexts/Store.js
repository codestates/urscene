import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
export const MyContext = createContext({
  userInfo: null,
  isLogin: false,
  setUserInfo: () => {},
  setIsLogin: () => {},
  handleResponseSuccess: () => {},
  isAuthenticated: () => {},
});

const Store = (props) => {
  const history = useHistory();
  // useContext 를 사용해서 유저정보와 로그인 상태를 전역으로 관리
  const [userInfo, setUserInfo] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  // 로그인 성공 시 인증정보 요청 함수실행
  const handleResponseSuccess = () => {
    isAuthenticated();
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
  }, []);

  return (
    <MyContext.Provider value={{ handleResponseSuccess, userInfo, isLogin }}>
      {props.children}
    </MyContext.Provider>
  );
};
export default Store;
