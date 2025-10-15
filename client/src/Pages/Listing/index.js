import Sidebar from "../../Components/Sidebar";
import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { HiViewGrid } from "react-icons/hi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import ProductItem from "../../Components/ProductItem/productItem";
import Pagination from "@mui/material/Pagination";
import { useParams, useLocation } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";

const Listing = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView, setProductView] = useState("four");
  const openDropDowm = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { id } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q"); // 🔍 lấy query search

  const [product, setProduct] = useState([]);
  const [product2, setProduct2] = useState([]);
  const [cat, setCat] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 60000]);

  // ✅ Lấy sản phẩm theo search hoặc theo category
  useEffect(() => {
    let apiUrl = "";

    if (query) {
      // 🔍 Search mode
      apiUrl = `/api/search?q=${encodeURIComponent(query)}`;
    } else if (id) {
      // 🏷 Category mode
      apiUrl = `/api/products/category/${id}?min=${priceRange[0]}&max=${priceRange[1]}`;
      if (selectedCategories.length > 0) {
        apiUrl += `&categories=${selectedCategories.join(",")}`;
      }
      if (selectedBrands.length > 0) {
        apiUrl += `&brands=${selectedBrands.join(",")}`;
      }
    }

    if (apiUrl) {
      fetchDataFromApi(apiUrl).then((res) => {
        setProduct(res.productList || res || []);
      });
    }
  }, [id, query, selectedCategories, selectedBrands, priceRange]);

  // ✅ Lấy danh sách brand duy nhất
  useEffect(() => {
    fetchDataFromApi(`/api/products/allProduct`).then((res) => {
      const products = res.productList || [];
      const uniqueBrands = [...new Set(products.map((p) => p.brand))];
      setProduct2(uniqueBrands);
    });
  }, []);

  // ✅ Lấy danh mục
  useEffect(() => {
    fetchDataFromApi(`/api/category`).then((res) => {
      setCat(res.categoryList || []);
    });
  }, []);

  const handleCategoryChange = (name, checked) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, name] : prev.filter((c) => c !== name)
    );
  };

  const handleBrandChange = (brand, checked) => {
    setSelectedBrands((prev) =>
      checked ? [...prev, brand] : prev.filter((b) => b !== brand)
    );
  };

  return (
    <>
      <section className="product_Listing_Page">
        <div className="container-fluid" style={{ marginLeft: "70px" }}>
          <div className="productlisting d-flex">
            
              <Sidebar
                item={cat}
                item2={product2}
                onCategoryChange={handleCategoryChange}
                onBrandChange={handleBrandChange}
                onPriceChange={setPriceRange}
              />
            

            <div className="content_right">
              <img
                alt=""
                src="https://dosi-in.com/file/detailed/383/dosiin-261743836_268519555294775_3808784598501987694_n383300.jpg?w=1200&h=500&fit=crop&fm=webp"
                className="w-100"
                style={{ borderRadius: "8px" }}
              />

              <div className="showBy mt-3 mb-3 d-flex align-items-center">
                <div className="d-flex align-items-center btnWrapper">
                  <Button onClick={() => setProductView("one")}>
                    <IoIosMenu />
                  </Button>
                  <Button onClick={() => setProductView("two")}>
                    <HiViewGrid />
                  </Button>
                  <Button onClick={() => setProductView("four")}>
                    <TfiLayoutGrid4Alt />
                  </Button>
                  <Button onClick={() => setProductView("three")}>
                    <CgMenuGridR />
                  </Button>
                </div>
                <div className="ml-auto showByFilter">
                  <Button onClick={handleClick}>
                    Show 9 <FaAngleDown />
                  </Button>
                  <Menu
                    className="w-100 showPerPageDropdown"
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openDropDowm}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>11</MenuItem>
                    <MenuItem onClick={handleClose}>14</MenuItem>
                    <MenuItem onClick={handleClose}>15</MenuItem>
                  </Menu>
                </div>
              </div>

              <div className="productlisting">
                {product?.length > 0 ? (
                  product.map((item, index) => (
                    <ProductItem
                      key={index}
                      itemView={productView}
                      item={item}
                    />
                  ))
                ) : (
                  <p className="text-center w-100 mt-4">
                    No products found.
                  </p>
                )}
              </div>

              <div className="d-flex align-items-center justify-content-center">
                <Pagination count={10} color="primary" size="large" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Listing;
