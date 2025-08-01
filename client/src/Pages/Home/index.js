import { IoIosArrowRoundForward, IoMdMailOpen } from "react-icons/io"
import HomeBanner from "../../Components/HomeBanner"

import React from "react";
import Slider from "react-slick";
import Button from "@mui/material/Button"
import ProductItem from "../../Components/ProductItem/productItem";
import HomeCat from "../../Components/HomeCat";
const Home = () => {
    var productSliderOptions = {

        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
    }
    return (
        <>
            <HomeBanner />
            <HomeCat />
            <section className="homeProducts">
                <div className="container-fluid">
                    <div className="row">
                        {/* Cột trái: Sticky */}
                        <div className="col-md-3" style={{maxHeight:1700}}>
                            <div className="sticky">
                            <div className="banner banner1">
                                    <img alt="" src="    https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ7JgwZsUjGTa_wUoah7DyRgjxAOG7FY-0GA&s" className="cursor w-100" />
                                </div>
                            
                                
                                
                                <div className="banner banner2 mt-3">
                                    <img alt="" src="    https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ7JgwZsUjGTa_wUoah7DyRgjxAOG7FY-0GA&s" className="cursor w-100" />
                                </div>
                            </div>
                        </div>

                        {/* Cột phải: Cả best seller và new product */}
                        <div className="col-md-9 productRow">
                            {/* BEST SELLERS */}
                            <div className="section-block">
                                <div className="d-flex align-items-center">
                                    <div className="info w-75">
                                        <h3 className="mb-0 hd">BEST SELLERS</h3>
                                        <p className="text-sml">Do not miss the current offer...</p>
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
                                    </Slider>
                                </div>
                            </div>

                            {/* NEW PRODUCTS */}
                            <div className="section-block mt-5">
                                <div className="d-flex align-items-center">
                                    <div className="info w-75">
                                        <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                                        <p className="text-sml">Check out the latest items...</p>
                                    </div>
                                </div>
                                <Button className="viewAllBtn">
                                    View All <IoIosArrowRoundForward />
                                </Button>
                                <div className="product_row row w-100">
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <div className="col-md-3" key={i}>
                                            <ProductItem />
                                        </div>
                                    ))}
                                </div>

                                <div className="d-flex mt-4 mb-5 bannerSec">
                                    <div className="banner w-50 pr-2">
                                        <img alt="" src="    https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWZGvvr6pvaleq0j4qTzqbwb_yCJKoV5cJWQ&s" className="cursor w-100" />
                                    </div>
                                    <div className="banner w-50 pl-2">
                                        <img alt="" src="    https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWZGvvr6pvaleq0j4qTzqbwb_yCJKoV5cJWQ&s" className="cursor w-100" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section className="newsletterSection mt-3 mb-3 d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                                    <p className="text-white">20$ discount for your first order</p>
                                    <h4 className="text-white">Join our newsletter and get ...</h4>
                                    <p className="text-light">Join our email subscription now to get
                                       updates on <br/>  promotions and coupons</p>

                                      <form>
                                        <IoMdMailOpen/>
                                        <input type="text" placeholder="Your Email Address"/>
                                        <Button> Subscribe</Button>
                                        </form> 
                        </div>
                        <div className="col-md-6">
                            <img alt="" src="https://fullstack-ecommerce.netlify.app/static/media/newsletter.5931358dd220a40019fc.png"/>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Home