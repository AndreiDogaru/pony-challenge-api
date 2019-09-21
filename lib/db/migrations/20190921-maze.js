module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('maze', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    pony: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    domokun: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    exit: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    width: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    height: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    data: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    state: {
      type: Sequelize.ENUM('active', 'won', 'lost'),
      allowNull: false,
      defaultValue: 'active',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: queryInterface => queryInterface.dropTable('maze'),
};
