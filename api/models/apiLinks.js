// If you make any changes to ApiLinks, make sure you do the following:
// 1) Generate a Sequelize migration that adds/removes columns as needed
// 2) Update the ApiLink type definition in odyssey.d.ts
module.exports = (sequelize, DataTypes) => {
  const ApiLinks = sequelize.define(
    "ApiLinks",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: DataTypes.STRING,
      link: DataTypes.STRING,
      api_id: DataTypes.INTEGER,
    },
    {}
  );

  return ApiLinks;
};
