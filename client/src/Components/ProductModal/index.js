import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Rating from "@mui/material/Rating";
import { MdClose, MdOutlineCompareArrows } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import { useContext, useState, useEffect } from "react";
import QuantityBox from "../QuantityBox";
import ProductZoom from "../ProductZoom";
import { MyContext } from "../../App";
import { postData, fetchDataFromApi } from "../../utils/api";

const ProductModal = ({ open, closeProductModal, product }) => {
  const { showAlert, addToCart } = useContext(MyContext);
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(product || null);

  useEffect(() => {
    if (product?._id || product?.id) {
      fetchDataFromApi(`/api/products/${product._id || product.id}`).then((res) => {
        setProductData(res);
      });
    }
  }, [product]);

  if (!productData) return null;

  // 🧩 Add to wishlist
  const addToMyList = async (item) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.userId) {
      showAlert("Please log in to use wishlist!", "warning");
      return;
    }

    try {
      const body = {
        productTitle: item.name,
        image: item.images?.[0],
        rating: item.rating || 0,
        price: item.price,
        productId: item.id || item._id,
        userId: user.userId,
      };

      const res = await postData("/api/mylist/add", body);
      if (res?.success) {
        showAlert("Added to your wishlist!", "success");
      } else {
        showAlert(res?.message || "Product already in wishlist!", "warning");
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      showAlert("Failed to add to wishlist", "error");
    }
  };

  // 🛒 Add to Cart
  const handleAddToCart = () => {
    if (productData.countInStock === 0) {
      showAlert("This product is out of stock!", "error");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const cartItem = {
      productTitle: productData.name,
      image: productData.images?.[0] || "",
      rating: productData.rating,
      price: productData.price,
      quantity,
      subTotal: productData.price * quantity,
      productId: productData.id || productData._id,
      userId: user?.userId || null,
    };

    addToCart(cartItem);
    closeProductModal();
  };

  return (
    <Dialog
      open={open}
      className="productModal"
      onClose={closeProductModal}
      hideBackdrop
      disableScrollLock
      keepMounted
    >
      <Button className="close" onClick={closeProductModal}>
        <MdClose />
      </Button>

      <div className="container p-4">
        <div className="row">
          {/* Left side - Image zoom */}
          <div className="col-md-5">
            <ProductZoom product={productData} />
          </div>

          {/* Right side - Info */}
          <div className="col-md-7">
            <h3 className="mb-1">{productData.name}</h3>

            <div className="d-flex align-items-center mb-2">
              <span className="text-muted mr-2">Brand:</span>
              <span>{productData.brand}</span>
              <Rating
                value={Number(productData.rating) || 0}
                size="small"
                precision={0.5}
                readOnly
                className="ml-3"
              />
            </div>

            <div className="d-flex align-items-center mb-3">
              {productData.oldPrice && (
                <span className="oldPrice text-muted text-strike mr-2">
                  ${productData.oldPrice}
                </span>
              )}
              <span className="netPrice text-danger font-weight-bold">
                ${productData.price}
              </span>
            </div>

            <span
              className={`badge ${
                productData.countInStock > 0
                  ? "bg-success"
                  : "bg-danger"
              } text-white`}
            >
              {productData.countInStock > 0 ? "IN STOCK" : "OUT OF STOCK"}
            </span>

            <p className="mt-3">{productData.description}</p>

            {/* Quantity + Cart */}
            <div className="d-flex align-items-center mt-4">
              <QuantityBox
                quantity={quantity}
                setQuantity={setQuantity}
                max={productData.countInStock || 1}
              />
              <Button
                className="btn-blue btn-lg btn-round ml-4"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>

            {/* Wishlist + Compare */}
            <div className="d-flex align-items-center mt-4">
              <Button
                onClick={() => addToMyList(productData)}
                className="btn-round btn-sml"
                variant="outlined"
              >
                <IoIosHeartEmpty /> &nbsp; Add to Wishlist
              </Button>
              <Button className="btn-round btn-sml ml-3" variant="outlined">
                <MdOutlineCompareArrows /> &nbsp; Compare
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductModal;
