module.exports = (sequelize, DataTypes) => {
  const Action = sequelize.define(
    "Action",
    {
      role: DataTypes.STRING(100),
      name: DataTypes.STRING(100),
    },
    { tableName: "Actions" }
  );
  Action.associate = function (models) {};
  return Action;
};
