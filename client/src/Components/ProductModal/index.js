import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import { MdClose } from "react-icons/md"
import Rating from "@mui/material/Rating"
// import Slider from "react-slick"
// import { useRef, useState } from "react"
// import InnerImageZoom from 'react-inner-image-zoom';
// import 'react-inner-image-zoom/lib/styles.min.css';
import { IoIosHeartEmpty } from 'react-icons/io'; // For Ionicons
import { MdOutlineCompareArrows } from 'react-icons/md'; // For Material Design Icons
import QuantityBox from "../QuantityBox"
import ProductZoom from "../ProductZoom"
import { MyContext } from "../../App";
import { useContext } from "react";
import { postData } from "../../utils/api";
const ProductModal = ({ open, closeProductModal ,product}) => {
        const {showAlert} = useContext(MyContext)

    if (!product) return null;


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
        <Dialog open={open} className="productModal" onClose={closeProductModal} hideBackdrop           // không che nền
  disableScrollLock >
            <Button className='close' onClick={closeProductModal}><MdClose /></Button>
            <h4 className="mb-0">{product.name}</h4>
            <div className="d-flex align-items-center">
                <div className="d-flex align-items-center mr-4">
                    <span>Brands:</span>
                    <span className="ml-2">{product.brand}</span>
                </div>

                <Rating name="read-only" value={Number(product?.rating) || 0} size="small" precision={0.5} readOnly />
            </div>

            <hr />
            <div className="row mt-2 productDetaileModal">
                <div className="col-md-5">
                    <ProductZoom product={product}/>


                </div>
                <div className='col-md-7'>
                    <div className='d-flex info align-items-center'>
                        <span className='oldPrice lg'>${product.oldPrice}</span>
                        <span className='netPrice text-danger lg'>${product.price}</span>
                    </div>
                    {product.countInStock > 0 ? (
  <span className="badge bg-success text-white">IN STOCK</span>
) : (
  <span className="badge bg-danger text-white">OUT STOCK</span>
)}
                    <p className="mt-3">{product.description}</p>
                    <div className='d-flex align-items-center'>
                        <QuantityBox product={product}/>

                        <Button className='btn-blue btn-lg btn-big btn-round'>Add to Cart</Button>

                        
                    </div>
                    <div className='d-flex align-items-center mt-4 actions'>
  <Button onClick={() => addToMyList(product)} className='btn-round btn-sml' variant="outlined">
    <IoIosHeartEmpty /> &nbsp; ADD TO WISHLIST
  </Button>
  <Button className='btn-round btn-sml ml-3' variant="outlined">
    <MdOutlineCompareArrows /> &nbsp; COMPARE
  </Button>
</div>
                </div>

            </div>

        </Dialog>
    )
}

export default ProductModal