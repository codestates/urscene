module.exports = {
	delete: require("./deleteSinglepost"),
	get: require("./getSinglepost"),
	patch: require("./patchSinglepost"),
	post: require("./postSinglepost"),
	singlepost: require("./postLike"),
	singlelike: require("./deleteLike"),
	getLike: require("./getLike"),
};
