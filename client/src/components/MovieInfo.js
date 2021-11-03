function MovieInfo({ description }) {
  return (
    <div>
      <li className="post-infogroup-list">영화제목 : {description.title}</li>
      <li className="post-infogroup-list">장르 : {description.genre}</li>
      <li className="post-infogroup-list">감독 : {description.director}</li>
      <li className="post-infogroup-list">개봉 : {description.released}년</li>
    </div>
  );
}

export default MovieInfo;
