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
		// associations can be defined here
	}
	return Singlepost
}
