const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/

const emailRegex = (email) => emailValidation.test(email) // 통과하면 true return
const passwordRegex = (password) => passwordValidation.test(password)
const validator = (email, password, nickname) => {
	if (!email || !emailRegex(email)) {
		return { code: 400, message: "invalid-email" }
	}

	if (!password || !passwordRegex(password)) {
		return { code: 400, message: "invalid-password" }
	}

	if (!nickname) {
		return { code: 400, message: "invalid-nickname" }
	}
	return false
}

module.exports = {
	emailRegex,
	passwordRegex,
	validator,
}
