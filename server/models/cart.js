import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productTitle: {
    type: String,
    required: true,
  },
  images: {
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
  quantity: {
    type: Number,
    default: 1,
  },
  subTotal: {
    type: Number,
    require:true
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

cartSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

cartSchema.set('toJSON', {
    virtuals: true,
});

export default mongoose.model("Cart", cartSchema);
