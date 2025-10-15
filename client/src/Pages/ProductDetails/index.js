import ProductZoom from "../../Components/ProductZoom"
import Rating from "@mui/material/Rating"
import QuantityBox from "../../Components/QuantityBox"
import Button from "@mui/material/Button"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FaRegHeart } from 'react-icons/fa'; // For Ionicons
import { MdOutlineCompareArrows } from 'react-icons/md'; // For Material Design Icons
import Tooltip from "@mui/material/Tooltip"
import RelatedProducts from "./RelatedProducts"
import { fetchDataFromApi, postData } from "../../utils/api"
import { MyContext } from "../../App"
const ProductDetails = () => {
    const [activeSize, setActiveSize] = useState(null)
    const [activeTabs, setActiveTabs] = useState(null)
    const isActive = (index) => {
        setActiveSize(index)
    }
    const { id } = useParams()
    const [productData, setProductData] = useState()
    const [cartFields, setcartFields] = useState({

    })
    const ID = id

    const context = useContext(MyContext)
    const {showAlert} = useContext(MyContext)
    useEffect(() => {
        window.scrollTo(0, 0)

        fetchDataFromApi(`/api/products/${id}`).then((res) => {
            console.log(res)
            setProductData(res)
        })
    }, [id])
    const [quantity, setQuantity] = useState(1);
    const addToCart = (data) => {
        const user = JSON.parse(localStorage.getItem('user'))


        cartFields.productTitle = data?.name
        cartFields.image = data?.images?.[0] || data?.images || ""
        cartFields.rating = data?.rating
        cartFields.price = data?.price
        cartFields.quantity = quantity || 1
        cartFields.subTotal = data?.price * (quantity || 1)
        cartFields.productId = data?.id
        cartFields.userId = user?.userId

        console.log(cartFields)
        context.addToCart(cartFields)
    }

    const [review, setReviewData] = useState({
        productId: id,          // ✅ có sẵn từ useParams
        customerName: "",       // nhập từ input
        review: "",             // nhập từ textarea
        customerRating: 1    // chọn từ Rating component
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };
    const handleRatingChange = (event, newValue) => {
        setReviewData((prev) => ({
            ...prev,
            customerRating: newValue,
        }));
    };
    const submitReview = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'))
        const userName = user?.name
        review.customerName = userName
        if ( !review.review) {
            context.showAlert("Please fill in your name and review.", "warning");
            return;
        }

        try {
            const res = await postData('/api/reviews/add', review);
            console.log('Review submitted:', res);
            context.showAlert("Thank you for your review!", "success");

            // Reset form
            setReviewData({
                productId: id,
                customerName: "",
                review: "",
                customerRating: 0
            });
        } catch (error) {
            console.error('Error submitting review:', error);
            context.showAlert("Error submitting review. Please try again.", "error");
        }
    };

    const [showReview, setShowReview] = useState()

    useEffect(() => {
        fetchDataFromApi('/api/reviews').then((res) => {
            setShowReview(res)
        })
    }, [id])


    const [reviewStats, setReviewStats] = useState({
        avgRating: 0,
        total: 0,
        counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        percents: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    });

    useEffect(() => {
        if (showReview && showReview.length > 0) {
            const productReviews = showReview.filter(r => r.productId === id);
            const total = productReviews.length;

            if (total > 0) {
                const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

                productReviews.forEach(r => {
                    const rating = Math.round(r.customerRating);
                    if (counts[rating] !== undefined) counts[rating]++;
                });

                const avgRating =
                    productReviews.reduce((sum, r) => sum + r.customerRating, 0) / total;

                const percents = Object.fromEntries(
                    Object.entries(counts).map(([k, v]) => [k, ((v / total) * 100).toFixed(1)])
                );

                setReviewStats({
                    avgRating: avgRating.toFixed(1),
                    total,
                    counts,
                    percents
                });
            } else {
                setReviewStats({
                    avgRating: 0,
                    total: 0,
                    counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
                    percents: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
                });
            }
        }
    }, [showReview, id]);

    
    const addToMyList = async (item) => {
        console.log(item)
                const user = JSON.parse(localStorage.getItem('user'))

    if (!user?.userId) {
      showAlert("Please log in to use wishlist!", "warning");
      return;
    }

    if (!item) {
      showAlert("No product selected!", "error");
      return;
    }

    try {
      const body = {
        productTitle: item.name,
        image: item.images?.[0],
        rating: item.rating || 0,
        price: item.price,
        productId: item.id,
        userId: user?.userId,
      };

     postData("/api/mylist/add", body).then((res) => {
        if (res?.success === true) {
      showAlert("Added to your wishlist!", "success");
    } else {
      showAlert(res?.message || "Product already in wishlist!", "warning");
    }
       });

    

      
    } catch (err) {
      console.error("Error adding to my list:", err);
      showAlert("Failed to add to wishlist", "error");
    }
  };
    return (
        <>
            <section className="ProductDetails section">
                <div className="container-fluid" style={{ padding: "80px 130px" }}>
                    <div className="row">
                        <div className="col-md-4 pl-5">
                            <ProductZoom product={productData} />
                        </div>

                        <div className="col-md-7 pl-5">
                            <h2 className="hd text-capitalize">{productData?.name}</h2>
                            <ul className="list list-inline">
                                <li className="list-inline-item d-flex align-items-center">
                                    <div className="d-flex align-items-center">
                                        <span className="text-gray mr-2">Brands : </span>
                                        <span>{productData?.brand}</span>
                                    </div>
                                </li>

                                <li className="list-inline-item">
                                    <div className="d-flex align-items-center">
                                        <Rating name="read-only" value={productData?.rating} precision={0.5} readOnly size="small" />
                                        <span className="text-black cursor ml-2">
                                            {showReview?.filter(r => r.productId === id)?.length || 0} Review{showReview?.filter(r => r.productId === id)?.length > 1 ? 's' : ''}

                                        </span>
                                    </div>
                                </li>

                            </ul>


                            <div class="d-flex flex info mb-3">
                                <span class="oldPrice" style={{ textDecoration: 'line-through' }}>${productData?.oldPrice}</span>
                                <span class="netPrice text-danger ml-2">${productData?.price}</span>
                            </div>

                            <span className={productData?.countInStock > 0 ? "badge badge-success" : "badge badge-danger"}>
                                {productData?.countInStock > 0 ? "In Stock" : "Out Stock"}
                            </span>
                            <p className="mt-2" style={{ fontSize: '20px' }}>
                                {productData?.description}
                            </p>

                            <div className='productSize d-flex align-items-center'>
                                <span>Size :</span>
                                <ul className='list list-inline mb-0 pl-4'>
                                    {productData?.productSIZE?.map((size, index) => (
                                        <li key={index} className="list-inline-item">
                                            <Link
                                                className={`tag ${activeSize === index ? 'active' : ''}`}
                                                onClick={() => isActive(index)}
                                            >
                                                {size}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="d-flex align-items-center">
                                <QuantityBox quantity={quantity}
                                    setQuantity={setQuantity}
                                    max={productData?.countInStock || 1} />
                                <br/>
                                <Button className='btn-blue btn-lg btn-big btn-round ml-5' onClick={() => addToCart(productData)}>Add to Cart</Button>

                                <Tooltip title="Add to Wishlist" placement="top">
                                    <Button className="btn-blue btn-lg btn-big btn-circle ml-4">
                                        <FaRegHeart onClick={() => addToMyList(productData)}/>
                                    </Button>
                                </Tooltip>

                                <Tooltip title="Add to Compare" placement="top">
                                    <Button className="btn-blue btn-lg btn-big btn-circle ml-4">
                                        <MdOutlineCompareArrows />
                                    </Button>
                                </Tooltip>
                            </div>

                        </div>
                    </div>

                    <br />

                    <div className='card mt-5 p-5 detailsPageTabs'>
                        <div className='customTabs'>
                            <ul className='list list-inline'>
                                <li className='list-inline-item'>
                                    <Button className={`${activeTabs === 0 && 'active'}`}
                                        onClick={() => {
                                            setActiveTabs(0)
                                        }}>Description</Button>
                                </li>
                                <li className='list-inline-item'>
                                    <Button className={`${activeTabs === 1 && 'active'}`}
                                        onClick={() => {
                                            setActiveTabs(1)
                                        }}
                                    >Additional infos
                                    </Button>
                                </li>

                                <li className='list-inline-item'>
                                    <Button className={`${activeTabs === 2 && 'active'}`}
                                        onClick={() => {
                                            setActiveTabs(2)
                                            // showReviews()
                                        }}
                                    >Reviews (                                              {showReview?.filter(r => r.productId === id)?.length || 0} Review{showReview?.filter(r => r.productId === id)?.length > 1 ? 's' : ''}
                                        )
                                    </Button>
                                </li>
                            </ul>

                            <br />

                            {
                                activeTabs === 0 &&
                                <div className='tabContent'>
                                    <p>{productData?.description}</p>
                                </div>
                            }
                            {
                                activeTabs === 1 &&
                                // <div className='tabContent'>
                                //     <div className='table-responsive'>
                                //         <table className='table table-bordered'>
                                //             <tbody>
                                //                 <tr class="stand-up">
                                //                     <th>Stand Up</th>
                                //                     <td>
                                //                         <p>35"L x 24"W x 37-45"H(front to back wheel)</p>
                                //                     </td>
                                //                 </tr>
                                //                 <tr class="folded-wo-wheels">
                                //                     <th>Folded (w/o wheels)</th>
                                //                     <td>
                                //                         <p>32.5"L x 18.5"W x 16.5"H</p>
                                //                     </td>
                                //                 </tr>
                                //                 <tr class="folded-w-wheels">
                                //                     <th>Folded (w/ wheels)</th>
                                //                     <td>
                                //                         <p>32.5"L x 24"W x 18.5"H</p>
                                //                     </td>
                                //                 </tr>
                                //                 <tr class="door-pass-through">
                                //                     <th>Door Pass Through</th>
                                //                     <td>
                                //                         <p>24</p>
                                //                     </td>
                                //                 </tr>
                                //                 <tr class="frame">
                                //                     <th>Frame</th>
                                //                     <td>
                                //                         <p>Aluminum</p>
                                //                     </td>
                                //                 </tr>
                                //                 <tr class="width">
                                //                     <th>Width</th>
                                //                     <td>
                                //                         <p>24"</p>
                                //                     </td>
                                //                 </tr>
                                //                 <tr class="handle-height-ground-to-handle">
                                //                     <th>Handle height (ground to handle)</th>
                                //                     <td>
                                //                         <p>37-45"</p>
                                //                     </td>
                                //                 </tr>
                                //                 <tr class="wheels">
                                //                     <th>Wheels</th>
                                //                     <td>
                                //                         <p>25"</p>
                                //                     </td>
                                //                 </tr>
                                //                 <tr class="pa_color">
                                //                     <th>Color</th>
                                //                     <td>
                                //                         <p>Black, Blue, Red, White</p>
                                //                     </td>
                                //                 </tr>
                                //                 <tr class="pa_size">
                                //                     <th>Size</th>
                                //                     <td>
                                //                         <p>M, S</p>
                                //                     </td>
                                //                 </tr>
                                //             </tbody>
                                //         </table>
                                //     </div>
                                // </div>
                                <div className='tabContent'>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered'>
                                            <tbody>
                                                {/* SubCategory */}
                                                <tr>
                                                    <th>Sub Category</th>
                                                    <td>
                                                        <p>{productData?.subCategory || "N/A"}</p>
                                                    </td>
                                                </tr>

                                                {/* RAMS */}
                                                <tr>
                                                    <th>RAM</th>
                                                    <td>
                                                        {productData?.productRAMS?.length > 0 ? (
                                                            <ul className="list-inline-item">
                                                                {productData.productRAMS.map((ram, idx) => (
                                                                    <li key={idx}>{ram}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p>No RAM info</p>
                                                        )}
                                                    </td>
                                                </tr>

                                                {/* Weight */}
                                                <tr>
                                                    <th>Weight</th>
                                                    <td>
                                                        {productData?.productWeight?.length > 0 ? (
                                                            <ul className="list-inline-item">
                                                                {productData.productWeight.map((w, idx) => (
                                                                    <li key={idx}>{w}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p>No weight info</p>
                                                        )}
                                                    </td>
                                                </tr>

                                                {/* Size */}
                                                <tr>
                                                    <th>Size</th>
                                                    <td>
                                                        {productData?.productSIZE?.length > 0 ? (
                                                            <ul className="list-inline-item">
                                                                {productData.productSIZE.map((size, idx) => (
                                                                    <li key={idx}>{size}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p>No size info</p>
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }

                            {
                                activeTabs === 2 &&
                                <div className='tabContent'>
                                    <div className='row'>
                                        {/* Bên trái - 8 cột */}
                                        <div className='col-md-8'>
                                            <h3>Customer questions & answers</h3>
                                            <br />

                                           {showReview && showReview.length > 0 ? (
  showReview
    .filter((rev) => rev.productId === id) // ✅ chỉ review của sản phẩm hiện tại
    .map((rev, index) => (
      <div className='card p-4 reviewsCard flex-row mb-4' key={index}>
        <div className='image'>
          <div className='rounded-circle'>
            <img
              alt=""
              src={productData?.images?.[0]
                ? `http://localhost:4000/uploads/${productData.images[0]}`
                : '/no-image.jpg'}
            />
          </div>
          <span className='text-d d-block text-center font-weight-bold'>
            {rev.customerName}
          </span>
        </div>

        <div className='info pl-5 w-100'>
          <div className='d-flex align-items-center w-100'>
            <h5 className='text-dark'>
              {new Date(rev.dateCreated).toLocaleDateString()}
            </h5>
            <div className='ml-auto'>
              <Rating
                name="read-only"
                value={rev.customerRating}
                precision={0.5}
                readOnly
              />
            </div>
          </div>

          <p>{rev.review}</p>

          {/* ✅ Nếu có reply của admin thì hiển thị ở đây */}
          {rev.reply && rev.reply.text && (
            <div
              className="admin-reply mt-3 p-3 rounded"
              style={{
                background: "#f8f9fa",
                borderLeft: "4px solid #3bb77e",
              }}
            >
              <strong className="text-success d-block mb-1">Admin Reply:</strong>
              <p className="mb-1">{rev.reply.text}</p>
              <small className="text-muted">
                {new Date(rev.reply.date).toLocaleString()}
              </small>
            </div>
          )}
        </div>
      </div>
    ))
) : (
  <p className='text-muted'>No reviews yet. Be the first to write one!</p>
)}



                                            <br className="res-hide" />
                                            <br className="res-hide" />

                                            <form onSubmit={submitReview} className='reviewForm'>
                                                <h4>Add a review</h4>
                                                <br />
                                                <div className='form-group'>
                                                    <textarea
                                                        className='form-control'
                                                        placeholder='Write a Review'
                                                        name="review"
                                                        value={review.review}
                                                        onChange={handleChange}
                                                    ></textarea>
                                                </div>

                                                <div className='row'>
                                                    
                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <Rating
                                                                name="customerRating"
                                                                value={review.customerRating}
                                                                precision={0.5}
                                                                onChange={handleRatingChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn-blue btn-lg btn-big btn-round">
                                                    Submit Review
                                                </button>
                                            </form>
                                        </div>

                                        {/* Bên phải - 4 cột */}
                                        <div className='col-md-4'>
                                            <h3 className='hd'>Customer reviews</h3>
                                            <div className="d-flex align-items-center mt-3">
                                                <Rating
                                                    name="read-only"
                                                    value={parseFloat(reviewStats.avgRating)}
                                                    precision={0.1}
                                                    readOnly
                                                    size="large"
                                                />
                                                <strong className="ml-2">
                                                    {reviewStats.avgRating} out of 5
                                                </strong>
                                            </div>
                                            <p className="text-muted">{reviewStats.total} review{reviewStats.total > 1 ? 's' : ''} total</p>

                                            <div className="progress-wrapper mt-4">
                                                {[5, 4, 3, 2, 1].map((star) => (
                                                    <div
                                                        className="progress-item d-flex align-items-center mb-2"
                                                        key={star}
                                                    >
                                                        <span className="mr-2">{star} star</span>
                                                        <div className="progress w-75">
                                                            <div
                                                                className="progress-bar"
                                                                style={{
                                                                    width: `${reviewStats.percents[star] || 0}%`,
                                                                    backgroundColor: "#3bb77e",
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <span className="ml-2 text-muted">
                                                            {reviewStats.percents[star] || 0}%
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            }


                        </div>
                    </div>

                    <br />

                    <RelatedProducts product={productData?.category} />
                </div>
            </section>
        </>
    )
}

export default ProductDetails