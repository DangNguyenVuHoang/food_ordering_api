const { Sequelize } = require("sequelize");

// Sửa username/password cho đúng MySQL của bạn
const sequelize = new Sequelize("food_ordering", "root", "12345", {
  host: "localhost",
  port: 3307,
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;