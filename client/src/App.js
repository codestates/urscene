<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
=======
import "./App-mobile.css";
import "./App-tablet.css";
import "./App-pc.css";
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
>>>>>>> a06ddea6a0793f69a6a91930ee60e106d6455cf4

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
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
>>>>>>> a06ddea6a0793f69a6a91930ee60e106d6455cf4
    </div>
  );
}

export default App;
