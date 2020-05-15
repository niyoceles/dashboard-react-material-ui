export default (sequelize, DataTypes) => {
  const stars = sequelize.define(
    'stars',
    {
      order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      plain_orders_star_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      plain_orders_hidden_coordinates: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      plain_orders_hidden_id_constellation: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {}
  );
  stars.associate = (models) => {
    //any association
  };
  return stars;
};
