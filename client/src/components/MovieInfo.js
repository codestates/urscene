function MovieInfo({ description }) {
  return (
    <div className="post-infogroup-wrap">
      <div className="post-info-1">
        <div className="post-infogroup-title">제목</div>
        <div className="post-infogroup-list">{description.title}</div>
      </div>
      <div className="post-info-1">
        <div className="post-infogroup-title">감독</div>
        <div className="post-infogroup-list"> {description.director}</div>
      </div>
      <div className="post-info-1">
        <div className="post-infogroup-title">개요</div>
        <div className="post-infogroup-list">
          {description.genre} ㅣ {description.released}년
        </div>
        <div className="post-infogroup-list"> </div>
      </div>
    </div>
  );
}

export default MovieInfo;
