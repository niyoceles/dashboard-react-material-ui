
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('stars', {
    order_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    plain_orders_star_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    plain_orders_hidden_coordinates: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    plain_orders_hidden_id_constellation: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('stars'),
};
