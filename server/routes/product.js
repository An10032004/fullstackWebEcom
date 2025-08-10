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
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
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
    const limit = pLimit(2);
    
        const imagesToUpload = req.body.images.map((image) => {
            return limit(async () => {
                const result = await cloudinary.uploader.upload(image);
                // console.log(`Successfully uploaded ${image}`);
                // console.log(`> Result: ${result.secure_url}`);
                return result;
            })
        });
    
        const uploadStatus = await Promise.all(imagesToUpload)
    
        const imgurl = uploadStatus.map((item) => {
            return item.secure_url
        })
    
        if(!uploadStatus) {
            return res.status(500).json({
                error:"image cannot upload",
                status:false
            })
        }

    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(404).send("Invalid Category!");
    }

    

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {name: req.body.name,
        description: req.body.description,
        images: imgurl,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured},
         {
            new: true
        }
    );

    if (!product) {
        res.status(404).json({
            message: 'the product can not be updated!',
            status: false
        })
    } else {
        res.status(200).json({
            message: 'the product is updated!',
            status: true
        });
    }

    // res.send(product);
});
module.exports = router