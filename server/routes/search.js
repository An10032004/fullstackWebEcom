const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const { Category } = require("../models/category"); // nhớ import nếu có dùng
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const { q, min, max, brands, categories } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({ success: false, message: "Query is required" });
    }

    // ✅ Tạo bộ lọc tổng hợp
    let filter = {
      $or: [
        { name: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
        { subCategory: { $regex: q, $options: "i" } },
      ],
    };

    // ✅ Lọc theo giá
    if (min && max) {
      filter.price = { $gte: parseInt(min), $lte: parseInt(max) };
    }

    // ✅ Lọc theo danh mục (nếu truyền category id)
    if (categories) {
      const categoryIds = categories
        .split(",")
        .map((id) => id.trim())
        .filter((id) => mongoose.Types.ObjectId.isValid(id));

      if (categoryIds.length > 0) {
        filter.category = { $in: categoryIds };
      }
    }

    // ✅ Lọc theo brand
    if (brands) {
      filter.brand = { $in: brands.split(",").map((b) => b.trim()) };
    }

    // ✅ Truy vấn
    const productList = await Product.find(filter).populate("category");

    res.status(200).json({
      success: true,
      productList,
      count: productList.length,
    });
  } catch (error) {
    console.error("Search API Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
