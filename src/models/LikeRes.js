module.exports = (sequelize, DataTypes) => {
  const LikeRes = sequelize.define(
    "LikeRes",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      res_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      date_like: DataTypes.DATE,
    },
    {
      tableName: "like_res",
      timestamps: false,
    }
  );

  return LikeRes;
};