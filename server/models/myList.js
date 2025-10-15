const mongoose = require('mongoose');

const myListSchema = new mongoose.Schema({
  productTitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: false, // có thể không bắt buộc
  },
  price: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // tham chiếu tới Product
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // người sở hữu giỏ hàng
    required: true,
  },
});

myListSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

myListSchema.set('toJSON', {
    virtuals: true,
});

exports.MyList = mongoose.model('MyList', myListSchema);

exports.myListSchema = this.myListSchema;
