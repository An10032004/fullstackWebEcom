import React, { useContext, useEffect, useState } from "react";
import DashboardBox from "../DashboardCard/DashboardBox";
import { FaUserCircle, FaEye, FaPencilAlt } from "react-icons/fa";
import { IoMdCart, IoIosTimer } from "react-icons/io";
import { MdShoppingBag, MdDelete } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import { HiDotsVertical } from "react-icons/hi";
import { Chart } from "react-google-charts";
import {
  Menu,
  MenuItem,
  Select,
  FormControl,
  Button,
  Rating,
  styled,
  Chip,
  Pagination,
} from "@mui/material";
import { emphasize } from "@mui/material/styles";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": { backgroundColor: emphasize(backgroundColor, 0.06) },
    "&:active": { boxShadow: theme.shadows[1], backgroundColor: emphasize(backgroundColor, 0.12) },
  };
});

const Dashboard = () => {
  const context = useContext(MyContext);
  const { stats, countUser } = context;

  const [anchorEl, setAnchorEl] = useState(null);
  const [showBy, setShowBy] = useState("");
  const [catBy, setCatBy] = useState("");
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1, totalResults: 0 });

  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;

  useEffect(() => {
    context.setIsHideSidebarAndHeader(false);
    window.scrollTo(0, 0);
    fetchProducts(1);
  }, []);

  useEffect(() => {
    fetchProducts(1); // reload when filter changes
  }, [showBy, catBy]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const fetchProducts = async (page = 3) => {
    let query = `/api/products/get/by?page=${page}`;
    if (showBy) query += `&showBy=${showBy}`;
    if (catBy) query += `&catBy=${catBy}`;
    const res = await fetchDataFromApi(query);
    setProductList(res.productList || []);
    setPagination({
      totalPages: res.totalPages || 1,
      currentPage: res.currentPage || 1,
      totalResults: res.totalResults || 0,
    });
  };

  const handleChangePage = (event, value) => {
    fetchProducts(value);
  };

  const deleteProduct = async (id) => {
    await deleteData(`/api/products/${id}`);
    fetchProducts(pagination.currentPage);
  };

  // Chart Data
  const chartData = [
    ["Category", "Count"],
    ["Users", countUser || 0],
    ["Orders", stats?.totalOrders || 0],
    ["Products", stats?.totalProducts || 0],
    ["Featured", stats?.totalFeatured || 0],
  ];
  const chartOptions = { backgroundColor: "transparent", chartArea: { width: "100%", height: "100%" } };

  return (
    <div className="right-content w-100">
      {/* Dashboard Boxes */}
      <div className="row dashboard-box-wrapper-row">
        <div className="col-md-8">
          <div className="dashboard-box-wrapper d-flex">
            <DashboardBox color={["#1da256", "#48d483"]} icon={<FaUserCircle />} grow={true} />
            <DashboardBox color={["#c012e2", "#eb64fe"]} icon={<IoMdCart />} />
            <DashboardBox color={["#2c78e5", "#60aff5"]} icon={<MdShoppingBag />} />
            <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<GiStarsStack />} />
          </div>
        </div>
        <div className="col-md-4 pl-0 top-part2">
          <div className="box grapg-box">
            <div className="d-flex align-items-center w-100 bottom-ele">
              <h6 className="text-white mb-0 mt-0">Total OverView</h6>
              <div className="ml-auto">
                <span className="ml-auto toggle-icons" onClick={handleClick}>
                  <HiDotsVertical />
                </span>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{ "aria-labelledby": "long-button" }}
                  slotProps={{ paper: { style: { maxHeight: ITEM_HEIGHT * 4.5, width: "20ch" } } }}
                >
                  <MenuItem onClick={handleClose}><IoIosTimer /> Last Day</MenuItem>
                  <MenuItem onClick={handleClose}><IoIosTimer /> Last Week</MenuItem>
                  <MenuItem onClick={handleClose}><IoIosTimer /> Last Month</MenuItem>
                  <MenuItem onClick={handleClose}><IoIosTimer /> Last Year</MenuItem>
                </Menu>
              </div>
            </div>
            <p>OverView in last month</p>
            <Chart chartType="PieChart" data={chartData} options={chartOptions} width="100%" height="200px" />
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="card shadow border-0 p-3 mt-4">
        <h3 className="headign-text">Best selling Products</h3>
        <div className="row card-filters mt-3">
          <div className="col-md-3">
            <h4>SHOW BY</h4>
            <FormControl className="w-100" size="small">
              <Select value={showBy} onChange={(e) => setShowBy(e.target.value)} displayEmpty>
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="feature">Featured</MenuItem>
                <MenuItem value="notFeature">Not Featured</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-md-3">
            <h4>CATEGORY BY</h4>
            <FormControl className="w-100" size="small">
              <Select value={catBy} onChange={(e) => setCatBy(e.target.value)} displayEmpty>
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="priceAsc">Price Low to High</MenuItem>
                <MenuItem value="priceDesc">Price High to Low</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-bordered v-align">
            <thead className="thead-dark">
              <tr>
                <th>UID</th>
                <th>Product</th>
                <th>Category</th>
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
              {productList.length > 0 &&
                productList.map((item, idx) => (
                  <tr key={item._id}>
                    <td>#{idx + 1}</td>
                    <td>
                      <div className="d-flex align-items-center product-box">
                        <div className="img-wrapper">
                          <img src={item.images[0]} alt="product" className="w-100" />
                        </div>
                        <div className="info pl-0">
                          <h6>{item.name}</h6>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>{item.category?.name}</td>
                    <td>{item.brand}</td>
                    <td>
                      <del className="old-price">${item.oldPrice}</del>{" "}
                      <span className="new-price text-danger">${item.price}</span>
                    </td>
                    <td>{item.countInStock}</td>
                    <td>
                      <Rating name="read-only" defaultValue={item.rating} precision={0.5} size="small" readOnly />
                    </td>
                    <td>{format(new Date(item.dateCreated), "dd/MM/yyyy")}</td>
                    <td style={{ color: item.isFeatured ? "green" : "red", fontWeight: "bold" }}>
                      {item.isFeatured ? "Featured" : "Not Featured"}
                    </td>
                    <td>
                      <div className="actions d-flex align-items-center">
                        <Link to={`/product/details/${item._id}`}><Button color="secondary"><FaEye /></Button></Link>
                        <Link to={`/product/edit/${item._id}`}><Button className="success"><FaPencilAlt /></Button></Link>
                        <Button color="error" onClick={() => deleteProduct(item._id)}><MdDelete /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex table-footer justify-content-between align-items-center mt-2">
            <p>Showing <b>{productList.length}</b> of <b>{pagination.totalResults}</b> results</p>
            <Pagination
              count={pagination.totalPages}
              page={pagination.currentPage}
              color="primary"
              showFirstButton
              showLastButton
              onChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
