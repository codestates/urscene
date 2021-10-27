"use strict"
module.exports = (sequelize, DataTypes) => {
	const singlepost_gallerypost = sequelize.define(
		"singlepost_gallerypost",
		{
			singlepost_id: DataTypes.INTEGER,
			gallerypost_id: DataTypes.INTEGER,
		},
		{}
	)
	singlepost_gallerypost.associate = function (models) {
		models.singlepost_gallerypost.belongsTo(models.Singlepost, { foreignKey: "singlepost_id" })
		models.singlepost_gallerypost.belongsTo(models.Gallerypost, { foreignKey: "gallerypost_id" })
	}
	return singlepost_gallerypost
}
