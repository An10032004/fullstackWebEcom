import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button"
import { IoMdHeartEmpty } from "react-icons/io";
import { TfiFullscreen } from 'react-icons/tfi'
import { useContext, useEffect, useRef, useState } from "react";
import ProductModal from "../ProductModal";
// import ProductModal from "../ProductModal";
import Slider from 'react-slick'
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";

const ProductItem = (props) => {

      const [productData,setProductData] = useState()

    const {isOpenProductModal, setIsOpenProductModal } = useContext(MyContext);
    const ViewProductDetail = (id) => {
        setIsOpenProductModal({
            id:id,
            open:true
        })
    }
    useEffect(() => {
    window.scrollTo(0,0)
    fetchDataFromApi(`/api/products/${isOpenProductModal.id}`).then((res) => {
        setProductData(res)
    })
    },[isOpenProductModal])
    const closeProductModal = () => {
        setIsOpenProductModal({
            id: "",
        open: false
        })
    }

    const [isHover, setIsHover] = useState(false)

    const sliderRef = useRef()

    var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // để false, hover mới play
    arrows: false
}

    const handMouseOver = () => {
        setIsHover(true)
        setTimeout(() => {
            if (sliderRef.current) {
                sliderRef.current.slickPlay()
            }
        })
    }

    const handMouseLeave = () => {
        setIsHover(false)
        setTimeout(() => {
            if (sliderRef.current) {
                sliderRef.current.slickPause()
            }
        })
    }

    return (
        <>
            <div className={`item productItem ${props.itemView}`} style={{ padding: "0 10px" }}
                onMouseEnter={handMouseOver}
                onMouseLeave={handMouseLeave}>
                <div className="imgWrapper">
                    <Link to={`/product/${props?.item?.id}`}>
                        {
                            
                                <img src={`http://localhost:4000/uploads/${props.item?.images[0]}`} className="w-100" />
                        }
                    

                    </Link>

                    <span className="badge badge-primary">
                       {props?.item?.discount ? `${parseInt(props.item?.price * (1 - props?.item?.discount / 100))}%` : ""}
                    </span>

                    <div className="actions">
                        <Button onClick={() => ViewProductDetail(props.item?.id)}> <TfiFullscreen /></Button>
                        <Button> <IoMdHeartEmpty /></Button>
                    </div>
                </div>
                <div className="info">
                    <h4>{props.item?.name?.substr(0, 30) + '...'}</h4>
                    <span className={props.item?.countInStock > 0 ? "text-success" : "text-danger"}>
                        {props.item?.countInStock > 0 ? "In Stock" : "Out Stock"}
                    </span>

                    <Rating className="mt-2 mb-2" name="read-only" value={props?.item?.rating} readOnly size="small" precision={0.5} />
                    <div className="">
                        <span className="oldPrice">{props.item?.oldPrice}</span>
                        <span className="netPrice text-danger ml-2">{props.item?.price}</span>
                    </div>
                </div>
            </div>

            {
    isOpenProductModal.open && (
        <ProductModal open={isOpenProductModal.open} 
            closeProductModal={closeProductModal}
            product={productData}   />
    )
}
            {/* <ProductModal/> */}
        </>
    )
}

export default ProductItem