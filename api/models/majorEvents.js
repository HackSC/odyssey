// If you make any changes to MajorEvents, make sure you do the following:
// 1) Generate a Sequelize migration that adds/removes columns as needed
// 2) Update the ApiLink type definition in odyssey.d.ts
module.exports = (sequelize, DataTypes) => {
  const MajorEvents = sequelize.define(
    "MajorEvents",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      name: DataTypes.STRING,
      isHackathon: DataTypes.BOOLEAN,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE
    },
    {
      timestamps: false
    }
  );

  return MajorEvents;
};
