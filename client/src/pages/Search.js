import React, { useState } from "react";
import MainNav from "../components/MainNav";
import NoResult from "../components/NoResult";

function Search() {
  const [sceneResult, setSceneResult] = useState([]);
  const [galleryResult, setGalleryResult] = useState([]);

  return (
    <div className="search-container">
      <MainNav />
      <center>
        <div className="search-wrap">
          <div className="search-results">검색결과</div>
          <div className="results-text">장면 </div>
          {/* 검색 결과가 없는 경우 */}
          {sceneResult.length !== 0 ? "결과" : <NoResult />}
          <div className="results-text">갤러리</div>
          {/* 검색 결과가 없는 경우 */}
          {galleryResult.length !== 0 ? "결과 " : <NoResult />}
        </div>
      </center>
    </div>
  );
}

export default Search;
