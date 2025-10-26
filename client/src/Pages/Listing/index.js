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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9); // số sản phẩm mỗi trang

  const openDropDowm = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { id } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [product, setProduct] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 60000]);

  // ✅ Lấy sản phẩm (tự động khi thay đổi filter, query hoặc category)
  useEffect(() => {
    let apiUrl = "";

    if (id) {
      apiUrl = `/api/products/category/${id}?min=${priceRange[0]}&max=${priceRange[1]}`;
      if (selectedCategories.length > 0)
        apiUrl += `&categories=${selectedCategories.join(",")}`;
      if (selectedBrands.length > 0)
        apiUrl += `&brands=${selectedBrands.join(",")}`;
      if (query && query.trim() !== "")
        apiUrl += `&q=${encodeURIComponent(query)}`;
    } else if (query) {
      // search toàn site
      apiUrl = `/api/search?q=${encodeURIComponent(query)}&min=${priceRange[0]}&max=${priceRange[1]}`;
      if (selectedCategories.length > 0)
        apiUrl += `&categories=${selectedCategories.join(",")}`;
      if (selectedBrands.length > 0)
        apiUrl += `&brands=${selectedBrands.join(",")}`;
    }

    if (apiUrl) {
      fetchDataFromApi(apiUrl).then((res) => {
        setProduct(res.productList || res || []);
        setPage(1); // reset về trang đầu
      });
    }
  }, [id, query, selectedCategories, selectedBrands, priceRange]);

  // ✅ Lấy danh sách brand
  useEffect(() => {
    fetchDataFromApi(`/api/products/allProduct`).then((res) => {
      const products = res.productList || [];
      const uniqueBrands = [...new Set(products.map((p) => p.brand))];
      setBrands(uniqueBrands);
    });
  }, []);

  // ✅ Lấy danh mục
  useEffect(() => {
    fetchDataFromApi(`/api/category`).then((res) => {
      setCategories(res.categoryList || []);
    });
  }, []);

  // ✅ Xử lý lọc
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

  // ✅ Phân trang frontend
  const totalPages = Math.ceil(product.length / limit);
  const paginatedProducts = product.slice((page - 1) * limit, page * limit);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <section className="product_Listing_Page">
      <div className="container-fluid" style={{ marginLeft: "70px" }}>
        <div className="productlisting d-flex">
          {/* Sidebar lọc */}
          <Sidebar
            item={categories}
            item2={brands}
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
                  Show {limit} <FaAngleDown />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openDropDowm}
                  onClose={handleClose}
                >
                  {[9, 12, 15, 18].map((num) => (
                    <MenuItem
                      key={num}
                      onClick={() => {
                        setLimit(num);
                        setPage(1);
                        handleClose();
                      }}
                    >
                      {num}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            <div className="productlisting">
              {paginatedProducts?.length > 0 ? (
                paginatedProducts.map((item, index) => (
                  <ProductItem key={index} itemView={productView} item={item} />
                ))
              ) : (
                <p className="text-center w-100 mt-4">No products found.</p>
              )}
            </div>

            {/* ✅ Pagination */}
            <div className="d-flex align-items-center justify-content-center mt-3">
              <Pagination
                count={totalPages}
                color="primary"
                size="large"
                page={page}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listing;
