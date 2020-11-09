const event = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      name: DataTypes.STRING(100),
      description: DataTypes.STRING(500),
      startsAt: DataTypes.DATE,
      endsAt: DataTypes.DATE
    },
    {}
  );

  Event.associate = models => {};
  return Event;
};

export default event;
