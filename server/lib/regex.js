/*eslint-disable no-useless-escape*/
const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
// 최소 8자~최대 16자, 대문자 1개 이상, 소문자 1개, 숫자 1개, 특수 문자 1개
const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
const nameValidation = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/
/*eslint-enable no-useless-escape*/

const emailRegex = (email) => emailValidation.test(email) // 통과하면 true return
const passwordRegex = (password) => passwordValidation.test(password)
const nameRegex = (nickname) => nameValidation.test(nickname)
const validator = (email, password, nickname) => {
	if (!email || !emailRegex(email)) {
		return { code: 400, message: "invalid-email" }
	}

	if (!password || !passwordRegex(password)) {
		return { code: 400, message: "invalid-password" }
	}

	if (!nickname || !nameRegex(nickname)) {
		return { code: 400, message: "invalid-name" }
	}
	return false
}

module.exports = {
	emailRegex,
	passwordRegex,
	nameRegex,
	validator,
}
