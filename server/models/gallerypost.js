'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gallerypost = sequelize.define('Gallerypost', {
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {});
  Gallerypost.associate = function(models) {
    // associations can be defined here
  };
  return Gallerypost;
};