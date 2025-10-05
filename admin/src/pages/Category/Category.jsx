import React, { useEffect, useState } from "react";
import { CircularProgress, emphasize, styled } from "@mui/material";
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
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

const Categories = () => {
    const [formFields,setFormFields] =  useState({
            name:'',
            subCat:[],
            images:[],
            color:''
        })
    const [open, setOpen] = React.useState(false);
    const [catData, setCatData] = useState([]);
    const [editField,setEditField] = useState([])
    const [editId,setEditId] = useState(null)

    const [isLoading,setIsLoading] = useState(false)
  const handleClose = () => {
    setOpen(false);
  };
    useEffect(() => {
        window.scrollTo(0, 0);

        fetchDataFromApi('/api/category').then((res) => {
            setCatData(res.categoryList || [])
            setEditField(res)
        });
    }, []);

    const editCategory = (id) =>{
        setFormFields({
                name:'',
                subCat:[],
                images:[],
                color:''
            })
        setOpen(true);
        setEditId(id)
         fetchDataFromApi(`/api/category/${id}`).then((res) => {
            setFormFields({
                name:res.name,
                subCat:res.subCat,
                images:res.images,
                color:res.color
            })
        });

    }

   

     const changeInput = (e) => {
            setFormFields(() => (
                {...formFields,
                [e.target.name] : e.target.value}
            ))
            console.log(formFields)
        }
        const addImgURL = (e) => {
        const arr = []
        arr.push(e.target.value)
         setFormFields(() => (
            {...formFields,
            [e.target.name] : arr}
        ))
    }
     const submitEditCategory = (e) => {
        e.preventDefault()
        const id = editId
        setIsLoading(true)
        editData(`/api/category/${id}`,formFields).then(res => {
            
             fetchDataFromApi('/api/category').then((res) => {
            setCatData(res.categoryList || []);
            setOpen(false)
            setIsLoading(true)
        });
        } )
    } 

    const deleteCat =(id) => {
        deleteData(`/api/category/${id}`,formFields).then((res) => {
            fetchDataFromApi('/api/category').then((res) => {
            setCatData(res.categoryList || []);

        });
        })
    }

    const handleChange = (event, value) => {
    fetchDataFromApi(`/api/category?page=${value}`).then((res) => {
        setCatData(res.categoryList || []);
        console.log(res);
    });
};

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Category List</h5>


                    <div className="ml-auto d-flex align-items-center">
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
                 <Link to="/category/add">
                        <Button className="ml-4 btn-blue mr-">Add Category</Button>
                    </Link>
                   <Link to="/category/edit-subCat">
                        <Button className="ml-4 btn-blue mr-">Add SubCategory</Button>
                    </Link>
                </div>

                <div className="row dashboard-box-wrapper-row dashboard-box-wrapper-row-v2">
                    <div className="col-md-12">
                        <div className="dashboard-box-wrapper d-flex">
                            <button className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textSizeMedium
                                MuiButton-colorPrimary dashboard-box css-1ujsas3" type="button" style={{ backgroundImage: 'linear-gradient(to right, rgb(29, 162, 86), rgb(72, 212, 131))' }}
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
                                style={{ backgroundImage: 'linear-gradient(to right, rgb(192, 18, 226), rgb(235, 100, 254))' }}
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
                                style={{ backgroundImage: 'linear-gradient(to right, rgb(44, 120, 229), rgb(96, 175, 245))' }}
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
                    {/* <div className="row card-filters mt-3">
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
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            </FormControl>
                        </div>
                    </div> */}

                    <div className="table-responsive mt-3">
                        <table className="table table-bordered v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th>UID</th>
                                    <th>Image</th>
                                    <th>Category</th>
                                    <th>Sub Category</th>
                                    <th>Color</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {catData?.length !== 0 && catData?.map((item, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>#{index+1}</td>
                                                <td>
                                                    <div className="d-flex align-items-center product-box">
                                                        <div className="img-wrapper">
                                                            <div className="img">
                                                                <img src={item.images[0]} alt="skirt" className="w-100" />
                                                            </div>
                                                        </div>
                                                        <div className="info pl-0">
                                                            {/* <h6>{item.name}</h6> */}
                                                            {/* <p>Woman's exclusive summer Tops and skirt set
                                                                for Female Tops and skirt set</p> */}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.subCat[0]},{item.subCat[1]}</td>
                                                <td>{item.color}</td>

                                                <td>
                                                    <div className="actions d-flex align-items-center">
                                                        
                                                        <Button className="success" color="success" onClick={() => editCategory(item.id)}><FaPencilAlt /></Button>
                                                        <Button className="error" color="error" onClick={() => deleteCat(item.id)}><MdDelete /></Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
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


            <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            
          </DialogContentText>
          <form onSubmit={submitEditCategory}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Category Name"
              type="text"
              fullWidth
              variant="standard"
              value={formFields.name}
              onChange={changeInput}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="subCat"
              name="subCat"
              label="Sub Category"
              type="text"
              fullWidth
              variant="standard"
              value={formFields.subCat}
              onChange={addImgURL}
            />

             <TextField
              autoFocus
              required
              margin="dense"
              id="images"
              name="images"
              label="Category Images"
              type="text"
              fullWidth
              variant="standard"
              value={formFields.images}
              onChange={addImgURL}
            />

             <TextField
              autoFocus
              required
              margin="dense"
              id="color"
              name="color"
              label="Category Color"
              type="text"
              fullWidth
              variant="standard"
              value={formFields.color}
              onChange={changeInput}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {isLoading  ?( <CircularProgress size={24}/>) :( <Button type="submit">Edit</Button>)}
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
        </>
    )
}


export default Categories;

