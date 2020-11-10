// If you make any changes to ApiLinks, make sure you do the following:
// 1) Generate a Sequelize migration that adds/removes columns as needed
// 2) Update the ApiLink type definition in odyssey.d.ts
const Api = require("./apis");
module.exports = (sequelize, DataTypes) => {
  var ApiLinks = sequelize.define(
    "ApiLinks",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      name: DataTypes.STRING,
      link: DataTypes.STRING,
      api_id: DataTypes.INTEGER
    },
    {
      timestamps: false
    }
  );

  ApiLinks.associate = function(models) {
    ApiLinks.belongsTo(models.Apis, { foreignKey: "api_id" });
  };

  return ApiLinks;
};
