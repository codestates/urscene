import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import NoResult from "../components/NoResult";
import ResultScene from "../components/ResultScene";
import ResultGallery from "../components/ResultGallery";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import { useParams } from "react-router";
import axios from "axios";
require("dotenv").config();

function Search() {
  const [sceneResult, setSceneResult] = useState([]);
  const [galleryResult, setGalleryResult] = useState([]);
  const { searchWord } = useParams(); // 검색어
  const [addSceneIcon, setAddSceneIcon] = useState(false); // 장면 더보기 렌더링 상태
  const [addGalleryIcon, setAddGalleryIcon] = useState(false); // 갤러리 더보기 렌더링 상태

  const [addSceneStart, setAddSceneStart] = useState(9);
  const [addGalleryStart, setAddGalleryStart] = useState(3);

  // 장면 검색 결과 API
  const handleLandingScenePage = () => {
    axios
      .get(
        `${process.env.REACT_APP_EC2_URL}/search/single?content=${searchWord}&page=1&limit=8`,
      )
      .then((res) => {
        setSceneResult(res.data.search_single);
      });
  };

  const handleLandingAddScenePage = () => {
    axios
      .get(
        `${process.env.REACT_APP_EC2_URL}/search/single?content=${searchWord}&page=${addSceneStart}&limit=4`,
      )
      .then((res) => {
        if (res.data.search_single.length !== 4) {
          setAddSceneIcon(true);
        }
        setSceneResult([...sceneResult, ...res.data.search_single]);
        setAddSceneStart(addSceneStart + 4);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 갤러리 검색 결과 API
  const handleLandingGalleryPage = () => {
    axios
      .get(
        `${process.env.REACT_APP_EC2_URL}/search/gallery?content=${searchWord}&page=1&limit=2`,
      )
      .then((res) => {
        if (res.data.search_gallery.length !== 2) {
          setAddGalleryIcon(true);
        }
        // console.log(res.data.search_gallery);
        setGalleryResult(res.data.search_gallery);
      });
  };

  const handleLandingAddGalleryPage = () => {
    axios
      .get(
        `${process.env.REACT_APP_EC2_URL}/search/gallery?content=${searchWord}&page=${addGalleryStart}&limit=2`,
      )
      .then((res) => {
        if (res.data.search_gallery.length !== 2) {
          setAddGalleryIcon(true);
        }
        console.log(res.data.search_gallery);
        setGalleryResult([...galleryResult, ...res.data.search_gallery]);
        setAddGalleryStart(addGalleryStart + 2);
      });
  };

  useEffect(() => {
    setSceneResult([]);
    setGalleryResult([]);
    setAddSceneIcon(false);
    setAddGalleryIcon(false);
    setAddSceneStart(9);
    setAddGalleryStart(3);
    handleLandingScenePage();
    handleLandingGalleryPage();
  }, [searchWord]);

  return (
    <div className="search-container">
      <MainNav />
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
                <div onClick={handleLandingAddScenePage}>
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
                <div onClick={handleLandingAddGalleryPage}>
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
