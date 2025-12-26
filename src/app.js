const express = require("express");
const app = express();
const db = require("./models");

const likeRouter = require("./routes/like.route");
const rateRouter = require("./routes/rate.route");
const orderRouter = require("./routes/order.route");

// Middleware
app.use(express.json());

// Routes
app.use("/api/likes", likeRouter);
app.use("/api/rates", rateRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.json({ message: "Food ordering API with Sequelize" });
});

const PORT = process.env.PORT || 3000;

// Kết nối DB rồi mới start server
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Kết nối MySQL thành công ✅");
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Lỗi kết nối DB ❌", error);
  });