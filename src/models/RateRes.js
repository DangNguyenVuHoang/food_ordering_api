module.exports = (sequelize, DataTypes) => {
  const RateRes = sequelize.define(
    "RateRes",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      res_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      amount: DataTypes.INTEGER,
      date_rate: DataTypes.DATE,
    },
    {
      tableName: "rate_res",
      timestamps: false,
    }
  );

  return RateRes;
};