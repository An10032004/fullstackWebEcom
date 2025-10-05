import React, { useEffect, useState } from "react";
import { emphasize, styled } from "@mui/material";
import { Breadcrumbs, Chip } from "@mui/material";
import { MdHome } from "react-icons/md";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import pro01 from "../../assets/images/pro01.png";
import { IoCloseSharp } from "react-icons/io5";
// import OutlinedInput from "@mui/material/OutlinedInput";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaRegImages } from "react-icons/fa";
import { editData, fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";

import { SnackbarProvider, useSnackbar } from 'notistack';
import { useContext } from "react";
import { MyContext } from "../../App";
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

const AddSubcategory = () => {
    const navigate = useNavigate();
    const [categoryValue, setCategoryValue] = useState('');
    const [subCategoryValue, setSubCategoryValue] = useState('');
    const [featuredValue, setFeaturedValue] = useState('');
    const [productRams, setProductRams] = useState([]);

    const [ratingValue, setRatingValue] = useState(2);
    const [catData, setCatData] = useState([])
    useEffect(() => {
        window.scrollTo(0, 0);

        fetchDataFromApi('/api/category?all=true').then((res) => {
            setCatData(res)
            console.log(res)
        });
    }, []);
    const handleChangecategory = (event) => {
        setCategoryValue(event.target.value);
    };

    const handleChangeSubCategory = (event) => {
        setSubCategoryValue(event.target.value);
    };

    const handleChangefeaturedValue = (event) => {
        setFeaturedValue(event.target.value);
    };

    const handleChangeProductRams = (event) => {
        const {
            target: { value },
        } = event;
        setProductRams
            (typeof value === 'string' ? value.split(',') : value,
            );
    };


    const [formFields, setFormFields] = useState({
        name: '',
        subCat: [],
        images: [],
        color: ''
    })

    const addImgURL = (e) => {
        const arr = []
        arr.push(e.target.value)
        setFormFields(() => (
            {
                ...formFields,
                [e.target.name]: arr
            }
        ))
    }

    const handleSubCatChange = (e) => {
        let value = e.target.value;

        // nếu có dấu phẩy thì tách mảng
        let arr = value.split(",").map((s) => s.trim()).filter(Boolean);

        setFormFields((prev) => ({
            ...prev,
            subCat: arr,
        }));
    };
    const changeInput = (e) => {
        setFormFields(() => (
            {
                ...formFields,
                [e.target.name]: e.target.value
            }
        ))
        console.log(formFields)
    }



    const context = useContext(MyContext)
    const addSUBCategory = (e) => {
        e.preventDefault();
        
       
        console.log(categoryValue)
        editData(`/api/category/${categoryValue}/add-subcat`, {
            subCat: subCategoryValue.split(",").map(s => s.trim())
        })
            .then(res => {
                context.handleClickVariant('success');
                navigate('/category');
            })
            .catch(err => {
                context.handleClickVariant('error');
            });
    };



    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                    <h5 className="mb-0">Add Sub Category</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<MdHome fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Category"
                        />
                        <StyledBreadcrumb
                            label="Add category"
                        />
                    </Breadcrumbs>
                </div>

                <form className="form" onSubmit={addSUBCategory}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card p-4">


                                <div className="col">
                                    <div className="form-group">
                                        <h6>CATEGORY</h6>
                                        <Select
                                            value={categoryValue}
                                            onChange={handleChangecategory}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            className="w-100"
                                        >
                                            <MenuItem value="">
                                                (<em value={null}>None</em>)

                                            </MenuItem>
                                            {
                                                catData?.length !== 0 && catData?.map((cat, index) => {
                                                    return (
                                                        <MenuItem value={cat.id} key={index} >{cat.name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <h6>SUB CATEGORY</h6>
                                        <input type="text" name="subCat" value={subCategoryValue} onChange={(e) => setSubCategoryValue(e.target.value)} placeholder="e.g. skin, skirt" />

                                    </div>
                                </div>



                            </div>

                            <div className="card p-4 mt-0">
                                <div className="images-upload-section">
                                    <h5 className="mb-4">Media And Published</h5>
                                    {/* <div className="img-upload-box d-flex align-items-center">
                                        <div className="upload-box">
                                            <span className="remove"><IoCloseSharp /></span>
                                            <div className="box">
                                                <LazyLoadImage 
                                                    alt={"images"}
                                                    effect="blur"
                                                    className="w-100"
                                                    src={pro01}
                                                />
                                            </div>
                                        </div>
                                        <div className="upload-box">
                                            <input type="file" multiple="" name="images"  />
                                            <div className="info">
                                                <span><FaRegImages /> </span>
                                                <h5>image upload</h5>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <Button type="submit" className="btn-blue btn-big btn-lg w-100 mb-4 mt-4"><FaCloudUploadAlt /> &nbsp; PUBLISH AND VIEW</Button>
                            </div>

                        </div>
                    </div>
                </form>

            </div>
        </>
    )
}

export default AddSubcategory;

