import React, { useContext, useEffect, useState } from "react";
import DashboardBox from "../DashboardCard/DashboardBox";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosTimer } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { Chart } from "react-google-charts";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import skirt from "../../assets/images/skirt.png";
import Pagination from '@mui/material/Pagination';
import { MyContext } from "../../App";
import { emphasize, Rating, styled } from "@mui/material";
import { Breadcrumbs, Chip } from "@mui/material";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { format } from "date-fns";
import { Link } from "react-router-dom";


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
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const Dashboard = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [showBy, setShowBy] = useState('');
    const [catBy, setCatBy] = useState('');
    const [productList, setProductList] = useState([]);
  const [editField, setEditField] = useState({});
    const open = Boolean(anchorEl);
    
    const ITEM_HEIGHT = 48;

    const context = useContext(MyContext);

    useEffect(()=>{
        context.setIsHideSidebarAndHeader(false)

        window.scrollTo(0,0);
    },[]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Chart start
    const data = [
        ["Task", "Hours per Day"],
        ["Work", 8],
        ["Eat", 4],
        ["Commute", 5],
        ["Sleep", 8],
    ];

    const options = {
        'backgroundColor': 'transparent',
        'chartArea': { 'width': '100%', 'height': '100%' }
    }

    useEffect(() => {
    window.scrollTo(0, 0);

    fetchDataFromApi("/api/products").then((res) => {
      setProductList(res.productList || []);
      setEditField(res);
    });

    
  }, []);

  // Delete Product
  const deleteProduct = (id) => {
    deleteData(`/api/products/${id}`).then(() => {
      fetchDataFromApi("/api/products").then((res) => {
        setProductList(res.productList || []);
      });
    });
  };

  // Pagination
  const handleChange = (event, value) => {
    fetchDataFromApi(`/api/products?page=${value}`).then((res) => {
      setProductList(res.productList || []);
    });
  };


    return (
        <>
            <div className="right-content w-100">
                <div className="row dashboard-box-wrapper-row">
                    <div className="col-md-8">
                        <div className="dashboard-box-wrapper d-flex">
                            <DashboardBox color={["#1da256", "#48d483"]} icon={<FaUserCircle />}
                                grow={true} />
                            <DashboardBox color={["#c012e2", "#eb64fe"]} icon={<IoMdCart />} />
                            <DashboardBox color={["#2c78e5", "#60aff5"]} icon={<MdShoppingBag />} />
                            <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<GiStarsStack />} />
                        </div>
                    </div>
                    <div className="col-md-4 pl-0 top-part2">
                        <div className="box grapg-box">
                            <div className="d-flex align-items-center w-100 bottom-ele">
                                <h6 className="text-white mb-0 mt-0">Total Sales</h6>
                                <div className="ml-auto">
                                    <span className="ml-auto toggle-icons" onClick={handleClick}><HiDotsVertical /></span>
                                    <Menu
                                        className="dropdown-menus"
                                        MenuListProps={{
                                            'aria-labelledby': 'long-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        slotProps={{
                                            paper: {
                                                style: {
                                                    maxHeight: ITEM_HEIGHT * 4.5,
                                                    width: '20ch',
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer /> Last Day
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer /> Last Week
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer /> Last Month
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer /> Last Year
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            <h3 className="text-white font-weight-bold">$3,787,681.00</h3>
                            <p>$3,578.90 in last month</p>
                            <Chart
                                chartType="PieChart"
                                data={data}
                                options={options}
                                width={"100%"}
                                height="200px"
                            />
                        </div>
                    </div>
                </div>

                <div className="card shadow border-0 p-3 mt-4">
        <h3 className="headign-text">Best selling Products</h3>
        <div className="row card-filters mt-3">
          <div className="col-md-3">
            <h4>SHOW BY</h4>
            <FormControl className="w-100" size="small">
              <Select
                value={showBy}
                onChange={(e) => setShowBy(e.target.value)}
                displayEmpty
                className="w-100"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-md-3">
            <h4>CATEGORY BY</h4>
            <FormControl className="w-100" size="small">
              <Select
                value={catBy}
                onChange={(e) => setCatBy(e.target.value)}
                displayEmpty
                className="w-100"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
              {productList?.length > 0 &&
                productList.map((item, index) => (
                  <tr key={item._id}>
                    <td>#{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center product-box">
                        <div className="img-wrapper">
                          <div className="img">
                            <img
                              src={`${context.baseUrl}/uploads/${item.images[0]}`}
                              alt="images"
                              className="w-100"
                            />
                          </div>
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
                      <del className="old-price">${item.oldPrice}</del>
                      <span className="new-price text-danger">
                        ${item.price}
                      </span>
                    </td>
                    <td>{item.countInStock}</td>
                    <td>
                      <Rating
                        name="read-only"
                        defaultValue={item.rating}
                        precision={0.5}
                        size="small"
                        readOnly
                      />
                    </td>
                    <td>
                      {format(new Date(item.dateCreated), "dd/MM/yyyy")}
                    </td>
                    <td>
                      {item.isFeatured ? (
                        <span style={{ color: "green", fontWeight: "bold" }}>
                          Featured
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          Not Featured
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="actions d-flex align-items-center">
                        <Link to={`/product/details/${item._id}`}>
                          <Button color="secondary">
                            <FaEye />
                          </Button>
                        </Link>
                        <Button color="success">
                          <FaPencilAlt />
                        </Button>
                        <Button
                          color="error"
                          onClick={() => deleteProduct(item._id)}
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex table-footer">
            <p>
              showing <b>{productList.length}</b> of{" "}
              <b>{editField.totalResults || 0}</b> results
            </p>
            <Pagination
              count={editField.totalPages || 1}
              color="primary"
              className="paginations"
              showFirstButton
              showLastButton
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

            </div>
        </>
    )
}

export default Dashboard;
