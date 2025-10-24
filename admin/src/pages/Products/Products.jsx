import React, { useContext, useEffect, useState } from "react";
import { emphasize, Rating, styled } from "@mui/material";
import { Breadcrumbs, Chip, FormControl, Select, MenuItem, Button, Pagination } from "@mui/material";
import { MdHome, MdExpandLess, MdShoppingBag, MdDelete } from "react-icons/md";
import { FaUserCircle, FaEye, FaPencilAlt } from "react-icons/fa";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { IoMdCart } from "react-icons/io";
import { Link } from "react-router-dom";
import { fetchDataFromApi, deleteData } from "../../utils/api";
import { MyContext } from "../../App";
import { format } from "date-fns";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": { backgroundColor: emphasize(backgroundColor, 0.06) },
    "&:active": { boxShadow: theme.shadows[1], backgroundColor: emphasize(backgroundColor, 0.12) },
  };
});

const Products = () => {
  const context = useContext(MyContext);
  const { stats } = context;

  const [catData, setCatData] = useState([]);
  const [showBy, setShowBy] = useState(""); // feature / notFeature
  const [catBy, setCatBy] = useState(""); // priceAsc / priceDesc
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1, totalResults: 0 });

  // Load categories
  useEffect(() => {
    fetchDataFromApi("/api/category?all=true").then((res) => setCatData(res));
  }, []);

  // Load products with filter + pagination
  const fetchProducts = (page = 1) => {
    let query = `/api/products/get/by?page=${page}`;
    if (showBy) query += `&showBy=${showBy}`;
    if (catBy) query += `&catBy=${catBy}`;

    fetchDataFromApi(query).then((res) => {
      setProductList(res.productList || []);
      setPagination({
        totalPages: res.totalPages || 1,
        currentPage: res.currentPage || 1,
        totalResults: res.totalResults || 0,
      });
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [showBy, catBy]);

  const handleDelete = (id) => {
    deleteData(`/api/products/${id}`).then(() => fetchProducts(pagination.currentPage));
  };

  const handlePageChange = (event, value) => {
    fetchProducts(value);
  };

  return (
    <div className="right-content w-100">
      {/* Breadcrumb */}
      <div className="card shadow border-0 w-100 flex-row p-4">
        <h5 className="mb-0">Product List</h5>
        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
          <StyledBreadcrumb component="a" href="#" label="Dashboard" icon={<MdHome fontSize="small" />} />
          <StyledBreadcrumb label="Products" deleteIcon={<MdExpandLess />} />
        </Breadcrumbs>
      </div>

      {/* Stats */}
      <div className="row dashboard-box-wrapper-row dashboard-box-wrapper-row-v2">
        <div className="col-md-12">
          <div className="dashboard-box-wrapper d-flex">
            <button className="dashboard-box" style={{ backgroundImage: "linear-gradient(to right, rgb(29, 162, 86), rgb(72, 212, 131))" }}>
              <span className="chart"><TrendingUpIcon /></span>
              <div className="d-flex w-100">
                <div className="col1">
                  <h4 className="text-white mb-0">Total Products</h4>
                  <span className="text-white">{stats.totalProducts}</span>
                </div>
                <div className="ml-auto"><FaUserCircle /></div>
              </div>
            </button>
            <button className="dashboard-box" style={{ backgroundImage: "linear-gradient(to right, rgb(192, 18, 226), rgb(235, 100, 254))" }}>
              <span className="chart"><TrendingDownIcon /></span>
              <div className="d-flex w-100">
                <div className="col1">
                  <h4 className="text-white mb-0">Total Price</h4>
                  <span className="text-white">{stats.totalPrice}</span>
                </div>
                <div className="ml-auto"><IoMdCart /></div>
              </div>
            </button>
            <button className="dashboard-box" style={{ backgroundImage: "linear-gradient(to right, rgb(44, 120, 229), rgb(96, 175, 245))" }}>
              <span className="chart"><TrendingDownIcon /></span>
              <div className="d-flex w-100">
                <div className="col1">
                  <h4 className="text-white mb-0">Total Feature</h4>
                  <span className="text-white">{stats.totalFeatured}</span>
                </div>
                <div className="ml-auto"><MdShoppingBag /></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card shadow border-0 p-3 mt-4">
        <h3 className="headign-text">Best Selling Products</h3>
        <div className="row card-filters mt-3">
          <div className="col-md-3">
            <h4>SHOW BY</h4>
            <FormControl className="w-100" size="small">
              <Select value={showBy} onChange={(e) => setShowBy(e.target.value)}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="feature">Featured</MenuItem>
                <MenuItem value="notFeature">Not Featured</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-md-3">
            <h4>CATEGORY BY</h4>
            <FormControl className="w-100" size="small">
              <Select value={catBy} onChange={(e) => setCatBy(e.target.value)}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="priceAsc">Price Low → High</MenuItem>
                <MenuItem value="priceDesc">Price High → Low</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Product Table */}
        <div className="table-responsive mt-3">
          <table className="table table-bordered v-align">
            <thead className="thead-dark">
              <tr>
                <th>UID</th>
                <th>Product</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>CreatedAt</th>
                <th>Feature</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productList?.map((item, index) => (
                <tr key={item.id || item._id}>
                  <td>#{index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center product-box">
                      <div className="img-wrapper">
                        <div className="img"><img src={item.images[0]} alt="images" className="w-100" /></div>
                      </div>
                      <div className="info pl-0">
                        <h6>{item.name}</h6>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>{item.category?.name}</td>
                  <td>{item.subCategory}</td>
                  <td>{item.brand}</td>
                  <td><del className="old-price">${item.oldPrice}</del> <span className="new-price text-danger">${item.price}</span></td>
                  <td>{item.countInStock}</td>
                  <td><Rating name="read-only" value={Number(item.rating) || 0} precision={0.5} size="small" readOnly /></td>
                  <td>{format(new Date(item.dateCreated), "dd/MM/yyyy")}</td>
                  <td style={{ color: item.isFeatured ? "green" : "red", fontWeight: "bold" }}>{item.isFeatured ? "Featured" : "Not Featured"}</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Link to={`/product/details/${item.id || item._id}`}><Button color="secondary"><FaEye /></Button></Link>
                      <Link to={`/product/edit/${item.id || item._id}`}><Button color="success"><FaPencilAlt /></Button></Link>
                      <Button color="error" onClick={() => handleDelete(item._id)}><MdDelete /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex table-footer">
            <p>Showing <b>{productList.length}</b> of <b>{pagination.totalResults}</b> results</p>
            <Pagination
              count={pagination.totalPages}
              color="primary"
              showFirstButton
              showLastButton
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
