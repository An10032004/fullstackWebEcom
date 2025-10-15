const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      street: { type: String, required: true },
      apartment: { type: String },
      city: { type: String, required: true },
      state: { type: String },
      zipcode: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      enum: ["credit", "cod", "paypal", "momo"],
      required: true,
    },

    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        productTitle: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],

    subtotal: { type: Number, required: true },
    shipping: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },

    stripeSessionId: { type: String }, // Lưu ID session của Stripe (nếu có)
  },
  { timestamps: true }
);

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});


exports.Order = mongoose.model('Order', orderSchema);

exports.orderSchema = this.orderSchema;
