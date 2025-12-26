const express = require("express");
const router = express.Router();
const { User, Restaurant, RateRes } = require("../models");

// POST /api/rates => thêm/cập nhật đánh giá
router.post("/", async (req, res) => {
  try {
    const { user_id, res_id, amount } = req.body;

    if (!user_id || !res_id || amount == null) {
      return res
        .status(400)
        .json({ message: "user_id, res_id, amount là bắt buộc" });
    }

    if (amount < 1 || amount > 5) {
      return res.status(400).json({ message: "amount phải từ 1 đến 5" });
    }

    const user = await User.findByPk(user_id);
    const restaurant = await Restaurant.findByPk(res_id);

    if (!user || !restaurant) {
      return res
        .status(400)
        .json({ message: "User hoặc Restaurant không tồn tại" });
    }

    const existed = await RateRes.findOne({ where: { user_id, res_id } });

    if (existed) {
      existed.amount = amount;
      existed.date_rate = new Date();
      await existed.save();
      return res.json({
        message: "Cập nhật đánh giá thành công",
        data: existed,
      });
    }

    const rate = await RateRes.create({
      user_id,
      res_id,
      amount,
      date_rate: new Date(),
    });

    res.status(201).json({ message: "Thêm đánh giá thành công", data: rate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// GET /api/rates/by-user/:userId
router.get("/by-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const rates = await RateRes.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Restaurant,
          attributes: ["res_id", "res_name", "image"],
        },
      ],
    });

    res.json(rates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// GET /api/rates/by-res/:resId
router.get("/by-res/:resId", async (req, res) => {
  try {
    const { resId } = req.params;

    const rates = await RateRes.findAll({
      where: { res_id: resId },
      include: [
        {
          model: User,
          attributes: ["user_id", "full_name"],
        },
      ],
    });

    res.json(rates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;