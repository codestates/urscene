"use strict"
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			nickname: DataTypes.STRING,
			image: DataTypes.STRING,
		},
		{}
	)
	User.associate = function (models) {
		models.User.hasMany(models.Comment, { foreignKey: "user_id" })
		models.User.hasMany(models.Like, { foreignKey: "user_id" })
		models.User.hasMany(models.Gallerypost, { foreignKey: "user_id" })
		models.User.hasMany(models.Singlepost, { foreignKey: "user_id" })
	}
	return User
}
