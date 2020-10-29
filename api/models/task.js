module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      points: DataTypes.INTEGER,
      description: DataTypes.STRING(100),
      blocking: DataTypes.BOOLEAN,
      type: DataTypes.STRING(100),
      isGroupTask: DataTypes.BOOLEAN,
      isActive: DataTypes.BOOLEAN,
      sponsor: DataTypes.STRING,
      isPast: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
      },
      name: DataTypes.STRING(100)
    },
    {}
  );
  Task.associate = function(models) {
    Task.hasMany(models.Contribution, { foreignKey: "taskId" });
    // associations can be defined here
  };

  return Task;
};
