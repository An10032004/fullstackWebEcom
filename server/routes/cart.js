const express = require('express');
const router = express.Router();
const pLimit = require('p-limit');
const cloudinary = require('cloudinary').v2;
const { Cart } = require('../models/cart');

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

// 🟢 Tạo mới cart item
router.post('/create', async (req, res) => {
  try {
    const limit = pLimit(2);
    const { name, color, images } = req.body;

    if (!name) return res.status(400).json({ success: false, error: 'Name is required' });

    // Upload ảnh lên Cloudinary
    const uploadTasks = (images || []).map((img) =>
      limit(async () => {
        const result = await cloudinary.uploader.upload(img);
        return result.secure_url;
      })
    );

    const uploadedImages = await Promise.all(uploadTasks);

    const cartItem = new Cart({
      name,
      color,
      images: uploadedImages,
    });

    await cartItem.save();

    res.status(201).json({ success: true, cartItem });
  } catch (err) {
    console.error('POST /cart/create error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🟡 Cập nhật cart item
router.put('/:id', async (req, res) => {
  try {
    const limit = pLimit(2);
    const { name, color, images } = req.body;

    const uploadTasks = (images || []).map((img) =>
      limit(async () => {
        const result = await cloudinary.uploader.upload(img);
        return result.secure_url;
      })
    );

    const uploadedImages = await Promise.all(uploadTasks);

    const updated = await Cart.findByIdAndUpdate(
      req.params.id,
      { name, color, images: uploadedImages },
      { new: true }
    );

    if (!updated) return res.status(404).json({ success: false, error: 'Cart item not found' });

    res.status(200).json({ success: true, cartItem: updated });
  } catch (err) {
    console.error('PUT /cart/:id error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
