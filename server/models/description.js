"use strict"
module.exports = (sequelize, DataTypes) => {
	const Description = sequelize.define(
		"Description",
		{
			title: DataTypes.STRING,
			genre: DataTypes.STRING,
			director: DataTypes.STRING,
			released: DataTypes.STRING,
		},
		{}
	)
	Description.associate = function (models) {
		// associations can be defined here
	}
	return Description
}
