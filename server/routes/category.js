const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

const pLimit = require('p-limit');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
});
console.log({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret
});

// GET all categories (with pagination)
router.get('/', async (req, res) => {
  try {
    const isAll = req.query.all === 'true';

    if (isAll) {
      const categoryList = await Category.find();
      return res.status(200).json(categoryList);
    }

    const page = parseInt(req.query.page) || 1;
    const perPage =  2; // hoặc 10 tùy bạn
    const totalPosts = await Category.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return res.status(404).json({ message: 'Page not found' });
    }

    const categoryList = await Category.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    return res.status(200).json({
      categoryList,
      totalPages,
      page,
    });
  } catch (err) {
    console.error('GET /categories error:', err);
    res.status(500).json({ success: false, error: err.message || err });
  }
});

// GET single category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    return res.status(200).send(category);
  } catch (err) {
    console.error('GET /:id error:', err);
    res.status(500).json({ success: false, error: err.message || err });
  }
});

// DELETE category
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({
        message: 'Category not found',
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category Deleted!',
    });
  } catch (err) {
    console.error('DELETE /:id error:', err);
    res.status(500).json({ success: false, error: err.message || err });
  }
});

// POST create new category
router.post('/create', async (req, res) => {
  try {
    const limit = pLimit(2);
    console.log('Received images:', req.body);
    const imagesToUpload = req.body.images.map((image) =>
      limit(async () => {
        const result = await cloudinary.uploader.upload(image);
        return result;
      })
    );

    const uploadStatus = await Promise.all(imagesToUpload);
    const imgurl = uploadStatus.map((item) => item.secure_url);

    let subCat = req.body.subCat;
    if (!Array.isArray(subCat)) {
      if (typeof subCat === 'string') {
        subCat = [subCat];
      } else {
        subCat = [];
      }
    }

    let category = new Category({
      name: req.body.name,
      subCat:subCat,
      images: imgurl,
      color: req.body.color,
    });

    category = await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.error('POST /create error:', err);
    res.status(500).json({
      success: false,
      error: err.message || err,
    });
  }
});

// PUT update category
router.put('/:id', async (req, res) => {
  try {
    const limit = pLimit(2);

    const imagesToUpload = req.body.images.map((image) =>
      limit(async () => {
        const result = await cloudinary.uploader.upload(image);
        return result;
      })
    );

    const uploadStatus = await Promise.all(imagesToUpload);
    const imgurl = uploadStatus.map((item) => item.secure_url);

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        subCat:req.body.subCat,
        images: imgurl,
        color: req.body.color,
      },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        message: 'Category cannot be updated!',
        success: false,
      });
    }

    res.send(category);
  } catch (err) {
    console.error('PUT /:id error:', err);
    res.status(500).json({
      success: false,
      error: err.message || err,
    });
  }
});

// routes/category.js
router.put('/:id/add-subcat', async (req, res) => {
  try {
    const { id } = req.params;
    const { subCat } = req.body; // có thể là string hoặc array

    if (!subCat || (Array.isArray(subCat) && subCat.length === 0)) {
      return res.status(400).json({ success: false, error: 'SubCategory is required' });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { $push: { subCat: { $each: Array.isArray(subCat) ? subCat : [subCat] } } },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    console.log("ADDOK")
    res.json({ success: true, category });
  } catch (err) {
    console.error('PUT /:id/add-subcat error:', err);
    res.status(500).json({ success: false, error: err.message || err });
  }
});


module.exports = router;
