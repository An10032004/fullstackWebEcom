import React, { useEffect, useRef, useState } from "react";
import { emphasize, styled } from "@mui/material";
import { Breadcrumbs, Chip } from "@mui/material";
import { MdHome } from "react-icons/md";
import Slider from "react-slick";
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaTags } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import { PiResizeFill } from "react-icons/pi";
import { IoMdPricetags } from "react-icons/io";
import { GoStarFill } from "react-icons/go";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import UserImg from "../../components/UserImg/UserImg";
import user from "../../assets/images/user.png";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaReply } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { editData, fetchDataFromApi } from "../../utils/api";

// ==================== Breadcrumb =====================
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

// ==================== Component =====================
const ProductDetails = () => {
  const { id } = useParams();

  const [productData, setProductData] = useState({});
  const [catData, setCatData] = useState({});
  const [reviews, setReviews] = useState([]);

  // === New state for replying ===
  const [replyingReviewId, setReplyingReviewId] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Lấy dữ liệu sản phẩm
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataFromApi(`/api/products/${id}`)
      .then((res) => {
        setProductData(res);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  // Lấy dữ liệu category
  useEffect(() => {
    if (!productData?.category) return;
    fetchDataFromApi(`/api/category/${productData.category}`)
      .then((res) => setCatData(res))
      .catch((err) => console.error("Error fetching category:", err));
  }, [productData.category]);

  // Lấy dữ liệu review
  const loadReviews = () => {
    fetchDataFromApi(`/api/reviews/${id}`)
      .then((res) => setReviews(Array.isArray(res) ? res : []))
      .catch((err) => console.error("Error fetching reviews:", err));
  };

  useEffect(() => {
    if (id) loadReviews();
  }, [id]);

  // Xử lý khi nhấn Reply
  const handleReplyClick = (reviewId) => {
    if (replyingReviewId === reviewId) {
      // Bấm lại thì đóng form
      setReplyingReviewId(null);
      setReplyText("");
    } else {
      setReplyingReviewId(reviewId);
      setReplyText("");
    }
  };

  // Gửi reply đến API
  const handleReplySubmit = async (reviewId) => {
  if (!replyText.trim()) return alert("Reply cannot be empty!");
  try {
    const res = await editData(`/api/reviews/reply/${reviewId}`, { text: replyText });
    console.log(res)
    if (res?.success || res?.review) {
      const updatedReview = res.review;

      // ✅ Cập nhật trực tiếp state để hiển thị ngay
      setReviews((prevReviews) =>
        prevReviews.map((r) =>
          r._id === updatedReview._id ? updatedReview : r
        )
      );

      alert("Reply added successfully!");
      setReplyingReviewId(null);
      setReplyText("");
    }
  } catch (err) {
    console.error("Error replying:", err);
    alert("Error while sending reply.");
  }
};
  // Slider
  const productSliderBig = useRef();
  const productSliderSmall = useRef();

  const productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const productSliderSmlOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  const goToSlider = (index) => {
    productSliderBig.current.slickGoTo(index);
    productSliderSmall.current.slickGoTo(index);
  };

  return (
    <>
      <div className="right-content w-100">
        {/* ================= HEADER ================= */}
        <div className="card shadow border-0 w-100 flex-row p-4 res-col">
          <h5 className="mb-0">Product View</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<MdHome fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Products" />
            <StyledBreadcrumb label="Product View" />
          </Breadcrumbs>
        </div>

        {/* ================= PRODUCT DETAILS ================= */}
        <div className="card product-details-section">
          <div className="row">
            {/* -------- LEFT: Image Slider -------- */}
            <div className="col-md-5">
              <div className="slider-wrapper pt-3 pb-3 pl-3 pr-3">
                <h6 className="mb-4">Product Gallery</h6>

                {/* Slider big */}
                <Slider {...productSliderOptions} ref={productSliderBig} className="slider-big mb-2">
                  {productData?.images?.length > 0 ? (
                    productData.images.map((img, i) => (
                      <div className="item" key={i}>
                        <img src={`http://localhost:4000/uploads/${img}`} alt="product" className="w-100" />
                      </div>
                    ))
                  ) : (
                    <div className="item">
                      <img
                        src="https://via.placeholder.com/400x400?text=No+Image"
                        alt="placeholder"
                        className="w-100"
                      />
                    </div>
                  )}
                </Slider>

                {/* Slider small */}
                <Slider {...productSliderSmlOptions} ref={productSliderSmall} className="slider-small">
                  {productData?.images?.length > 0 ? (
                    productData.images.map((img, i) => (
                      <div className="item" key={i} onClick={() => goToSlider(i)}>
                        <img src={`http://localhost:4000/uploads/${img}`} alt={`thumb-${i}`} className="w-100" />
                      </div>
                    ))
                  ) : (
                    <div className="item">
                      <img
                        src="https://via.placeholder.com/100x100"
                        alt="placeholder"
                        className="w-100"
                      />
                    </div>
                  )}
                </Slider>
              </div>
            </div>

            {/* -------- RIGHT: Info -------- */}
            <div className="col-md-7">
              <div className="pt-3 pb-3 pl-3 pr-3">
                <h6 className="mb-4">Product Details</h6>
                <h4>{productData.name || "No product name"}</h4>

                <div className="product-info mt-4">
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icons">
                        <MdBrandingWatermark />
                      </span>
                      <span className="name">Brand</span>
                    </div>
                    <div className="col-sm-9">
                      <span>{productData.brand || "N/A"}</span>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icons">
                        <BiSolidCategoryAlt />
                      </span>
                      <span className="name">Category</span>
                    </div>
                    <div className="col-sm-9">
                      <span>{catData?.name || "Unknown"}</span>
                    </div>
                  </div>
                
                  {/* Sub Category */}
<div className="row">
  <div className="col-sm-3 d-flex align-items-center">
    <span className="icons">
      <FaTags />
    </span>
    <span className="name">Sub Category</span>
  </div>
  <div className="col-sm-9">
    <span>{productData.subCategory || "N/A"}</span>
  </div>
</div>

{/* Product RAM */}
<div className="row">
  <div className="col-sm-3 d-flex align-items-center">
    <span className="icons">
      <PiResizeFill />
    </span>
    <span className="name">RAM</span>
  </div>
  <div className="col-sm-9">
    <span>
      {productData.productRAMS && productData.productRAMS.length > 0
        ? productData.productRAMS.join(", ")
        : "N/A"}
    </span>
  </div>
</div>

{/* Product SIZE */}
<div className="row">
  <div className="col-sm-3 d-flex align-items-center">
    <span className="icons">
      <IoIosColorPalette />
    </span>
    <span className="name">Size</span>
  </div>
  <div className="col-sm-9">
    <span>
      {productData.productSIZE && productData.productSIZE.length > 0
        ? productData.productSIZE.join(", ")
        : "N/A"}
    </span>
  </div>
</div>

{/* Product Weight */}
<div className="row">
  <div className="col-sm-3 d-flex align-items-center">
    <span className="icons">
      <IoMdPricetags />
    </span>
    <span className="name">Weight</span>
  </div>
  <div className="col-sm-9">
    <span>
      {productData.productWeight && productData.productWeight.length > 0
        ? productData.productWeight.join(", ")
        : "N/A"}
    </span>
  </div>
</div>


                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icons">
                        <IoMdPricetags />
                      </span>
                      <span className="name">Price</span>
                    </div>
                    <div className="col-sm-9">
                      <span>
                        ${productData.price}
                        {productData.discount && (
                          <del className="ml-2">
                            ${(productData.price + productData.discount).toFixed(2)}
                          </del>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icons">
                        <GoStarFill />
                      </span>
                      <span className="name">Review</span>
                    </div>
                    <div className="col-sm-9">
                      <span>({reviews.length}) Reviews</span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icons">
                        <MdOutlinePublishedWithChanges />
                      </span>
                      <span className="name">Published</span>
                    </div>
                    <div className="col-sm-9">
                      <span>
                        {productData?.createdAt
                          ? new Date(productData.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= REVIEWS SECTION ================= */}
        <div className="p-4">
            <h6 className="mt-4 mb-4">Customer Reviews</h6>
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div className="reviews-row mb-4" key={rev._id}>
                  <div className="row">
                    <div className="col-sm-7">
                      <div className="d-flex flex-column">
                        <div className="user-info d-flex align-items-center mb-3">
                          <UserImg img={user} lg={true} />
                          <div className="info pl-3 pt-2">
                            <h6>{rev.customerName || "Anonymous"}</h6>
                            <span>{new Date(rev.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Rating
                          name="read-only"
                          value={rev.customerRating || 0}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-sm-5 d-flex align-items-center">
                      <Button
                        className="btn-big btn-blue ml-auto"
                        onClick={() => handleReplyClick(rev._id)}
                      >
                        <FaReply /> &nbsp; Reply
                      </Button>
                    </div>
                    <p className="mt-3">{rev.review}</p>
                    
                    {/* Nếu review có phản hồi thì hiển thị */}
                    {rev.reply && (
                      <div className="reply-box mt-6 p-3 bg-light rounded">
                        <strong>Admin reply:</strong>
                        <p className="mb-0">{rev.reply.text}</p>
                        <small className="text-muted">
                          {new Date(rev.reply.date).toLocaleDateString()}
                        </small>
                      </div>
                    )}

                    {/* Ô nhập reply nếu admin đang trả lời */}
                    {replyingReviewId === rev._id && (
                      <div className="mt-3 w-100">
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Write your reply here..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        ></textarea>
                        <Button
                          variant="contained"
                          color="primary"
                          className="mt-2"
                          onClick={() => handleReplySubmit(rev._id)}
                        >
                          Submit Reply
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
