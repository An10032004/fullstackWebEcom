import ProductZoom from "../../Components/ProductZoom"
import Rating from "@mui/material/Rating"
import QuantityBox from "../../Components/QuantityBox"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FaRegHeart } from 'react-icons/fa'; // For Ionicons
import { MdOutlineCompareArrows } from 'react-icons/md'; // For Material Design Icons
import Tooltip from "@mui/material/Tooltip"
import RelatedProducts from "./RelatedProducts"
import { fetchDataFromApi } from "../../utils/api"
const ProductDetails = () => {
    const [activeSize, setActiveSize] = useState(null)
    const [activeTabs, setActiveTabs] = useState(null)
    const isActive = (index) => {
        setActiveSize(index)
    }
    const {id } = useParams()
          const [productData,setProductData] = useState()

          const ID = id
          
    useEffect(() => {
                    window.scrollTo(0,0)

        fetchDataFromApi(`/api/products/${id}`).then((res) => {
            console.log(res)
            setProductData(res)
        })
        },[id])
    
    return (
        <>
            <section className="ProductDetails section">
                <div className="container-fluid" style={{ padding: "80px 130px" }}>
                    <div className="row">
                        <div className="col-md-4 pl-5">
                            <ProductZoom product={productData}/>
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
                                        <span className="text-black cursor ml-2">1 Review</span>
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
                                <QuantityBox product={productData}/>
                                <Button className='btn-blue btn-lg btn-big btn-round'>Add to Cart</Button>

                                <Tooltip title="Add to Wishlist" placement="top">
                                    <Button className="btn-blue btn-lg btn-big btn-circle ml-4">
                                        <FaRegHeart />
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
                                    >Reviews (3)
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

                                            <div className='card p-4 reviewsCard flex-row'>
                                                <div className='image'>
                                                    <div className='rounded-circle'>
                                                        <img alt="" src='https://cdn.shopify.com/s/files/1/2718/4356/files/beams-japan-kanji-number-wrist-watch-black-black-56480015784-19-accessoires_20_3E_20watches_300x.jpg?v=1749129803' />
                                                    </div>
                                                    <span className='text-d d-block text-center font-weight-bold'>An</span>
                                                </div>

                                                <div className='info pl-5'>
                                                    <div className='d-flex align-items-center w-100'>
                                                        <h5 className='text-light'>26/06/2025</h5>
                                                        <div className='ml-auto'>
                                                            <Rating name="half-rating-read" value={4.5} precision={0.5} readOnly />
                                                        </div>
                                                    </div>
                                                    <p>Reebok x Botter is an exciting collaboration that redefines the boundaries...</p>
                                                </div>
                                            </div>

                                            <br className="res-hide" />
                                            <br className="res-hide" />

                                            <form className='reviewForm'>
                                                <h4>Add a review</h4>
                                                <br />
                                                <div className='form-group'>
                                                    <textarea
                                                        className='form-control'
                                                        placeholder='Write a Review'
                                                        name="review"
                                                    ></textarea>
                                                </div>

                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <input
                                                                type='text'
                                                                className='form-control'
                                                                placeholder='Name'
                                                                name='userName'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <Rating
                                                                name="rating"
                                                                value={4.5}
                                                                precision={0.5}
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
                                                <Rating name="read-only" value={4.8} precision={0.1} readOnly size="large" />
                                                <strong className="ml-2">4.8 out of 5</strong>
                                            </div>

                                            <div className="progress-wrapper mt-4">
                                                {[
                                                    { label: "5 star", percent: 75 },
                                                    { label: "4 star", percent: 50 },
                                                    { label: "3 star", percent: 55 },
                                                    { label: "2 star", percent: 35 },
                                                    { label: "1 star", percent: 25 },
                                                ].map((item, index) => (
                                                    <div className="progress-item d-flex align-items-center mb-2" key={index}>
                                                        <span className="mr-2">{item.label}</span>
                                                        <div className="progress w-75">
                                                            <div
                                                                className="progress-bar"
                                                                style={{ width: `${item.percent}%`, backgroundColor: "#3bb77e" }}
                                                            ></div>
                                                        </div>
                                                        <span className="ml-2 text-muted">{item.percent}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }


                        </div>
                    </div>

                                        <br/>

                    <RelatedProducts product={productData?.category}/>
                </div>
            </section>
        </>
    )
}

export default ProductDetails