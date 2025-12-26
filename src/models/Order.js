module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      food_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      code: DataTypes.STRING(100),
      arr_sub_id: DataTypes.STRING(255),
    },
    {
      tableName: "orders",
      timestamps: false,
    }
  );

  return Order;
};