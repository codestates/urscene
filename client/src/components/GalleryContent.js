function GalleryContent({ editModal }) {
  return (
    <div className="gallery-content">
      <img className="gallery-content-img" src="./img/UserImage-Jake.png" alt="" />
      {editModal ? <div className="gallery-content-delete"></div> : null}
    </div>
  );
}

export default GalleryContent;
