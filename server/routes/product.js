const { Category } = require('../models/category');
const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();
const fs = require('fs')
const pLimit = require('p-limit')
const cloudinary = require('cloudinary').v2
//upload image
const multer = require('multer')
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
var imagesArr = []
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
        //imagesArr.push(`${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage:storage})

router.post("/upload", upload.array("images", 10), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: "Không có file nào được upload." });
    }

    const limit = pLimit(3); // Giới hạn tối đa 3 file upload cùng lúc

    const uploadPromises = files.map((file) =>
      limit(async () => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "ecommerce_products",
            timeout: 120000, // ⏱️ tăng thời gian timeout lên 120s
          });
          fs.unlinkSync(file.path); // Xóa file local sau khi upload xong
          return result.secure_url;
        } catch (err) {
          console.error(`❌ Upload thất bại: ${file.originalname}`, err.message);
          throw err;
        }
      })
    );

    // Chờ tất cả upload hoàn tất
    const uploadedUrls = await Promise.all(uploadPromises);

    console.log("✅ Uploaded to Cloudinary:", uploadedUrls);
    return res.status(200).json({ success: true, images: uploadedUrls });

  } catch (err) {
    console.error("❌ Upload error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});
//end upload
// Lấy danh sách product (có hỗ trợ ?all=true và phân trang)
router.get('/', async (req, res) => {
  try {
    const isAll = req.query.all === 'true';

    if (isAll) {
      const productList = await Product.find().populate("category");
      return res.status(200).json(productList);
    }
   
    const page = parseInt(req.query.page) || 1;
    const perPage = 1; // bạn có thể đổi sang 1 hoặc số tùy ý
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages) {
      return res.status(404).json({ message: 'Page not found' });
    }

    const productList = await Product.find()
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    return res.status(200).json({
      productList,
      totalPages,
      page,
    });

  } catch (err) {
    console.error('GET /products error:', err);
    res.status(500).json({ success: false, error: err.message || err });
  }
});

router.get("/category/name/:catName", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 4;

    const category = await Category.findOne({ name: req.params.catName });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const totalProducts = await Product.countDocuments({ category: category._id });
    const totalPages = Math.ceil(totalProducts / perPage);

    const productList = await Product.find({ category: category._id })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate("category");

    return res.status(200).json({
      success: true,
      productList,
      totalPages,
      page,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// routes/products.js
router.get("/category/:categoryId", async (req, res) => {
  try {
    const { min, max, categories, brands, q } = req.query;

    // ✅ Kiểm tra category hợp lệ
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // ✅ Bắt đầu filter
    let filter = { category: category._id };

    // ✅ Tìm kiếm theo từ khóa
    if (q && q.trim() !== "") {
      filter.name = { $regex: q, $options: "i" }; // không phân biệt hoa thường
    }

    // ✅ Lọc theo khoảng giá
    if (min && max) {
      filter.price = { $gte: parseInt(min), $lte: parseInt(max) };
    }

    // ✅ Lọc theo danh sách category con (nếu có)
    if (categories) {
      const categoryIds = categories.split(",").map((id) => id.trim());
      filter.category = { $in: categoryIds };
    }

    // ✅ Lọc theo danh sách brand
    if (brands) {
      filter.brand = { $in: brands.split(",").map((b) => b.trim()) };
    }

    // ✅ Truy vấn dữ liệu
    const productList = await Product.find(filter).populate("category");

    res.status(200).json({
      success: true,
      productList,
      count: productList.length,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/featured",async (req,res) => {
  const productList = await Product.find({isFeatured:true})
  if(!productList) {
    res.status(500).json({success:false})
  }
  return res.status(200).json(productList)
})
// router.get("/allProduct", async (req, res) => {
//   try {
//     const productList = await Product.find({});

//     if (!productList || productList.length === 0) {
//       return res.status(404).json({ success: false, message: "No products in stock" });
//     }

//     return res.status(200).json(productList);
//   } catch (err) {
//     return res.status(500).json({ success: false, error: err.message });
//   }
// });

router.get("/allProduct", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // mặc định trang 1
    const perPage = 4;

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages && totalPages > 0) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    const productList = await Product.find({})
      .skip((page - 1) * perPage)
      .limit(perPage);

    return res.status(200).json({
      success: true,
      productList,
      totalPages,
      page,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(500).json({ message: 'The product with the given ID was not found.' });
  }

  return res.status(200).send(product);
});

router.post('/create', async (req, res) => {
  
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(404).send("Invalid Category!");
    }

    let product = new Product({
         name: req.body.name,
        description: req.body.description,
        images: req.body.images || [],
        brand: req.body.brand,
        oldPrice:req.body.oldPrice,
        price: req.body.price,
        category: req.body.category,
        subCategory: req.body.subCategory,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        discount:req.body.discount,
        productRAMS:req.body.productRAMS,
        productSIZE:req.body.productSIZE,
        productWeight:req.body.productWeight
    });

    product = await product.save();
    if (!product) {
        res.status(500).json({
            error: err,
            success: false
        })
    }

    res.status(201).json(product)
});

router.delete('/:id', async (req, res) => {

    
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
        return res.status(404).json({
            message: "product not found!",
            status: false
        })
    }
    res.status(200).send({
        message: "the product is deleted!",
        status: true
    })
});

router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const body = req.body;

    // 🔍 Kiểm tra sản phẩm có tồn tại không
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // 🖼️ Nếu có mảng ảnh mới từ frontend (upload lên Cloudinary xong)
    // thì dùng ảnh mới, ngược lại giữ nguyên ảnh cũ
    let updatedImages = body.images && body.images.length > 0
      ? body.images
      : existingProduct.images;

    // ✏️ Cập nhật sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name: body.name || existingProduct.name,
        description: body.description || existingProduct.description,
        images: updatedImages,
        brand: body.brand || existingProduct.brand,
        price: body.price || existingProduct.price,
        oldPrice: body.oldPrice || existingProduct.oldPrice,
        category: body.category || existingProduct.category,
        subCategory: body.subCategory || existingProduct.subCategory,
        countInStock: body.countInStock || existingProduct.countInStock,
        rating: body.rating || existingProduct.rating,
        isFeatured: body.isFeatured ?? existingProduct.isFeatured,
        discount: body.discount || existingProduct.discount,
        productRAMS: body.productRAMS?.length ? body.productRAMS : existingProduct.productRAMS,
        productSIZE: body.productSIZE?.length ? body.productSIZE : existingProduct.productSIZE,
        productWeight: body.productWeight?.length ? body.productWeight : existingProduct.productWeight
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(500).json({ success: false, message: "Product update failed" });
    }

    return res.status(200).json({
      success: true,
      message: "✅ Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    console.error("❌ PUT /:id error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/products/by?showBy=feature|notFeature&catBy=priceAsc|priceDesc&page=1&limit=8
router.get("/get/by", async (req, res) => {
  try {
    let { showBy, catBy, page = 1, limit = 2 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};
    const sortOption = {};

    // Show By Feature
    if (showBy === "feature") filter.isFeatured = true;
    else if (showBy === "notFeature") filter.isFeatured = false;

    // Sort By Price
    if (catBy === "priceAsc") sortOption.price = 1;
    else if (catBy === "priceDesc") sortOption.price = -1;
    else sortOption.dateCreated = -1; // default

    const totalResults = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalResults / limit);

    const productList = await Product.find(filter)
      .populate("category")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      totalResults,
      totalPages,
      currentPage: page,
      productList,
    });
  } catch (err) {
    console.error("GET /products/by error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});




module.exports = router