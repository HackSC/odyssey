module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      name: DataTypes.STRING(100),
      description: DataTypes.STRING(500),
      startsAt: DataTypes.DATE,
      endsAt: DataTypes.DATE,
      zoomUrl: DataTypes.STRING(500),
    },
    {}
  );

  Event.associate = function (models) {};
  return Event;
};
