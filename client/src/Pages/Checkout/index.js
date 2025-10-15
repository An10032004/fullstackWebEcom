import React, { useContext, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { MyContext } from "../../App";
import { deleteData, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const context = useContext(MyContext);

  // ==============================
  // FORM STATE
  // ==============================
  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    phone: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    paymentMethod: "",
  });

  // ==============================
  // HANDLE CHANGE
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields((prev) => {
      const updated = { ...prev, [name]: value };

      // Cập nhật fullName tự động
      if (name === "firstName" || name === "lastName") {
        updated.fullName = `${name === "firstName" ? value : prev.firstName} ${
          name === "lastName" ? value : prev.lastName
        }`.trim();
      }

      return updated;
    });
  };

  // ==============================
  // ORDER SUMMARY (SAMPLE DATA)
  // ==============================
  const items = context.cartList || [];

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 12.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // ==============================
  // HANDLE SUBMIT
  // ==============================
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'))
    const { fullName, country, street, zipcode, city, email } = formFields;

    // Kiểm tra bắt buộc
    if (!fullName || !country || !street || !zipcode || !city || !email) {
      context.showAlert("Please fill in all required fields.","warning");
      return;
    }

    const payload = {
      customer: {
        fullName: formFields.fullName,
        email: formFields.email,
        phone: formFields.phone,
        street: formFields.street,
        apartment: formFields.apartment,
        city: formFields.city,
        state: formFields.state,
        zipcode: formFields.zipcode,
        country: formFields.country,
      },
      paymentMethod: formFields.paymentMethod,
      items: context.cartList?.map((item) => ({
        productId: item.productId,
        productTitle: item.productTitle,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal: subtotal,
      shipping: shipping,
      tax: tax,
      total: total,
    };


    try {
      context.showAlert("Processing your order...", "info");
      console.log(payload)
      const res = await postData("/api/order/stripePayment", payload);
      console.log("Stripe response:", res);

      // Nếu Stripe trả về URL hợp lệ -> chuyển hướng sang trang thanh toán
      if (res?.url) {
        window.location.href = res.url;
        return;
      }
      if (res?.success) {
            context.showAlert("Order placed successfully!", "success");
            deleteData(`/api/cart/clear/${ user.userId}`)
        .then(() => {
          context.setCartList([]);
          
        })
        .catch((err) => console.error("Clear cart error:", err));
                   

        navigate("/order"); // chuyển về trang chủ
      } else if (res?.url) {
        // nếu backend Stripe trả về session.url
        window.location.href = res.url;
      } else {
        context.showAlert("Order failed. Please try again!", "error");
      }
    } catch (error) {
      console.error(error);
      context.showAlert("Server error during checkout", "error");
    }
  };




  // ==============================
  // RENDER UI
  // ==============================
  return (
    <section className="section" style={{ padding: "40px 0" }}>
      <div className="container-fluid" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit}>
          <div className="row" style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            {/* ===== LEFT SIDE ===== */}
            <div style={{ flex: "1 1 65%" }}>
              {/* BILLING DETAILS */}
              <Card sx={{ mb: 4, p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Billing Details
                </Typography>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "10px" }}>
                  <TextField
                    label="First Name *"
                    name="firstName"
                    value={formFields.firstName}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    sx={{ flex: "1 1 45%" }}
                    required
                  />
                  <TextField
                    label="Last Name *"
                    name="lastName"
                    value={formFields.lastName}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    sx={{ flex: "1 1 45%" }}
                    required
                  />
                  <TextField
                    label="Email Address *"
                    name="email"
                    type="email"
                    value={formFields.email}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
                  <TextField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formFields.phone}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
              </Card>

              {/* SHIPPING ADDRESS */}
              <Card sx={{ mb: 4, p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Shipping Address
                </Typography>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "10px" }}>
                  <TextField
                    label="Street Address *"
                    name="street"
                    value={formFields.street}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
                  <TextField
                    label="Apartment, suite, etc. (optional)"
                    name="apartment"
                    value={formFields.apartment}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    label="City"
                    name="city"
                    value={formFields.city}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ flex: "1 1 32%" }}
                  />
                  <TextField
                    label="State"
                    name="state"
                    value={formFields.state}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ flex: "1 1 32%" }}
                  />
                  <TextField
                    label="ZIP Code"
                    name="zipcode"
                    value={formFields.zipcode}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ flex: "1 1 32%" }}
                  />

                  <FormControl fullWidth sx={{ flex: "1 1 100%" }}>
                    <InputLabel>Country</InputLabel>
                    <Select
                      name="country"
                      value={formFields.country}
                      label="Country"
                      onChange={handleChange}
                    >
                      {context.countryList?.length > 0 ? (
                        context.countryList.map((item, index) => (
                          <MenuItem value={item.name} key={index}>
                            {item.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No countries available</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </div>
              </Card>

              {/* PAYMENT DETAILS */}
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Payment Details
                </Typography>

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    name="paymentMethod"
                    value={formFields.paymentMethod}
                    label="Payment Method"
                    onChange={handleChange}
                  >
                    <MenuItem value="credit">Credit / Debit Card</MenuItem>
                    <MenuItem value="cod">Cash on Delivery (COD)</MenuItem>
                    {/* <MenuItem value="paypal">PayPal</MenuItem>
                    <MenuItem value="momo">MoMo</MenuItem> */}
                  </Select>
                </FormControl>

                {formFields.paymentMethod === "credit" && (
                  <>
                    <TextField
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2 }}
                      required
                    />
                    <div style={{ display: "flex", gap: "20px", width: "100%", marginTop: "10px" }}>
                      <TextField label="Expiration (MM/YY)" variant="outlined" sx={{ flex: 1 }} />
                      <TextField label="CVC" variant="outlined" sx={{ flex: 1 }} />
                    </div>
                    <TextField
                      label="Cardholder Name"
                      placeholder="John Doe"
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2 }}
                    />
                  </>
                )}
              </Card>
            </div>

            {/* ===== RIGHT SIDE ===== */}
            <div style={{ flex: "1 1 30%" }}>
              <Card sx={{ p: 3, position: "sticky", top: 20 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Order Summary
                </Typography>

                <CardContent sx={{ p: 0 }}>
                  {items.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <Typography variant="body2">
                        {item.productTitle?.substr(0, 30) + '...'} × {item.quantity}
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </div>
                  ))}

                  <Divider sx={{ my: 2 }} />

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography color="text.secondary">Subtotal</Typography>
                    <Typography>${subtotal.toFixed(2)}</Typography>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography color="text.secondary">Shipping</Typography>
                    <Typography>${shipping.toFixed(2)}</Typography>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography color="text.secondary">Tax</Typography>
                    <Typography>${tax.toFixed(2)}</Typography>
                  </div>

                  <Divider sx={{ my: 2 }} />

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography fontWeight={600}>Total</Typography>
                    <Typography fontWeight={600}>${total.toFixed(2)}</Typography>
                  </div>
                </CardContent>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" color="text.secondary">
                  By placing your order, you agree to our{" "}
                  <Button
                    variant="text"
                    sx={{ textDecoration: "underline", p: 0, minWidth: 0 }}
                    onClick={() => alert("Terms of Service coming soon!")}
                  >
                    Terms of Service
                  </Button>
                  .
                </Typography>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  Complete Order
                </Button>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
