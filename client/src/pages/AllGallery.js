/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react";
import MainNav from "../components/MainNav";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import ResultGallery from "../components/ResultGallery";
import useIntersectionObserver from "../customHook/useIntersectionObserver";
import searchAPI from "../api/searchAPI";
require("dotenv").config();

function AllGallery() {
  const currentPage = useRef(1);
  const totalPage = useRef(0);
  const galleryPerPage = useRef(9);

  const [loading, setLoading] = useState(false);
  const [gallerys, setGallerys] = useState([]);

  const targetRef = useRef(null);

  const handleGetGallerys = async () => {
    try {
      setLoading(true);
      const result = await searchAPI.gallery(
        "",
        currentPage.current,
        galleryPerPage.current,
      );
      setGallerys([...gallerys, ...result]);
      currentPage.current += galleryPerPage.current;
      totalPage.current += result.length;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useIntersectionObserver({
    root: null,
    target: targetRef.current,
    onIntersect: ([{ isIntersecting }]) => {
      if (
        isIntersecting &&
        !loading &&
        currentPage.current <= totalPage.current + 1
      ) {
        handleGetGallerys();
      }
    },
  });

  useEffect(() => {
    handleGetGallerys();
  }, []);

  return (
    <div>
      <div className="allGallery-back">
        <MainNav />
        <div className="allGallery-wrap">
          <div className="allGallery-gallery">
            <div className="allGallery-text">모든 갤러리 보기</div>
            <div className="allGallery-gallery-wrap">
              {gallerys.map((gallery) => {
                return <ResultGallery key={gallery.id} gallery={gallery} />;
              })}
            </div>
            <div ref={targetRef}></div>
            {loading ? <div>로딩중 입니다.</div> : null}
          </div>
        </div>
      </div>
      <TopButton />
      <MainFooter />
    </div>
  );
}

export default AllGallery;
