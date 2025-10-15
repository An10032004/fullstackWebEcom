// routes/order.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const {Order} = require("../models/order"); // 🧩 Import Order Schema
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ===============================
// POST /api/order/stripePayment
// ===============================
router.post("/stripePayment", async (req, res) => {
  try {
    const { customer, items, subtotal, shipping, tax, total, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // 🧩 Nếu thanh toán bằng Stripe
    if (paymentMethod === "credit") {
      const line_items = items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.productTitle || "Unknown product",
          },
          unit_amount: Math.round(item.price * 100), // cent
        },
        quantity: item.quantity,
      }));

      // 🔹 Tạo session Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: "http://localhost:3000/order",
        cancel_url: "http://localhost:3000/checkout",
        customer_email: customer?.email,
        metadata: {
          fullName: customer.fullName,
          phone: customer.phone,
          address: `${customer.street}, ${customer.city}, ${customer.country}`,
        },
      });

      // 🔹 Lưu đơn hàng vào database
      const newOrder = new Order({
        customer,
        paymentMethod,
        items,
        subtotal,
        shipping,
        tax,
        total,
        paymentStatus: "pending", // chưa thanh toán
        stripeSessionId: session.id, // lưu ID session Stripe
      });

      await newOrder.save();

      return res.status(200).json({
        success: true,
        url: session.url,
        message: "Order created & Stripe session initialized",
      });
    }

    // 🧾 Trường hợp COD hoặc phương thức khác
    if (paymentMethod === "cod") {
      const newOrder = new Order({
        customer,
        paymentMethod,
        items,
        subtotal,
        shipping,
        tax,
        total,
        paymentStatus: "pending",
      });
      await newOrder.save();
      return res.status(200).json({ success: true, message: "COD order placed successfully" });
    }

    return res.status(400).json({ success: false, message: "Invalid payment method" });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===============================
// GET /api/order/:id  → Lấy chi tiết 1 đơn hàng
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("Get order by ID error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===============================
// DELETE /api/order/:id  → Xóa đơn hàng
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error("Delete order error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ===============================
// PUT /api/order/:id/paymentStatus → cập nhật paymentStatus
// ===============================
router.put("/:id/paymentStatus", async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const validStatuses = ["pending", "paid", "failed"];

    if (!validStatuses.includes(paymentStatus?.toLowerCase())) {
      return res.status(400).json({ success: false, message: "Invalid payment status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: paymentStatus.toLowerCase() },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Payment status updated", order: updatedOrder });
  } catch (err) {
    console.error("Update payment status error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

module.exports = router;
