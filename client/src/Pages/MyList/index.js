import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { IoIosClose, IoMdCart } from 'react-icons/io';
import Button from '@mui/material/Button';
import { fetchDataFromApi, deleteData, postData } from '../../utils/api';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from "../../App";

const WishList = () => {
  const [wishData, setWishData] = useState([]);
  const {showAlert} = useContext(MyContext)
  // 🧭 Lấy dữ liệu wishlist từ API
  const loadWishList = async () => {
    try {
      const res = await fetchDataFromApi(`/api/mylist`);
      console.log(res)
      setWishData(res.myList || []);
    } catch (err) {
      console.error("Error loading wishlist:", err);
    }
  };

  useEffect(() => {
    loadWishList();
  }, []);

  // 🗑️ Xóa sản phẩm khỏi wishlist
  const handleRemoveItem = async (id) => {
    try {
      await deleteData(`/api/mylist/${id}`);
      setWishData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting wishlist item:", err);
    }
  };

  // 🛒 Thêm sản phẩm vào giỏ hàng (tuỳ chọn)
  const handleAddToCart = async (item) => {
    // Ở đây bạn có thể gọi API /api/cart/add
    console.log("Add to cart:", item);
    // const product = {
    //   productTitle :res.productList?.name,
    //   image:res.productList?.image[0],
    //   rating:res.productList?.rating,
    //   price:res.productList?.price,
    //   quantity: 1,
    //   subTotal:res.productList?.price,
    //   productId:item.productId
    //   userId,
    // }

    // Ví dụ:
    await postData('/api/cart/add', {
      productId: item.productId,
      productTitle: item.productTitle,
      image: item.image,
      quantity: 1,
      subTotal:item.price,
      rating: item.rating,
      price: item.price,
      userId: item.userId
    });
    await deleteData(`/api/mylist/${item._id}`);
      setWishData((prev) => prev.filter((x) => x._id !== item._id));

    showAlert("Add to cart success","success")
  };

  return (
    <section className="section wishPage">
      <div className="container-fluid">
        <h2 className="hd mb-0">Your Wishlist ❤️</h2>
        <p>
          You have{" "}
          <b className="text-red">{wishData?.length || 0}</b> products in your wishlist
        </p>

        <div className="row">
          <div className="col-md-10">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th width="45%">Product</th>
                    <th width="15%">Unit Price</th>
                    <th width="20%">Rating</th>
                    <th width="10%">Add to Cart</th>
                    <th width="10%">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {wishData && wishData.length > 0 ? (
                    wishData.map((item) => (
                      <tr key={item._id}>
                        {/* 🖼 Product info */}
                        <td width="45%">
                          <Link to={`/product/${item.productId}`}>
                            <div className="d-flex align-items-center cartItemImgWrapper">
                              <div className="imgWrapper">
                                <img
                                  src={`http://localhost:4000/uploads/${item.image}`}
                                  className="w-100"
                                  alt={item.productTitle}
                                />
                              </div>
                              <div className="info px-3">
                                <h6>{item.productTitle}</h6>
                              </div>
                            </div>
                          </Link>
                        </td>

                        <td width="15%">${item.price.toFixed(2)}</td>

                        <td width="20%">
                          <Rating
                            name="read-only"
                            value={parseFloat(item.rating) || 0}
                            precision={0.5}
                            readOnly
                            size="small"
                          />
                        </td>

                        {/* 🛒 Add to cart button */}
                        <td width="10%">
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleAddToCart(item)}
                          >
                            <IoMdCart /> 
                          </Button>
                        </td>

                        {/* ❌ Remove button */}
                        <td width="10%">
                          <span
                            className="remove"
                            style={{ cursor: "pointer", fontSize: "22px" }}
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
                        Your wishlist is empty 💔
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishList;
