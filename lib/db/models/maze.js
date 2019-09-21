module.exports = (sequelize, DataTypes) => {
  const Maze = sequelize.define('Maze', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    pony: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    domokun: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM('active', 'won', 'lost'),
      allowNull: false,
      defaultValue: 'active',
    },
  }, {
    freezeTableName: true,
    tableName: 'maze',
  });

  return Maze;
};
