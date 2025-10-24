import React, { useEffect, useRef, useState } from "react";


import { CircularProgress, emphasize, styled } from "@mui/material";
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
import { fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
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

const ProductUpload = () => {
    const formData = new FormData()
    const [categoryValue, setCategoryValue] = useState('');
    const [subCategoryValue, setSubCategoryValue] = useState('');
    const [featuredValue, setFeaturedValue] = useState('');
    const [productRams, setProductRams] = useState([]);
    const [productSize, setProductSize] = useState([]);
    const [productWeight, setProductWeight] = useState([]);

    const [ratingValue, setRatingValue] = useState(1);


    const [productImagesArr, setProductImagesArr] = useState([])
    const [count, setCount] = useState(0)
    const productImages = useRef()

    const [isLoading, setIsLoading] = useState(false)
    const [catData, setCatData] = useState([])

    const [files, setFiles] = useState();
    const [imgFiles, setImgFiles] = useState();
    const [previews, setPreviews] = useState([]);


    const [catId,setCatId] = useState()
    const navigate = useNavigate()
    const [formFields, setFormField] = useState({
        name: '',
        description: '',
        images: [],
        brand: '',
        price: 0,
        oldPrice: 0,
        category: '',
        subCategory: '',
        countInStock: 0,
        rating: 0,
        isFeatured: false,
        discount: 0,
        productRAMS: [],
        productSIZE: [],
        productWeight: []
    })
    useEffect(() => {
        window.scrollTo(0, 0);

        fetchDataFromApi('/api/category?all=true').then((res) => {
            setCatData(res)
            console.log(res)
        });
    }, []);
    const [subcatData,setsubCatData] = useState()
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    //     const id = categoryValue
    //     fetchDataFromApi(`/api/category/${id}`).then((res) => {
    //         setsubCatData(res)

    //         console.log(res)
    //     });
    // }, []);
    useEffect(() => {
        if (!imgFiles) return
        let tmp = [];
        for (let i = 0; i < imgFiles.length; i++) {
            tmp.push(URL.createObjectURL(imgFiles[i]));
        }

        const objectUrls = tmp;
        
         setPreviews((prev) => [...prev, ...objectUrls]);

        // free memory
        return () => {
            for (let i = 0; i < objectUrls.length; i++) {
                URL.revokeObjectURL(objectUrls[i]);
            }
        };
    }, [imgFiles]);
    const handleChangecategory = (event) => {
        setCategoryValue(event.target.value);
        setFormField(() => ({
            ...formFields,
            category: event.target.value
        }))
        
        fetchDataFromApi(`/api/category/${event.target.value}`).then((res) => {
            setsubCatData(res.subCat)  

           
        });
    };

    const handleChangeSubCategory = (event) => {
        setSubCategoryValue(event.target.value);
        setFormField(() => ({
            ...formFields,
            subCategory: event.target.value
        }))
       
    };

    const handleChangefeaturedValue = (event) => {
        setFeaturedValue(event.target.value);
        setFormField(() => ({
            ...formFields,
            isFeatured: event.target.value
        }))
    };
const handleChangeProductRams = (event) => {
    const { value } = event.target;
    const newValue = typeof value === 'string' ? value.split(',') : value;

    setProductRams(newValue);
    setFormField((prev) => ({
        ...prev,
        productRAMS: newValue
    }));
};

const handleChangeProductSize = (event) => {
    const { value } = event.target;
    const newValue = typeof value === 'string' ? value.split(',') : value;

    setProductSize(newValue);
    setFormField((prev) => ({
        ...prev,
        productSIZE: newValue
    }));
};

const handleChangeProductWeight = (event) => {
    const { value } = event.target;
    const newValue = typeof value === 'string' ? value.split(',') : value;

    setProductWeight(newValue);
    setFormField((prev) => ({
        ...prev,
        productWeight: newValue
    }));
};
    const addProductImages = () => {

        const imgGrid = document.querySelector('#imgGrid');

        const imgData = `
    <div class='img'>
        <img src="${productImages.current.value}" alt="image" class="w-100" />
    </div>
`;
        setProductImagesArr(prevArray => [...prevArray, productImages.current.value]);

        
        imgGrid.insertAdjacentHTML('beforeend', imgData);

        productImages.current.value = "";
    }

    const inputChange = (e) => {
        setFormField(() => ({ ...formFields, [e.target.name]: e.target.value }))
    }
const onChangeFile = async (e, apiEndPoint) => {
  try {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    const res = await postData(apiEndPoint, formData);
    console.log("✅ Cloudinary response:", res);

    if (res?.success && Array.isArray(res.images) && res.images.length > 0) {
      // 🟢 Gộp tất cả ảnh mới vào formFields
      setFormField((prev) => {
        const updatedImages = [...(prev.images || []), ...res.images];
        console.log("🟢 Updated formField images:", updatedImages);
        return { ...prev, images: updatedImages };
      });

      // 🟢 Preview ảnh mới (chỉ giữ string)
      setPreviews((prev) => [...prev, ...res.images]);
    }
  } catch (error) {
    console.error("❌ Upload error:", error);
  }
};



useEffect(() => {
  console.log("🟢 formFields updated:", formFields);
}, [formFields]);

    const addProduct = (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        formData.append('name', formFields.name);
        formData.append('description', formFields.description);
        formData.append('brand', formFields.brand);
        formData.append('price', formFields.price);
        formData.append('oldPrice', formFields.oldPrice);
        formData.append('category', formFields.category);
        formData.append('subCategory', formFields.subCategory);
        formData.append('countInStock', formFields.countInStock);
        formData.append('rating', formFields.rating);
        formData.append('isFeatured', formFields.isFeatured);
        formData.append('discount', formFields.discount);
        formData.append('productRAMS', formFields.productRAMS);
        formData.append('productSIZE', formFields.productSIZE);
        formData.append('productWeight', formFields.productWeight);
        postData('/api/products/create', formFields).then((res) => {
            setIsLoading(false)
            setFormField({
                name: '',
                description: '',
                images: [],
                brand: '',
                price: 0,
                oldPrice: 0,
                category: '',
                subCategory: '',
                countInStock: 0,
                rating: 0,
                isFeatured: false,
                discount: 0,
                productRAMS: [],
                productSIZE: [],
                productWeight: []
            })
            navigate('/products')
            
        })
    }


    

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                    <h5 className="mb-0">Product Upload</h5>
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
                            label="Products"
                        />
                        <StyledBreadcrumb
                            label="Product Upload"
                        />
                    </Breadcrumbs>
                </div>

                <form className="form" onSubmit={addProduct}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card p-4">
                                <h5 className="mb-4">Basic Information</h5>
                                <div className="form-group">
                                    <h6>PRODUCT NAME</h6>
                                    <input type="text" name="name" onChange={inputChange} placeholder="type here" />
                                </div>
                                <div className="form-group">
                                    <h6>DESCRIPTION</h6>
                                    <textarea placeholder="type here..." rows={10} cols={10} name="description" onChange={inputChange} />
                                </div>
                                <div className="row">
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
                                                            <MenuItem value={cat.id} key={index} onChange={(e) => setCatId(e.target.value)}>{cat.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>SUB CATEGORY</h6>
                                            <Select
                                                value={subCategoryValue}
                                                onChange={handleChangeSubCategory}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                {subcatData && subcatData.length > 0 && subcatData.map((sub, index) => (
                                                    <MenuItem key={index} value={sub}>{sub}</MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>PRICE </h6>
                                            <input type="text" name="price" onChange={inputChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>OLD PRICE </h6>
                                            <input type="text" name="oldPrice" onChange={inputChange} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>IS FEATURED</h6>
                                            <Select
                                                value={featuredValue}
                                                onChange={handleChangefeaturedValue}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'true'}>True</MenuItem>
                                                <MenuItem value={'false'}>False</MenuItem>
                                            </Select>
                                        </div>
                                    </div>




                                    <div className="col">
                                        <div className="form-group">
                                            <h6>PRODUCT STOCK </h6>
                                            <input type="text" name="countInStock" onChange={inputChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>BRAND</h6>
                                            <input type="text" name="brand" onChange={inputChange} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>DISCOUNT</h6>
                                            <input type="text" name="discount" onChange={inputChange}/>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>PRODUCT RAMS</h6>
                                            <Select
                                                multiple
                                                value={productRams}
                                                onChange={handleChangeProductRams}
                                                displayEmpty
                                                className="w-100"
                                            // MenuProps={MenuProps}
                                            >
                                                <MenuItem value="1GB">1GB</MenuItem>
                                                <MenuItem value="2GB">2GB</MenuItem>
                                                <MenuItem value="4GB">4GB</MenuItem>
                                                <MenuItem value="8GB">8GB</MenuItem>
                                                <MenuItem value="10GB">10GB</MenuItem>
                                                <MenuItem value="12GB">12GB</MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>PRODUCT SIZE</h6>
                                            <Select
                                                multiple
                                                value={productSize}
                                                onChange={handleChangeProductSize}
                                                displayEmpty
                                                className="w-100"
                                            // MenuProps={MenuProps}
                                            >
                                                <MenuItem value="X">X</MenuItem>
                                                <MenuItem value="L">L</MenuItem>
                                                <MenuItem value="XL">XL</MenuItem>
                                                <MenuItem value="XXL">XXL</MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>PRODUCT WEIGHT</h6>
                                            <Select
                                                multiple
                                                value={productWeight}
                                                onChange={handleChangeProductWeight}
                                                displayEmpty
                                                className="w-100"
                                            // MenuProps={MenuProps}
                                            >
                                                <MenuItem value="100g">100g</MenuItem>
                                                <MenuItem value="200g">200g</MenuItem>
                                                <MenuItem value="500g">500g</MenuItem>
                                                <MenuItem value="1kg">1kg</MenuItem>
                                                <MenuItem value="2kg">2kg</MenuItem>
                                                <MenuItem value="5kg">5kg</MenuItem>
                                                <MenuItem value="10kg">10kg</MenuItem>
                                                <MenuItem value="20kg">20kg</MenuItem>
                                                <MenuItem value="50kg">50kg</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>RATINGS</h6>
                                            <Rating
                                                name="simple-controlled"
                                                id="rat"
                                                value={ratingValue}
                                                onChange={(event, newValue) => {
                                                    setRatingValue(newValue);
                                                    setFormField(() => ({
                                                        ...formFields,
                                                        rating: newValue
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Product Images</h6>
                                            <div className="d-flex align-items-center mb-3">
                                                <input type='text' className="form-control" ref={productImages} name="images" onChange={inputChange} />
                                                <Button className="btn-blue ml-3" onClick={addProductImages}>Add</Button>
                                            </div>

                                            <div className="imgGrid d-flex" id='imgGrid'>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-4 mt-0">
                                <div className="images-upload-section">
                                    <h5 className="mb-4">Media And Published</h5>
                                    <div className="img-upload-box d-flex align-items-center flex-wrap gap-3">
                                        {previews.length !== 0 && previews?.map((img, index) => {
                                            return (
                                                <div className='uploadBox' key={index}>
                                                    <img src={img} className="w-100" />
                                                </div>
                                            )
                                        })}
                                    


                                    <div className="upload-box">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => onChangeFile(e, '/api/products/upload')}
                                            name="images"
                                        />
                                        <div className="info">
                                            <span><FaRegImages /></span>
                                            <h5>image upload</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="btn-blue btn-lg btn-big">
                                <FaCloudUploadAlt />
                                &nbsp;
                                {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'PUBLISH AND VIEW'}
                            </Button>
                        </div>

                    </div>



            </div>
        </form >

            </div >
        </>
    )
}

export default ProductUpload;

