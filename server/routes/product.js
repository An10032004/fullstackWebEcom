const { Category } = require('../models/category');
const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();
const fs = require('fs')
const pLimit = require('p-limit')
const cloudinary = require('cloudinary').v2
//upload image
const multer = require('multer')
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
router.post('/upload', upload.array("images"), async (req, res) => {
    imagesArr = [];
    const files = req.files;

    for (let i = 0; i < files.length; i++) {
        imagesArr.push(files[i].filename);
    }

    console.log(imagesArr);

    res.json({images:imagesArr});
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

router.get("/category/:categoryId", async (req, res) => {
  try {
    // const page = parseInt(req.query.page) || 1;
    // const perPage = 4;

  const category = await Category.findById(req.params.categoryId); // 🔥 Dùng _id
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    const { min, max, categories, brands } = req.query;

    // const totalProducts = await Product.countDocuments({ category: category._id });
    // const totalPages = Math.ceil(totalProducts / perPage);
     let filter = { category: category._id };

    if (min && max) {
      filter.price = { $gte: parseInt(min), $lte: parseInt(max) };
    }

    if (brands) {
      filter.brand = { $in: brands.split(",") };
    }

    
    const productList = await Product.find(filter)
      // .skip((page - 1) * perPage)
      // .limit(perPage)
      .populate("category");

    return res.status(200).json({
      success: true,
      productList,
      // totalPages,
      // page,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
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
        images: imagesArr,
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

    const product = await Product.findById(req.params.id)
    const images = product.images

    if (images.length !== 0) {
        for (const image of images) {
            fs.unlinkSync(`uploads/${image}`);
        }
        }

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
    // Lấy product cũ
    const oldProduct = await Product.findById(req.params.id);
    if (!oldProduct) {
      return res.status(404).json({
        message: 'Product not found!',
        status: false
      });
    }
    let finalImages = oldProduct.images;
    // Nếu product có ảnh cũ thì xoá trong thư mục uploads
    if (imagesArr.length > 0) {
      // Xoá ảnh cũ trong thư mục uploads
      if (oldProduct.images && oldProduct.images.length > 0) {
        for (const image of oldProduct.images) {
          const filePath = `uploads/${image}`;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      }

      // Gán ảnh mới
      finalImages = imagesArr;
    }

    // Update product với ảnh mới từ imagesArr
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        images: finalImages,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        subCategory: req.body.subCategory,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        discount:req.body.discount,
        productRAMS:req.body.productRAMS,
        productSIZE:req.body.productSIZE,
        productWeight:req.body.productWeight
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: 'The product cannot be updated!',
        status: false
      });
    }

    res.status(200).json({
      message: 'The product is updated!',
      status: true,
      product
    });

  } catch (error) {
    console.error('PUT /:id error:', error);
    res.status(500).json({ success: false, error: error.message || error });
  }
});

module.exports = router