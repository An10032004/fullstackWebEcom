import { IoIosArrowRoundForward, IoMdMailOpen } from "react-icons/io"
import HomeBanner from "../../Components/HomeBanner"

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Button from "@mui/material/Button"
import ProductItem from "../../Components/ProductItem/productItem";
import HomeCat from "../../Components/HomeCat";
import { fetchDataFromApi } from "../../utils/api";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
const Home = () => {
    var productSliderOptions = {

        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
    }
    const [catData, setCatData] = useState([])
    const [featuredProduct, setFeaturedProduct] = useState([])
    const [product, setProduct] = useState([])
    const [productCategory, setProductCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState();
    useEffect(() => {
        fetchDataFromApi("/api/category").then((res) => {
const categories = res.categoryList || [];
console.log(res)
        setCatData(categories);

        // nếu có ít nhất 1 category thì mặc định chọn category đầu tiên
        if (categories.length > 0) {
            setSelectedCategory(categories[0].name);
        }
        })

        fetchDataFromApi(`/api/products/featured`).then((item) => {
            setFeaturedProduct(item)
        })

        fetchDataFromApi(`/api/products/allProduct?page=1`).then((item) => {
            const item2 = item.productList
            setProduct(item2)
        })
        // fetchDataFromApi(`/api/products/category/name/PC?page=1`).then((item) => {
        //     console.log(item)
        //     const item2 = item.productList
        //     setProductCategory(item2)
        // })
    }, [])

    useEffect(() => {
        if (selectedCategory) {
            fetchDataFromApi(`/api/products/category/name/${selectedCategory}?page=1`).then((item) => {
                setProductCategory(item.productList || []);
            });
        }
        
    }, [selectedCategory]);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const categoryName = catData[newValue].name; // lấy name category
        setSelectedCategory(categoryName);
    };
    return (
        <>
            <HomeBanner />
            {
                catData?.length !== 0 && <HomeCat catData={catData} />
            }

            <section className="homeProducts">
                <div className="container-fluid">
                    <div className="row">
                        {/* Cột trái: Sticky */}
                        <div className="col-md-3" style={{ maxHeight: 1700 }}>
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
                                        <h3 className="mb-0 hd">BEST PRODUCTS</h3>
                                        <p className="text-sml">Do not miss the current offer...</p>
                                    </div>
                                </div>
                                <Button className="viewAllBtn">
                                    View All <IoIosArrowRoundForward />
                                </Button>
                                <div className="product_row w-100">
                                    <Slider {...productSliderOptions}>
                                        {
                                            featuredProduct?.length !== 0 && featuredProduct?.map((item, index) => {
                                                return (
                                                    <ProductItem item={item} />
                                                )
                                            })
                                        }

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
                                    {product?.length !== 0 && product?.map((item, index) => (
                                        <div className="col-md-3" key={index}>
                                            <ProductItem item={item} />
                                        </div>
                                    ))}
                                </div>


                            </div>

                            {/* <div className="section-block mt-5">
                                <div className="d-flex align-items-center">
                                    <div className="info w-75">
                                        <h3 className="mb-0 hd">PC PRODUCTS</h3>
                                        <p className="text-sml">Check out the feature Category items...</p>
                                    </div>
                                </div>
                                <Button className="viewAllBtn">
                                    View All <IoIosArrowRoundForward />
                                </Button>
                                <div className="product_row row w-100">
                                    {productCategory?.length !== 0 && productCategory?.map((item, index) => (
                                        <div className="col-md-3" key={index}>
                                            <ProductItem item={item} />
                                        </div>
                                    ))}
                                </div>


                            </div> */}

                            <div className="section-block mt-5">
                                <div className="d-flex align-items-center">
                                    <div className="info w-75">
                                        <h3 className="mb-0 hd">
                                            {selectedCategory ? `${selectedCategory} Products` : "PRODUCTS"}
                                        </h3>
                                        <p className="text-sml">Check out the feature Category items...</p>
                                    </div>
                                    <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    aria-label="scrollable auto tabs example"
                                >
                                    {
                                        catData?.map((item,index) => {
                                            return (
                                                <Tab label={item.name}></Tab>
                                            )
                                        })
                                    }
                                </Tabs>
                                </div>
                                
                                <div className="product_row row w-100">
                                    {productCategory?.length !== 0 && productCategory?.map((item, index) => (
                                        <div className="col-md-3" key={index}>
                                            <ProductItem item={item} />
                                        </div>
                                    ))}
                                </div>


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

            </section>

            <section className="newsletterSection mt-3 mb-3 d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <p className="text-white">20$ discount for your first order</p>
                            <h4 className="text-white">Join our newsletter and get ...</h4>
                            <p className="text-light">Join our email subscription now to get
                                updates on <br />  promotions and coupons</p>

                            <form>
                                <IoMdMailOpen />
                                <input type="text" placeholder="Your Email Address" />
                                <Button> Subscribe</Button>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <img alt="" src="https://fullstack-ecommerce.netlify.app/static/media/newsletter.5931358dd220a40019fc.png" />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Home