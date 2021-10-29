import "./App-mobile.css";
import "./App-tablet.css";
import "./App-pc.css";
import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Userinfo from "./pages/Userinfo.js";
import Main from "./pages/Main.js";
import Search from "./pages/Search.js";
import Makegallery from "./pages/Makegallery.js";
import Makepost from "./pages/Makepost.js";
import Post from "./pages/Post.js";
import Gallery from "./pages/Gallery.js";
import Mygallery from "./pages/Mygallery.js";
import Landing from "./pages/Landing.js";
require("dotenv").config();

function App() {
  // useContext 를 사용해서 유저정보와 로그인 상태를 전역으로 관리
  const [userInfo, setUserInfo] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  // 로그인 성공 시 인증정보 요청 함수실행
  const handleResponseSuccess = () => {
    isAuthenticated();
  };

  // 유저 정보 호출, 로그인 상태 변경
  const isAuthenticated = () => {};

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/main">
          <Main />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/userinfo">
          <Userinfo />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/makegallery">
          <Makegallery />
        </Route>
        <Route path="/makepost">
          <Makepost />
        </Route>
        <Route path="/post">
          <Post />
        </Route>
        <Route path="/gallery">
          <Gallery />
        </Route>
        <Route path="/mygallery">
          <Mygallery />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
