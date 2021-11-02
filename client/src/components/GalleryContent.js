import { useHistory } from "react-router";

require("dotenv").config();

function GalleryContent({ editModal, scene }) {
  const history = useHistory();

  return (
    <div
      className="gallery-content"
      onClick={() => {
        history.push(`/post/${scene.id}`);
      }}
    >
      <img
        className="gallery-content-img"
        src={process.env.REACT_APP_S3_URL_ImageUpload + "/" + scene.image}
        alt={scene.image}
      ></img>
      {editModal ? (
        <div className="gallery-content-delete" onClick={() => {}}></div>
      ) : null}
    </div>
  );
}

export default GalleryContent;
