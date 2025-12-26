const express = require("express");
const router = express.Router();
const { User, Food, Order } = require("../models");

// POST /api/orders => user đặt món
router.post("/", async (req, res) => {
  try {
    const { user_id, food_id, amount, code, arr_sub_id } = req.body;

    if (!user_id || !food_id || !amount) {
      return res
        .status(400)
        .json({ message: "user_id, food_id, amount là bắt buộc" });
    }

    const user = await User.findByPk(user_id);
    const food = await Food.findByPk(food_id);

    if (!user || !food) {
      return res.status(400).json({ message: "User hoặc Food không tồn tại" });
    }

    const order = await Order.create({
      user_id,
      food_id,
      amount,
      code: code || null,
      arr_sub_id: arr_sub_id || "",
    });

    res
      .status(201)
      .json({ message: "Tạo order thành công", data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// GET /api/orders/by-user/:userId
router.get("/by-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Food,
          attributes: ["food_id", "food_name", "price"],
        },
      ],
      order: [["order_id", "DESC"]],
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;