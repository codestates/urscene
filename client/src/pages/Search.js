import React, { useEffect, useRef, useState } from "react";
import MainNav from "../components/MainNav";
import NoResult from "../components/NoResult";
import ResultScene from "../components/ResultScene";
import ResultGallery from "../components/ResultGallery";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import { useParams } from "react-router";
import searchAPI from "../api/searchAPI";
require("dotenv").config();

function Search() {
  const [sceneResult, setSceneResult] = useState([]);
  const [galleryResult, setGalleryResult] = useState([]);
  const { searchWord } = useParams(); // 검색어
  const [addSceneIcon, setAddSceneIcon] = useState(false); // 장면 더보기 렌더링 상태
  const [addGalleryIcon, setAddGalleryIcon] = useState(false); // 갤러리 더보기 렌더링 상태

  const sceneStart = useRef(1);
  const scenePerPage = useRef(8);
  const galleryStart = useRef(1);
  const galleryPerPage = useRef(2);

  // 장면 검색
  const handleLandingScenePage = async () => {
    try {
      const result = await searchAPI.scene(
        searchWord,
        sceneStart.current,
        scenePerPage.current,
      );
      if (result.length < scenePerPage.current) {
        setAddSceneIcon(true);
      }
      setSceneResult([...sceneResult, ...result]);
      sceneStart.current += scenePerPage.current;
    } catch (err) {
      console.log(err);
    }
  };

  // 갤러리 검색
  const handleLandingGalleryPage = async () => {
    try {
      const result = await searchAPI.gallery(
        searchWord,
        galleryStart.current,
        galleryPerPage.current,
      );
      if (result.length < galleryPerPage.current) {
        setAddGalleryIcon(true);
      }
      setGalleryResult([...galleryResult, ...result]);
      galleryStart.current += galleryPerPage.current;
    } catch (err) {
      console.log(err);
      setAddGalleryIcon(true);
    }
  };

  useEffect(() => {
    handleLandingScenePage();
    handleLandingGalleryPage();
  }, []);

  return (
    <div className="search-container">
      <MainNav />
      <div className="search-devider"></div>
      <center>
        <div className="search-wrap">
          <div className="search-results">{searchWord} 에 대한 검색결과</div>
          <div className="results-text">장면 </div>
          {sceneResult.length !== 0 ? (
            <div>
              <div className="result-scene-wrap">
                {sceneResult.map((scene) => {
                  return <ResultScene key={scene.id} scene={scene} />;
                })}
              </div>
              {addSceneIcon ? null : (
                <div onClick={handleLandingScenePage}>
                  <div className="main-genre-img-addText">더 보기</div>
                  <div className="main-genre-img-addImage"></div>
                </div>
              )}
            </div>
          ) : (
            <NoResult />
          )}

          <div className="results-text">갤러리</div>
          {galleryResult.length !== 0 ? (
            <div>
              <div className="result-gallery-wrap">
                {galleryResult.map((gallery) => {
                  return <ResultGallery key={gallery.id} gallery={gallery} />;
                })}
              </div>
              {addGalleryIcon ? null : (
                <div onClick={handleLandingGalleryPage}>
                  <div className="main-genre-img-addText">더 보기</div>
                  <div className="main-genre-img-addImage"></div>
                </div>
              )}
            </div>
          ) : (
            <NoResult />
          )}
        </div>
      </center>
      <MainFooter></MainFooter>
      <TopButton></TopButton>
    </div>
  );
}

export default Search;
