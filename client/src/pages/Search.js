import React from "react";
import MainNav from "../components/MainNav";
import NoResult from "../components/NoResult";

function Search() {
  return (
    <div className="search-container">
      <MainNav />
      <center>
        <div className="search-wrap">
          <div className="search-results">검색결과</div>
          <div className="results-text">장면 </div>
          {/* 검색 결과가 없는 경우 */}
          <NoResult />
          <div className="results-text">갤러리</div>
          {/* 검색 결과가 없는 경우 */}
          <NoResult />
        </div>
      </center>
    </div>
  );
}

export default Search;
