// If you make any changes to Judgment, make sure you do the following:
// 1) Generate a Sequelize migration that adds/removes columns as needed
// 2) Update the Judgment type definition in odyssey.d.ts
module.exports = (sequelize, DataTypes) => {
  const HackathonConstants = sequelize.define(
    "HackathonConstants",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      boolean: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
    }
  );

  return HackathonConstants;
};
