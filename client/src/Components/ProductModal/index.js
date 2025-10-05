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

const ProductModal = ({ open, closeProductModal ,product}) => {
    if (!product) return null;
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
  <Button className='btn-round btn-sml' variant="outlined">
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