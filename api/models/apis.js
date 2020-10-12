// If you make any changes to Apis, make sure you do the following:
// 1) Generate a Sequelize migration that adds/removes columns as needed
// 2) Update the API type definition in odyssey.d.ts
module.exports = (sequelize, DataTypes) => {
  const Apis = sequelize.define(
    "Apis",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      major_event: DataTypes.INTEGER,
    },
    {}
  );

  return Apis;
};
