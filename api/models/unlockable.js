module.exports = (sequelize, DataTypes) => {
  const Unlockable = sequelize.define(
    "Unlockable",
    {
      tier: DataTypes.INTEGER,
      pointThreshold: DataTypes.INTEGER,
      isPremium: DataTypes.BOOLEAN,
    },
    {}
  );
  Unlockable.associate = function (models) {};
  return Unlockable;
};
