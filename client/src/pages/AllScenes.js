import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import MainNav from "../components/MainNav";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import GenreScene from "../components/GenreScene";
import useIntersectionObserver from "../customHook/useIntersectionObserver";
import searchAPI from "../api/searchAPI";
require("dotenv").config();

function AllScenes() {
  const history = useHistory();
  const currentPage = useRef(1);
  const totalPage = useRef(0);
  const scenePerPage = useRef(12);

  const [loading, setLoading] = useState(false);
  const [scenes, setScenes] = useState([]);

  const targetRef = useRef(null);

  const handleGetScenes = async () => {
    try {
      setLoading(true);
      const result = await searchAPI.scene(
        "",
        currentPage.current,
        scenePerPage.current,
      );
      setScenes([...scenes, ...result]);
      currentPage.current += scenePerPage.current;
      totalPage.current += result.length;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetScenes();
  }, []);

  useIntersectionObserver({
    root: null,
    target: targetRef.current,
    onIntersect: ([{ isIntersecting }]) => {
      if (
        isIntersecting &&
        !loading &&
        currentPage.current <= totalPage.current + 1
      ) {
        handleGetScenes();
      }
    },
  });

  return (
    <div>
      <div className="allScene-back">
        <MainNav />
        <div className="allScene-wrap">
          <div className="allScene-genre">
            <div className="allScene-text">모든 장면 보기</div>
            <div className="allScene-category-wrap">
              <div className="allScene-img-wrap">
                {scenes.map((scene) => {
                  return (
                    <GenreScene
                      key={scene.id}
                      value={scene}
                      onClick={() => {
                        history.push(`/post/${scene.id}`);
                      }}
                    />
                  );
                })}
                <div ref={targetRef}></div>
                {loading ? <div>로딩중 입니다.</div> : null}
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

export default AllScenes;
