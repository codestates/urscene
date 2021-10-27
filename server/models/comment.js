"use strict"
module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		"Comment",
		{
			user_id: DataTypes.INTEGER,
			singlepost_id: DataTypes.INTEGER,
			gallerypost_id: DataTypes.INTEGER,
			comment: DataTypes.STRING,
		},
		{}
	)
	Comment.associate = function (models) {
		models.Comment.belongsTo(models.User, { foreignKey: "user_id" })
		models.Comment.belongsTo(models.Singlepost, { foreignKey: "singlepost_id" })
		models.Comment.belongsTo(models.Gallerypost, { foreignKey: "gallerypost_id" })
	}
	return Comment
}
