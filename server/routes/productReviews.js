const express = require('express')
const productReviews = require('../models/productReviews')
const router = express.Router()

router.get('/',async(req,res) => {
    let reviews = []

    if(req.body.productId !== undefined && req.body.productId !== null && req.body.productId !== ""){
        reviews = await productReviews.find({productId:req.body.productId})
    }else {
        reviews = await productReviews.find({})
    }

    if(!reviews) {
        res.status(500).json({success:false})
    }
    return res.status(200).json(reviews)
})

router.get('/:productId', async (req, res) => {
  try {
    const reviews = await productReviews.find({ productId: req.params.productId });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ success: false, message: "No reviews found for this product" });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});



router.put("/reply/:id", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ success: false, message: "Reply text is required" });
    }

    const updated = await productReviews.findByIdAndUpdate(
      req.params.id,
      { reply: { text, date: new Date() } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.status(200).json({ success: true, review: updated });
  } catch (err) {
    console.error("Error updating reply:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { productId, customerName, review, customerRating } = req.body;

    if (!productId || !customerName || !review) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newReview = new productReviews({
      productId,
      customerName,
      review,
      customerRating
    });

    const savedReview = await newReview.save();
    return res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
