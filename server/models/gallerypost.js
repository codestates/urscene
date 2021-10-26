"use strict"
module.exports = (sequelize, DataTypes) => {
	const Gallerypost = sequelize.define(
		"Gallerypost",
		{
			user_id: DataTypes.INTEGER,
			title: DataTypes.STRING,
			content: DataTypes.STRING,
		},
		{}
	)
	Gallerypost.associate = function (models) {
		models.Gallerypost.hasMany(models.Like, { foreignKey: "gallerypost_id" })
		models.Gallerypost.hasMany(models.Comment, { foreignKey: "gallerypost_id" })
		models.Gallerypost.hasMany(models.singlepost_gallerypost, { foreignKey: "gallerypost_id" })
		models.Gallerypost.belongsTo(models.User, { foreignKey: "user_id" })
	}
	return Gallerypost
}
