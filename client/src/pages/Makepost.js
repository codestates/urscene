import React from "react";
import MainNav from "../components/MainNav";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";

function Makepost() {
  return (
    <div>
      <MainNav />
      <div className="MP-container">
        <form>
          <div className="MP-wrap">
            <div className="MP-title">나의장면 게시하기</div>
            <div className="MP-input-wrap">
              <div className="MP-sub-title">영화 이름</div>
              <div className="MP-movie">
                <input type="text" placeholder="영화 제목을 검색해 주세요." />
                <div className="MP-movie-icon"></div>
              </div>
            </div>
            <div className="MP-input-wrap">
              <div className="MP-sub-title">장르 선택</div>
              <select name="장르" id="" className="MP-movie">
                <option value="">장르를 선택해주세요.</option>
                <option value="">로맨스</option>
                <option value="">코미디</option>
                <option value="">SF/판타지</option>
                <option value="">액션</option>
                <option value="">미스터리/스릴러</option>
                <option value="">전쟁</option>
              </select>
            </div>
            <div className="MP-photo-wrap">
              <div className="MP-sub-title">사진 선택</div>
              <div className="MP-photo-show">사진 파일 미리보기</div>
            </div>
            <div className="MP-box-wrap">
              <div className="MP-sub-title">장면 설명</div>
              <textarea name="" id="textarea"></textarea>
            </div>
            <div className="MP-btn-wrap">
              <button className="MP-btn">게시하기</button>
            </div>
          </div>
        </form>
      </div>
      <MainFooter></MainFooter>
      <TopButton></TopButton>
    </div>
  );
}

export default Makepost;
