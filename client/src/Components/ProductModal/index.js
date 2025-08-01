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
const ProductModal = (props) => {
   

    return (
        <Dialog open={true} className="productModal" onClose={() => props.closeProductModal()}>
            <Button className='close' onClick={() => props.closeProductModal()}><MdClose /></Button>
            <h4 className="mb-0">SIKASSO Woven Slip-on Loafer</h4>
            <div class="d-flex align-items-center">
                <div class="d-flex align-items-center mr-4">
                    <span>Brands:</span>
                    <span class="ml-2">Welch's</span>
                </div>

                <Rating name="read-only" value={5} size="small" precision={0.5} readOnly />
            </div>

            <hr />
            <div class="row mt-2 productDetaileModal">
                <div class="col-md-5">
                    <ProductZoom/>


                </div>
                <div className='col-md-7'>
                    <div className='d-flex info align-items-center'>
                        <span className='oldPrice lg'>$9.35</span>
                        <span className='netPrice text-danger lg'>$7.25</span>
                    </div>
                    <span className="badge bg-success text-white">IN STOCK</span>
                    <p className="mt-3">This season, we’ve riffed on our BOLAMA with this hand-woven loafer, the SIKASSO. I reach for these when I need a quick, slip-on style that
                        instantly pulls together my look. Brushed nubuck,
                        cushioned insole, and a soft interior allow for all-day wear
                        without sacrificing comfort. Made in Italy by our expert artisans, the SIKASSO is an elegant and easy style upgrade.</p>
                    <div className='d-flex align-items-center'>
                        <QuantityBox/>

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