import { IoIosArrowRoundForward, IoMdMailOpen } from "react-icons/io";
import { FaStar, FaShoppingBag, FaTags } from "react-icons/fa";
import HomeBanner from "../../Components/HomeBanner";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Button from "@mui/material/Button";
import ProductItem from "../../Components/ProductItem/productItem";
import HomeCat from "../../Components/HomeCat";
import { fetchDataFromApi } from "../../utils/api";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./home.css";

const Home = () => {
  var productSliderOptions = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  const [catData, setCatData] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [product, setProduct] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      const categories = res.categoryList || [];
      setCatData(categories);
      if (categories.length > 0) setSelectedCategory(categories[0].name);
    });

    fetchDataFromApi(`/api/products/featured`).then((item) => setFeaturedProduct(item));
    fetchDataFromApi(`/api/products/allProduct?page=1`).then((item) => {
      setProduct(item.productList);
    });
  }, []);

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
    const categoryName = catData[newValue].name;
    setSelectedCategory(categoryName);
  };

  return (
    <>
      <HomeBanner />
      {catData?.length !== 0 && <HomeCat catData={catData} />}

      {/* BEST PRODUCTS */}
      <section className="homeProducts section-spacing">
        <div className="section-title">
          <FaStar className="icon" />
          <h2>Best Products</h2>
          <p>Discover our most loved products by our community</p>
        </div>
        <div className="container-fluid">
          <Slider {...productSliderOptions}>
            {featuredProduct?.map((item, index) => (
              <ProductItem key={index} item={item} />
            ))}
          </Slider>
        </div>

        <div className="bannerSec">
  <div className="banner">
    <img src="https://img.freepik.com/free-vector/sale-banner-template_23-2148897322.jpg" alt="Sale" />
    <div className="text">Big Sale - Up to 50% Off</div>
  </div>
</div>
      </section>

      {/* NEW PRODUCTS */}
      <section className="homeProducts section-spacing">
        <div className="section-title">
          <FaShoppingBag className="icon" />
          <h2>New Arrivals</h2>
          <p>Check out the latest items just added to our store</p>
        </div>
        <div className="container-fluid row">
          {product?.map((item, index) => (
            <div className="col-md-3" key={index}>
              <ProductItem item={item} />
            </div>
          ))}
        </div>

        <div className="bannerSec">
  <div className="banner">
    <img src="https://img.freepik.com/free-vector/new-arrival-banner-template_1361-1754.jpg" alt="New Arrivals" />
    <div className="text">New Arrivals - Fresh Styles</div>
  </div>
</div>

      </section>

      {/* CATEGORY PRODUCTS */}
      <section className="homeProducts section-spacing">
        <div className="section-title">
          <FaTags className="icon" />
          <h2>{selectedCategory ? `${selectedCategory} Products` : "Products"}</h2>
          <p>Explore our product collections by category</p>
        </div>
        <div className="container-fluid">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            className="category-tabs"
          >
            {catData?.map((item, index) => (
              <Tab key={index} label={item.name} />
            ))}
          </Tabs>

          <div className="row mt-4">
            {productCategory?.map((item, index) => (
              <div className="col-md-3" key={index}>
                <ProductItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Giới thiệu thay cho 2 banner cũ */}
      <section className="aboutSection">
        <div className="container text-center">
          <h2>Why Choose Us?</h2>
          <p>Quality. Trust. Innovation. These are the pillars of our brand.</p>
          <div className="feature-cards">
            <div className="card">
              <FaStar />
              <h5>Top Rated Products</h5>
              <p>We handpick only the best for our customers.</p>
            </div>
            <div className="card">
              <FaShoppingBag />
              <h5>Fast Delivery</h5>
              <p>Get your products delivered swiftly and safely.</p>
            </div>
            <div className="card">
              <FaTags />
              <h5>Exclusive Discounts</h5>
              <p>Enjoy special offers all year round.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletterSection mt-3 mb-3 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white">20$ discount for your first order</p>
              <h4 className="text-white">Join our newsletter and get ...</h4>
              <p className="text-light">
                Join our email subscription now to get updates on promotions and coupons.
              </p>
              <form>
                <IoMdMailOpen />
                <input type="text" placeholder="Your Email Address" />
                <Button>Subscribe</Button>
              </form>
            </div>
            <div className="col-md-6">
              <img
                alt=""
                src="https://fullstack-ecommerce.netlify.app/static/media/newsletter.5931358dd220a40019fc.png"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
