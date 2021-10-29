const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/

const emailRegex = (email) => emailValidation.test(email) // 통과하면 true return
const passwordRegex = (password) => passwordValidation.test(password)
const validatorForEmail = (email) => {
	if (!emailRegex(email)) {
		return { code: 400, message: "invalid-email" }
	}
	return true
}
const validatorForPassword = (password) => {
	if (!passwordRegex(password)) {
		return { code: 400, message: "invalid-password" }
	}
	return true
}

module.exports = {
	emailRegex,
	passwordRegex,
	validatorForEmail,
	validatorForPassword,
}
