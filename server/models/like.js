"use strict"
module.exports = (sequelize, DataTypes) => {
	const Like = sequelize.define(
		"Like",
		{
			user_id: DataTypes.INTEGER,
			gallerypost_id: DataTypes.INTEGER,
			singlepost_id: DataTypes.INTEGER,
		},
		{}
	)
	Like.associate = function (models) {
		models.Like.belongsTo(models.Like, { foreignKey: "user_id" })
		models.Like.belongsTo(models.Singlepost, { foreignKey: "singlepost_id" })
		models.Like.belongsTo(models.Gallerypost, { foreignKey: "gallerypost_id" })
	}
	return Like
}
