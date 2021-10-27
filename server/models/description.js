"use strict"
module.exports = (sequelize, DataTypes) => {
	const Description = sequelize.define(
		"Description",
		{
			title: DataTypes.STRING,
			title_eng: DataTypes.STRING,
			genre: DataTypes.STRING,
			director: DataTypes.STRING,
			released: DataTypes.STRING,
		},
		{}
	)
	Description.associate = function (models) {
		models.Description.hasMany(models.Singlepost, { foreignKey: "description_id" })
	}
	return Description
}
