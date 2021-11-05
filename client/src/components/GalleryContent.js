import { useState } from "react";
import { useHistory } from "react-router";
import SceneInGalleryDeleteModal from "../components/SceneInGalleryDeleteModal";
require("dotenv").config();

function GalleryContent({
  editModal,
  scene,
  galleryId,
  handleLandingDetailGallery,
}) {
  const history = useHistory();
  const [sceneDeleteModal, setSceneDeleteModal] = useState(false);

  const handleSceneDeleteModal = () => {
    setSceneDeleteModal(!sceneDeleteModal);
  };

  return (
    <div className="gallery-content">
      <img
        className="gallery-content-img"
        src={process.env.REACT_APP_S3_URL_ImageUpload + "/" + scene.image}
        alt={scene.image}
        onClick={() => {
          history.push(`/post/${scene.id}`);
        }}
      ></img>
      {editModal ? (
        <div
          className="gallery-content-delete"
          onClick={() => {
            setSceneDeleteModal(true);
          }}
        ></div>
      ) : null}
      {sceneDeleteModal ? (
        <SceneInGalleryDeleteModal
          handleSceneDeleteModal={handleSceneDeleteModal}
          sceneId={scene.id}
          galleryId={galleryId}
          handleLandingDetailGallery={handleLandingDetailGallery}
        />
      ) : null}
    </div>
  );
}

export default GalleryContent;
