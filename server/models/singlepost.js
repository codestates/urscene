"use strict"
module.exports = (sequelize, DataTypes) => {
	const Singlepost = sequelize.define(
		"Singlepost",
		{
			user_id: DataTypes.INTEGER,
			title: DataTypes.STRING,
			genre: DataTypes.STRING,
			content: DataTypes.STRING,
			image: DataTypes.STRING,
			description_id: DataTypes.INTEGER,
		},
		{}
	)
	Singlepost.associate = function (models) {
		models.Singlepost.hasMany(models.Like, { foreignKey: "singlepost_id" })
		models.Singlepost.hasMany(models.Comment, { foreignKey: "singlepost_id" })
		models.Singlepost.hasMany(models.singlepost_gallerypost, { foreignKey: "singlepost_id" })
		models.Singlepost.belongsTo(models.User, { foreignKey: "user_id" })
		models.Singlepost.belongsTo(models.Description, { foreignKey: "description_id" })
	}
	return Singlepost
}
