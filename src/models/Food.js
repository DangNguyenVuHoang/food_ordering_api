module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define(
    "Food",
    {
      food_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      food_name: DataTypes.STRING(100),
      image: DataTypes.STRING(255),
      price: DataTypes.FLOAT,
      description: DataTypes.STRING(255),
      type_id: DataTypes.INTEGER,
    },
    {
      tableName: "food",
      timestamps: false,
    }
  );

  return Food;
};