"use strict";
module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define(
    "Announcement",
    {
      img: DataTypes.STRING,
      from: DataTypes.STRING,
      text: DataTypes.STRING,
      target: DataTypes.STRING,
    },
    { timestamps: false }
  );
  Announcement.associate = function (models) {
    // associations can be defined here
  };
  return Announcement;
};
