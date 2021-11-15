import { Link } from "react-router-dom";

function SignupModal() {
  return (
    <div className="singupModal-background">
      <div className="singupModal">
        <div className="suM-image"></div>
        <div className="suM-text">회원가입이 완료되었습니다.</div>
        <Link to="/login">
          <button className="suM-btn">확인</button>
        </Link>
      </div>
    </div>
  );
}

export default SignupModal;
