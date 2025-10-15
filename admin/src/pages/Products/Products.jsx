import React, { useContext, useEffect, useState } from "react";
import { emphasize, Rating, styled } from "@mui/material";
import { Breadcrumbs, Chip } from "@mui/material";
import { MdHome } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { MdShoppingBag } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import skirt from "../../assets/images/skirt.png";
import Button from '@mui/material/Button';
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { Link } from "react-router-dom";
import {deleteData, fetchDataFromApi} from '../../utils/api'
import {MyContext} from '../../App'
import { format } from 'date-fns';
// breadcrumb code
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        }
    };
});

const Products = () => {
    const context = useContext(MyContext)
    const [catData, setCatData] = useState([])
    
    useEffect(() => {
            window.scrollTo(0, 0);
    
            fetchDataFromApi('/api/category?all=true').then((res) => {
                setCatData(res)
                console.log(res)
            });
        }, []);
    const [showBy, setShowBy] = useState('');
    const [catBy, setCatBy] = useState('');
    const [productList, setProductList] = useState([]);
    const [editField,setEditField] = useState([])

    const ITEM_HEIGHT = 48;

    useEffect(() => {
    window.scrollTo(0, 0);

    fetchDataFromApi("/api/products").then((res) => {
        console.log(res)
        setProductList(res.productList);
        setEditField(res)
    });
    }, []);

    const deleteProduct = (id) => {
        console.log(id)
        deleteData(`/api/products/${id}`,id).then((res) => {
            fetchDataFromApi("/api/products").then((res) => {
                setProductList(res.productList);
            });
        })
        }
         const handleChange = (event, value) => {
            fetchDataFromApi(`/api/products?page=${value}`).then((res) => {
                setProductList(res.productList || []);
                console.log(res);
            });
        };  
    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Product List</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<MdHome fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            label="Products"
                            deleteIcon={<MdExpandLess />}
                        />
                    </Breadcrumbs>
                </div>

                <div className="row dashboard-box-wrapper-row dashboard-box-wrapper-row-v2">
                    <div className="col-md-12">
                        <div className="dashboard-box-wrapper d-flex">
                            <button className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textSizeMedium
                                MuiButton-colorPrimary dashboard-box css-1ujsas3" type="button" style={{backgroundImage: 'linear-gradient(to right, rgb(29, 162, 86), rgb(72, 212, 131))'}}
                                >
                                <span className="chart"> <TrendingUpIcon /> </span>
                                <div className="d-flex w-100">
                                    <div className="col1">
                                        <h4 className="text-white mb-0">Total User</h4>
                                        <span className="text-white">277</span>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="icons">
                                            <FaUserCircle />
                                        </span>
                                    </div>
                                </div>
                            </button>
                            <button className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textSizeMedium
                                MuiButton-colorPrimary dashboard-box css-1ujsas3" type="button" 
                                style={{backgroundImage: 'linear-gradient(to right, rgb(192, 18, 226), rgb(235, 100, 254))'}}
                                >
                                <span className="chart"> <TrendingDownIcon /> </span>
                                <div className="d-flex w-100">
                                    <div className="col1">
                                        <h4 className="text-white mb-0">Total User</h4>
                                        <span className="text-white">277</span>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="icons">
                                            <IoMdCart />
                                        </span>
                                    </div>
                                </div>
                            </button>
                            <button className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textSizeMedium
                                MuiButton-colorPrimary dashboard-box css-1ujsas3" type="button" 
                                style={{backgroundImage: 'linear-gradient(to right, rgb(44, 120, 229), rgb(96, 175, 245))'}}
                                >
                                <span className="chart"> <TrendingDownIcon /> </span>
                                <div className="d-flex w-100">
                                    <div className="col1">
                                        <h4 className="text-white mb-0">Total User</h4>
                                        <span className="text-white">277</span>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="icons">
                                            <MdShoppingBag />
                                        </span>
                                    </div>
                                </div>
                            </button>
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
                                onChange={(e)=> setShowBy(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                labelId="demo-select-small-label"
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
                        <div className="col-md-3">
                            <h4>CATEGORY BY</h4>
                            <FormControl className="w-100" size="small">
                            <Select
                                value={catBy}
                                onChange={(e)=> setCatBy(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                className="w-100"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    catData?.length !== 0 && catData?.map((cat, index) => {
                                        return (
                                            <MenuItem value={cat.id} key={index}>{cat.name}</MenuItem>
                                        )
                                    })
                                }
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
                                {productList?.length!==0 && productList?.map((item,index) => {
                                    return(

<tr>
                                    <td>#{index+1}</td>
                                    <td> 
                                        <div className="d-flex align-items-center product-box">
                                            <div className="img-wrapper">
                                                <div className="img">
                                                    {/* <img src={`${item.images[0]}`} alt="images" className="w-100" /> */} 
                                                    {/* luu cloud ben tren */}
                                                    <img src={`${context.baseUrl}/uploads/${item.images[0]}`} alt="images" className="w-100" />
                                                    
                                                </div>
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
                                    <td> 
                                        <del className="old-price">${item.oldPrice}</del>
                                        <span className="new-price text-danger">${item.price}</span>
                                    </td>
                                    <td>{item.countInStock}</td>
                                    <td><Rating name="read-only" value={Number(item.rating) || 0}  precision={0.5} size="small" readOnly /></td>
                                    <td>{format(new Date(item.dateCreated), 'dd/MM/yyyy')}</td>
                                   <td>
                                        {item.isFeatured ? (
                                            <span style={{ color: "green", fontWeight: "bold" }}>Featured</span>
                                        ) : (
                                            <span style={{ color: "red", fontWeight: "bold" }}>Not Featured</span>
                                        )}
                                        </td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to={`/product/details/${item.id}`}>
                                                <Button className="secondary" color="secondary"><FaEye /></Button>
                                            </Link>
                                            <Link to={`/product/edit/${item.id}`}>
                                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                            </Link>
                                            <Button className="error" color="error" onClick={() => deleteProduct(item._id)}><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>

                                    )
                                })}
              
                            </tbody>
                        </table>
                        <div className="d-flex table-footer">
                            <p>showing <b>12</b>  of <b>60</b>  results</p>
                            <Pagination count={editField.totalPages} color="primary" className="paginations" showFirstButton showLastButton onChange={handleChange} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}


export default Products;

