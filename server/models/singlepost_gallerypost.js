'use strict';
module.exports = (sequelize, DataTypes) => {
  const singlepost_gallerypost = sequelize.define('singlepost_gallerypost', {
    singlepost_id: DataTypes.INTEGER,
    gallerypost_id: DataTypes.INTEGER
  }, {});
  singlepost_gallerypost.associate = function(models) {
    // associations can be defined here
  };
  return singlepost_gallerypost;
};