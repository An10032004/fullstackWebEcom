import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { IoIosClose, IoMdCart } from "react-icons/io";
import QuantityBox from "../../Components/QuantityBox";
import Button from "@mui/material/Button";
import { fetchDataFromApi, editData, deleteData } from "../../utils/api";
import { useEffect, useState, useMemo, useContext } from "react";
import { MyContext } from "../../App";

const Cart = () => {
  const { setCartCount, setCartTotal, cartList, setCartList } = useContext(MyContext);
  const navigate = useNavigate();

  // ✅ Lấy userId từ localStorage
  const localUser = JSON.parse(localStorage.getItem("user"));
  const localUserId = localUser?.userId || null;

  // ✅ Nếu chưa đăng nhập → chuyển hướng login
 

  // ✅ Lọc giỏ hàng chỉ hiển thị sản phẩm của user hiện tại
  const filteredCart = localUserId
    ? cartList.filter((item) => item.userId === localUserId)
    : [];

  // 🧮 Tính subtotal & total dựa trên filteredCart
  const subtotal = useMemo(() => {
    return filteredCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [filteredCart]);

  const shippingCost = 0;
  const total = subtotal + shippingCost;

  // 🧱 Cập nhật số lượng
  const handleQuantityChange = async (id, newQuantity) => {
    setCartList((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    try {
      await editData(`/api/cart/${id}`, { quantity: newQuantity });
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // 🗑️ Xóa sản phẩm
  const handleRemoveItem = async (id) => {
    try {
      await deleteData(`/api/cart/${id}`);
      setCartList((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting cart item:", err);
    }
  };

  // ✅ Cập nhật tổng giỏ hàng toàn cục
  useEffect(() => {
    if (filteredCart.length > 0) {
      const count = filteredCart.reduce((acc, item) => acc + item.quantity, 0);
      const total = filteredCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setCartCount(count);
      setCartTotal(total);
    } else {
      setCartCount(0);
      setCartTotal(0);
    }
  }, [filteredCart, setCartCount, setCartTotal]);

  return (
    <section className="section cartPage">
      <div className="container-fluid">
        <h2 className="hd mb-0">Your Cart</h2>
        <p>
          There are{" "}
          <b className="text-red">{filteredCart?.length || 0}</b> products in your cart
        </p>

        <div className="row">
          {/* 🛒 Cart List */}
          <div className="col-md-8">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th width="45%">Product</th>
                    <th width="15%">Unit Price</th>
                    <th width="20%">Quantity</th>
                    <th width="15%">Subtotal</th>
                    <th width="10%">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCart && filteredCart.length > 0 ? (
                    filteredCart.map((item) => (
                      <tr key={item._id}>
                        <td width="45%">
                          <Link to={`/product/${item._id}`}>
                            <div className="d-flex align-items-center cartItemImgWrapper">
                              <div className="imgWrapper">
                                <img
                                  src={`${item.image}`}
                                  className="w-100"
                                  alt={item.name}
                                />
                              </div>
                              <div className="info px-3">
                                <h6>{item.name}</h6>
                                <Rating
                                  name="read-only"
                                  value={item.rating}
                                  readOnly
                                  precision={0.5}
                                  size="small"
                                />
                              </div>
                            </div>
                          </Link>
                        </td>

                        <td width="15%">${item.price.toFixed(2)}</td>

                        <td width="20%">
                          <QuantityBox
                            quantity={item.quantity}
                            setQuantity={(newQty) =>
                              handleQuantityChange(item._id, newQty)
                            }
                            max={item.countInStock || 10}
                          />
                        </td>

                        <td width="15%">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>

                        <td width="10%">
                          <span
                            className="remove"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRemoveItem(item._id)}
                          >
                            <IoIosClose />
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        {localUserId
                          ? "Your cart is empty"
                          : "Please log in to view your cart"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 📦 Cart Summary */}
          <div className="col-md-3">
            <div className="card border p-3 cartDetails">
              <h4>CART TOTALS</h4>
              <div className="d-flex align-items-center">
                <span>Subtotal</span>
                <span className="ml-auto text-red">${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex align-items-center">
                <span>Shipping</span>
                <span className="ml-auto">
                  <b>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</b>
                </span>
              </div>
              <div className="d-flex align-items-center">
                <span>Estimate For</span>
                <span className="ml-auto">
                  <b>Việt Nam</b>
                </span>
              </div>
              <div className="d-flex align-items-center">
                <span>TOTAL</span>
                <span className="ml-auto text-red">${total.toFixed(2)}</span>
              </div>
              <br />
              <Link to={`/checkout`}>
                <Button className="cartBtn btn-blue bg-red btn-lg btn-big ">
                  <IoMdCart /> Check Out
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
