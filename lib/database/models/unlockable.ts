const unlockable = (sequelize, DataTypes) => {
  const Unlockable = sequelize.define(
    "Unlockable",
    {
      tier: DataTypes.INTEGER,
      pointThreshold: DataTypes.INTEGER,
      isPremium: DataTypes.BOOLEAN,
    },
    {}
  );
  Unlockable.associate = (models) => {};
  return Unlockable;
};

export default unlockable;
