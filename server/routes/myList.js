const express = require('express');
const router = express.Router();
const { MyList } = require('../models/myList');

// 🟢 Lấy tất cả myList items (có thể thêm phân trang)
router.get('/', async (req, res) => {
  try {
    const isAll = req.query.all === 'true';
    if (isAll) {
      const myList = await MyList.find();
      return res.status(200).json(myList);
    }

    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const total = await MyList.countDocuments();
    const totalPages = Math.ceil(total / perPage);

    const myList = await MyList.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    res.status(200).json({ myList, totalPages, page });
  } catch (err) {
    console.error('GET /mylist error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🟢 Lấy item theo ID
router.get('/:id', async (req, res) => {
  try {
    const item = await MyList.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    res.status(200).json(item);
  } catch (err) {
    console.error('GET /mylist/:id error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🔴 Xóa item
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await MyList.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Item not found' });

    res.status(200).json({ success: true, message: 'Item deleted' });
  } catch (err) {
    console.error('DELETE /mylist/:id error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🟢 Thêm mới item
router.post('/add', async (req, res) => {
  try {
    const { productTitle, image, rating, price, productId, userId } = req.body;

    if (!productId || !userId) {
      return res.status(400).json({ success: false, message: "Missing productId or userId" });
    }

    // 🔍 Kiểm tra trùng sản phẩm trong danh sách
    const existingItem = await MyList.findOne({ userId, productId });
    if (existingItem) {
      return res.status(200).json({ success: false, message: "Product already in list", item: existingItem });
    }

    // 🆕 Tạo mới
    const newItem = new MyList({
      productTitle,
      image,
      rating,
      price,
      productId,
      userId,
    });

    await newItem.save();
    res.status(201).json({ success: true, message: "Added new item to list", item: newItem });

  } catch (err) {
    console.error('POST /mylist/add error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});



module.exports = router;
