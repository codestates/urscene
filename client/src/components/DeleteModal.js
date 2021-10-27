import React from "react";

function DeleteModal({ handleDeleteModal }) {
  return (
    <div className="deleteModal-background">
      <div className="deleteModal">
        <div className="delete-img"></div>
        <div className="delete-text">삭제 하시겠습니까?</div>
        <div className="delete-btn">
          <div className="delete-btn-ok">삭제하기</div>
          <button className="delete-btn-cancel" onClick={handleDeleteModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
