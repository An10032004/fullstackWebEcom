import Button from "@mui/material/Button"
import {IoIosArrowRoundForward} from "react-icons/io"
import Slider from "react-slick"
import ProductItem from "../../../Components/ProductItem/productItem"


const RelatedProducts = () => {
    var productSliderOptions = {

        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
    }
    return(
        <>
        <div className="col-md-9 productRow" style={{maxWidth:'100%'}}>
                            {/* BEST SELLERS */}
                            <div className="section-block">
                                <div className="d-flex align-items-center">
                                    <div className="info w-75">
                                        <h3 className="mb-0 hd">RELATED PRODUCTS</h3>
                                    </div>
                                </div>
                                <Button className="viewAllBtn">
                                    View All <IoIosArrowRoundForward />
                                </Button>
                                <div className="product_row w-100">
                                    <Slider {...productSliderOptions}>
                                        <ProductItem />
                                        <ProductItem />
                                        <ProductItem />
                                        <ProductItem />
                                        <ProductItem />
                                        <ProductItem />
                                        <ProductItem />
                                    </Slider>
                                </div>
                            </div>

                            {/* NEW PRODUCTS */}
                           
                        </div>
        </>
    )
}

export default RelatedProducts