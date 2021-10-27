import React from "react";
import MainNav from "../components/MainNav";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import BestGallery from "../components/BestGallery";
import GenreScene from "../components/GenreScene";

function Main() {
  const genres = [
    "로맨스",
    "코미디",
    "SF/판타지",
    "액션",
    "미스터리/스릴러",
    "전쟁",
  ];

  return (
    <div>
      <div className="main-back">
        <MainNav />
        <div className="main-wrap">
          <div className="main-gallery">
            <div className="main-text">인기 갤러리</div>
            <div className="main-gallery-wrap">
              {/* 갤러리 컴포넌트가 불러와진다. */}
              <BestGallery />
            </div>
          </div>
          <div className="main-genre">
            <div className="main-text">장르별 장면</div>
            <div className="main-genre-category-wrap">
              {genres.map((el) => {
                return (
                  <div className="main-genre-name" key={el}>
                    {el}
                  </div>
                );
              })}
              <div className="main-genre-img-wrap">
                {/*장르별 장면 컴포넌트가 불러와진다. */}
                <GenreScene />
              </div>
            </div>
          </div>
        </div>
      </div>
      <TopButton />
      <MainFooter />
    </div>
  );
}

export default Main;
