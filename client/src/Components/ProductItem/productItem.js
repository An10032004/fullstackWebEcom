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
import { fetchDataFromApi, postData } from "../../utils/api";

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
    
    fetchDataFromApi(`/api/products/${isOpenProductModal.id}`).then((res) => {
        console.log(res)
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
    const {showAlert } = useContext(MyContext)
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
            <div className={`item productItem ${props.itemView}`} style={{ padding: "0 10px" }}
                onMouseEnter={handMouseOver}
                onMouseLeave={handMouseLeave}>
                <div className="imgWrapper">
                    <Link to={`/product/${props?.item?.id}`}>
                        {
                            
                                <img src={props.item?.images[0]} className="w-100" />
                        }
                    

                    </Link>

                    <span className="badge badge-primary">
                       {props?.item?.discount ? `${parseInt(props.item?.price * (1 - props?.item?.discount / 100))}%` : ""}
                    </span>

                    <div className="actions">
                        <Button onClick={() => ViewProductDetail(props.item?.id)}> <TfiFullscreen /></Button>
                        <Button> <IoMdHeartEmpty onClick={() => addToMyList(props.item)}/></Button>
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