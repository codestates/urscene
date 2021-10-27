function SignoutModal({ handleModal }) {
  return (
    <div className="singoutModal-background">
      <div className="singoutModal">
        <div className="soM-label">
          <div className="soM-label-text">탈퇴 하시겠습니까?</div>
        </div>
        <div className="soM-btn">
          <div className="soM-btn-singout">탈퇴하기</div>
          <button className="soM-btn-cancel" onClick={handleModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignoutModal;
