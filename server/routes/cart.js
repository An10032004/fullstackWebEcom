const express = require('express');
const router = express.Router();
const pLimit = require('p-limit');
const cloudinary = require('cloudinary').v2;
const  {Cart} = require('../models/cart');

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
});

// 🟢 Lấy tất cả cart items (có thể thêm phân trang)
router.get('/', async (req, res) => {
  try {
    const isAll = req.query.all === 'true';
    if (isAll) {
      const cartList = await Cart.find();
      return res.status(200).json(cartList);
    }

    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const total = await Cart.countDocuments();
    const totalPages = Math.ceil(total / perPage);

    const cartList = await Cart.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    res.status(200).json({ cartList, totalPages, page });
  } catch (err) {
    console.error('GET /cart error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🟢 Lấy cart theo ID
router.get('/:id', async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

    res.status(200).json(cartItem);
  } catch (err) {
    console.error('GET /cart/:id error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🔴 Xóa cart item
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Cart item not found' });

    res.status(200).json({ success: true, message: 'Cart item deleted' });
  } catch (err) {
    console.error('DELETE /cart/:id error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});
router.delete("/clear/:userId", async (req, res) => {
  try {
    const {Id } = req.params.userId; // hoặc email
    await Cart.deleteMany({ Id });
    res.status(200).json({ success: true, message: "Cart cleared successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 🟢 Tạo mới cart item
router.post('/add', async (req, res) => {
  try {
    const { productTitle, image, rating, price, quantity, subTotal, productId, userId } = req.body;

    if (!productId || !userId) {
      return res.status(400).json({ success: false, message: "Missing productId or userId" });
    }

    // 🔍 Kiểm tra sản phẩm này đã có trong giỏ hàng của user chưa
    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      // Nếu đã có thì cập nhật số lượng + subtotal
    
      return res.status(200).json({ success: false, message: "product already added", cart: existingItem });
    }

    // 🔹 Nếu chưa có thì tạo mới
    const newCartItem = new Cart({
      productTitle,
      image,
      rating,
      price,
      quantity: quantity || 1,
      subTotal,
      productId,
      userId,
    });

    await newCartItem.save();
    res.status(201).json({ success: true, message: "Added new item to cart", cart: newCartItem });

  } catch (err) {
    console.error('POST /cart/add error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});


// 🟡 Cập nhật cart item
router.put('/:id', async (req, res) => {
  try {
    const { productTitle,image,rating,price,quantity,subTotal,productId,userId } = req.body;

    


    const updated = await Cart.findByIdAndUpdate(
      req.params.id,
      {productTitle,
      image, // Vì schema images: String (1 ảnh), bạn có thể sửa lại thành [String] nếu muốn nhiều ảnh
      rating,
      price,
      quantity: quantity || 1,
      subTotal,
      productId,
      userId,}
    );

    if (!updated) return res.status(404).json({ success: false, error: 'Cart item not found' });

    res.status(200).json({ success: true, cartList: updated });
  } catch (err) {
    console.error('PUT /cart/:id error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
