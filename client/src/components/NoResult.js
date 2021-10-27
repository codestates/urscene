import React from "react";

function NoResult() {
  return (
    <div>
      <div className="no-results-wrap">
        <div className="no-results-icon"></div>
        <div className="no-results-text">
          검색 결과가 없습니다. <br></br>
          다른 단어로 검색해 주세요.
        </div>
      </div>
    </div>
  );
}

export default NoResult;
