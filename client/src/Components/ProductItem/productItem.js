import Rating from "@mui/material/Rating";
import  Button  from "@mui/material/Button"
import { IoMdHeartEmpty } from "react-icons/io";
import  {TfiFullscreen} from 'react-icons/tfi'
import { useState } from "react";
import ProductModal from "../ProductModal";
// import ProductModal from "../ProductModal";
const ProductItem = (props) => {
    const [isOpenProductModal,setIsOpenProductModal] = useState(false)
    const ViewProductDetail = (id) => {
        setIsOpenProductModal(true)
    }

    const closeProductModal = () => {
        setIsOpenProductModal(false)
    }
    return (
        <>
            <div className={`item productItem ${props.itemView}`} style={{ padding: "0 10px" }}>
                <div className="imgWrapper">
                    <img alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVzOMB7DvEUz9KRUjFtKPQFN1JJ_CaPP9vGw&s" className="w-100" />

                    <span className="badge badge-primary">
                        28%
                    </span>

                    <div className="actions">
                        <Button onClick={() => ViewProductDetail(1)}> <TfiFullscreen/></Button>
                        <Button> <IoMdHeartEmpty/></Button>
                    </div>
                </div>
                <div className="info">
                    <h4>T-Shirt</h4>
                    <span className="text-success">In Stock</span>
                    <Rating className="mt-2 mb-2" name="read-only" value={5} readOnly size="small" precision={0.5} />
                    <div className="">
                        <span className="oldPrice">$20.20</span>
                        <span className="netPrice text-danger ml-2">$14.20</span>
                    </div>
                </div>
            </div>

            {
                isOpenProductModal === true && <ProductModal closeProductModal={closeProductModal}/>
            }
            {/* <ProductModal/> */}
        </>
    )
}

export default ProductItem