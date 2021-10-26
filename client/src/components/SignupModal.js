function SignupModal({ handleSignup }) {
  return (
    <div className="singupModal-background">
      <div className="singupModal">
        <div className="suM-image"></div>
        <div className="suM-text">회원가입이 완료되었습니다.</div>
        <button className="suM-btn" onClick={handleSignup}>
          확인
        </button>
      </div>
    </div>
  );
}

export default SignupModal;
