module.exports = {
	signIn: require("./signin").signIn,
	signOut: require("./signOut").signOut,
	signUp: require("./signup").signUp,
	takenName: require("./takenname").checkTakenNm,
	takenEmail: require("./takenemail").checkTakenEmail,
}
