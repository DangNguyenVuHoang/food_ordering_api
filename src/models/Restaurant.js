module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    "Restaurant",
    {
      res_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      res_name: DataTypes.STRING(100),
      image: DataTypes.STRING(255),
      description: DataTypes.STRING(255),
    },
    {
      tableName: "restaurant",
      timestamps: false,
    }
  );

  return Restaurant;
};