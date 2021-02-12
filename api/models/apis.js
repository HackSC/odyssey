// If you make any changes to Apis, make sure you do the following:
// 1) Generate a Sequelize migration that adds/removes columns as needed
// 2) Update the API type definition in odyssey.d.ts
const ApiLinks = require("./apiLinks");

module.exports = (sequelize, DataTypes) => {
  var Apis = sequelize.define(
    "Apis",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      major_event: DataTypes.INTEGER, 
      image_url: DataTypes.STRING,
      slack_channel: DataTypes.STRING,
    },
    {
      timestamps: false
    }
  );

  Apis.associate = function(models) {
    Apis.hasMany(models.ApiLinks, { as: "links", foreignKey: "api_id" });
  };

  return Apis;
};
