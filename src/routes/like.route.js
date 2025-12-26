const express = require("express");
const router = express.Router();
const { User, Restaurant, LikeRes } = require("../models");

// POST /api/likes  => user like nhà hàng
router.post("/", async (req, res) => {
  try {
    const { user_id, res_id } = req.body;

    if (!user_id || !res_id) {
      return res.status(400).json({ message: "user_id và res_id là bắt buộc" });
    }

    const user = await User.findByPk(user_id);
    const restaurant = await Restaurant.findByPk(res_id);

    if (!user || !restaurant) {
      return res
        .status(400)
        .json({ message: "User hoặc Restaurant không tồn tại" });
    }

    const existed = await LikeRes.findOne({ where: { user_id, res_id } });
    if (existed) {
      return res.status(400).json({ message: "Đã like nhà hàng này rồi" });
    }

    const like = await LikeRes.create({
      user_id,
      res_id,
      date_like: new Date(),
    });

    res.status(201).json({ message: "Like thành công", data: like });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// DELETE /api/likes  => unlike
router.delete("/", async (req, res) => {
  try {
    const { user_id, res_id } = req.body;

    if (!user_id || !res_id) {
      return res.status(400).json({ message: "user_id và res_id là bắt buộc" });
    }

    const deleted = await LikeRes.destroy({
      where: { user_id, res_id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy like để xoá" });
    }

    res.json({ message: "Unlike thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// GET /api/likes/by-user/:userId
router.get("/by-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const likes = await LikeRes.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Restaurant,
          attributes: ["res_id", "res_name", "image", "description"],
        },
      ],
    });

    res.json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// GET /api/likes/by-res/:resId
router.get("/by-res/:resId", async (req, res) => {
  try {
    const { resId } = req.params;

    const likes = await LikeRes.findAll({
      where: { res_id: resId },
      include: [
        {
          model: User,
          attributes: ["user_id", "full_name", "email"],
        },
      ],
    });

    res.json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;