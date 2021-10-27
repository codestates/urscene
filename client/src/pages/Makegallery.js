import React, { useState } from "react";
import MainNav from "../components/MainNav";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";

function Makegallery() {
  return (
    <div>
      <MainNav />
      <div className="MG-container">
        <div className="MP-wrap">
          <div className="MP-title">갤러리 만들기</div>
          <div className="MG-wrap">
            <form>
              <div className="MG-name">
                <div className="MG-title">갤러리 이름</div>
                <input
                  type="text"
                  placeholder="새로운 갤러리 이름을 적어주세요."
                />
              </div>

              <div className="MG-desc">
                <div className="MG-title">갤러리 설명</div>
                <textarea
                  className=""
                  type="text"
                  placeholder="갤러리에 대한 설명을 적어주세요."
                />
              </div>

              <div className="MG-btn">
                <button>완료</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <MainFooter></MainFooter>
      <TopButton></TopButton>
    </div>
  );
}

export default Makegallery;
