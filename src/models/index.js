const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require("./User")(sequelize, Sequelize.DataTypes);
db.Restaurant = require("./Restaurant")(sequelize, Sequelize.DataTypes);
db.LikeRes = require("./LikeRes")(sequelize, Sequelize.DataTypes);
db.RateRes = require("./RateRes")(sequelize, Sequelize.DataTypes);
db.Food = require("./Food")(sequelize, Sequelize.DataTypes);
db.Order = require("./Order")(sequelize, Sequelize.DataTypes);

// Associations
// Like
db.User.hasMany(db.LikeRes, { foreignKey: "user_id" });
db.Restaurant.hasMany(db.LikeRes, { foreignKey: "res_id" });
db.LikeRes.belongsTo(db.User, { foreignKey: "user_id" });
db.LikeRes.belongsTo(db.Restaurant, { foreignKey: "res_id" });

// Rate
db.User.hasMany(db.RateRes, { foreignKey: "user_id" });
db.Restaurant.hasMany(db.RateRes, { foreignKey: "res_id" });
db.RateRes.belongsTo(db.User, { foreignKey: "user_id" });
db.RateRes.belongsTo(db.Restaurant, { foreignKey: "res_id" });

// Order
db.User.hasMany(db.Order, { foreignKey: "user_id" });
db.Food.hasMany(db.Order, { foreignKey: "food_id" });
db.Order.belongsTo(db.User, { foreignKey: "user_id" });
db.Order.belongsTo(db.Food, { foreignKey: "food_id" });

module.exports = db;