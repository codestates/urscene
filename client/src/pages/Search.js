import React, { useState } from "react";
import MainNav from "../components/MainNav";
import NoResult from "../components/NoResult";
import ResultScene from "../components/ResultScene";
import ResultGallery from "../components/ResultGallery";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import { useParams } from "react-router";

function Search() {
  const [sceneResult, setSceneResult] = useState([]);
  const [galleryResult, setGalleryResult] = useState([]);
  const { searchWord } = useParams();

  return (
    <div className="search-container">
      <MainNav />
      <center>
        <div className="search-wrap">
          <div className="search-results">검색결과</div>
          <div className="results-text">장면 </div>
          {/* 검색 결과가 없는 경우 */}
          {sceneResult.length !== 0 ? <ResultScene /> : <NoResult />}
          {/* <ResultScene />
          <NoResult /> */}
          <div className="results-text">갤러리</div>
          {/* 검색 결과가 없는 경우 */}
          {galleryResult.length !== 0 ? <ResultGallery /> : <NoResult />}
          {/* <ResultGallery />
          <NoResult /> */}
        </div>
      </center>
      <MainFooter></MainFooter>
      <TopButton></TopButton>
    </div>
  );
}

export default Search;
