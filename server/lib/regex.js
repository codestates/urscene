const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

const emailRegex = (email) => emailValidation.test(email)
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
