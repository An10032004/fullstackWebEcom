import React, { useRef } from "react";
import { emphasize, styled } from "@mui/material";
import { Breadcrumbs, Chip } from "@mui/material";
import { MdHome } from "react-icons/md";
import Slider from "react-slick";
import pro01 from "../../assets/images/pro01.png";
import pro02 from "../../assets/images/pro02.png";
import pro03 from "../../assets/images/pro03.png";
import pro04 from "../../assets/images/pro04.png";
import pro05 from "../../assets/images/pro05.png";
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaTags } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import { PiResizeFill } from "react-icons/pi";
import { IoMdPricetags } from "react-icons/io";
import { GoStarFill } from "react-icons/go";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import UserImg from "../../components/UserImg/UserImg";
import user from "../../assets/images/user.png";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaReply } from "react-icons/fa";

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



const ProductDetails = () => {
  
    const productSliderBig = useRef();
    const productSliderSmall = useRef();

    var productSliderOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    var productSliderSmlOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false
    };

    const goToSlider=(index)=>{
        productSliderBig.current.slickGoTo(index);
        productSliderSmall.current.slickGoTo(index);
    }
    

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                    <h5 className="mb-0">Product View</h5>
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
                            label="Product View"
                        />
                    </Breadcrumbs>
                </div>

                <div className="card product-details-section">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="slider-wrapper pt-3 pb-3 pl-3 pr-3">
                                <h6 className="mb-4">Product Gallery</h6>
                                <Slider {...productSliderOptions} ref={productSliderBig} className="slider-big mb-2">
                                    <div className="item">
                                        <img src={pro01} alt="pro01" className="w-100" />
                                    </div>
                                    <div className="item">
                                        <img src={pro02} alt="pro02" className="w-100" />
                                    </div>
                                    <div className="item">
                                        <img src={pro03} alt="pro03" className="w-100" />
                                    </div>
                                    <div className="item">
                                        <img src={pro04} alt="pro04" className="w-100" />
                                    </div>
                                    <div className="item">
                                        <img src={pro05} alt="pro05" className="w-100" />
                                    </div>
                                    <div className="item">
                                        <img src={pro01} alt="pro01" className="w-100" />
                                    </div>
                                    <div className="item">
                                        <img src={pro02} alt="pro02" className="w-100" />
                                    </div>
                                    <div className="item">
                                        <img src={pro03} alt="pro03" className="w-100" />
                                    </div>
                                </Slider>
                                <Slider {...productSliderSmlOptions} ref={productSliderSmall} className="slider-small">
                                    <div className="item" onClick={()=>goToSlider(1)}>
                                        <img src={pro01} alt="pro01" className="w-100" />
                                    </div>
                                    <div className="item" onClick={()=>goToSlider(2)}>
                                        <img src={pro02} alt="pro02" className="w-100" />
                                    </div>
                                    <div className="item" onClick={()=>goToSlider(3)}>
                                        <img src={pro03} alt="pro03" className="w-100" />
                                    </div>
                                    <div className="item" onClick={()=>goToSlider(4)}>
                                        <img src={pro04} alt="pro04" className="w-100" />
                                    </div>
                                    <div className="item" onClick={()=>goToSlider(5)}>
                                        <img src={pro05} alt="pro05" className="w-100" />
                                    </div>
                                    <div className="item" onClick={()=>goToSlider(6)}>
                                        <img src={pro01} alt="pro01" className="w-100" />
                                    </div>
                                    <div className="item" onClick={()=>goToSlider(7)}>
                                        <img src={pro02} alt="pro02" className="w-100" />
                                    </div>
                                    <div className="item" onClick={()=>goToSlider(8)}>
                                        <img src={pro03} alt="pro02" className="w-100" />
                                    </div>
                                </Slider>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="pt-3 pb-3 pl-3 pr-3">
                                <h6 className="mb-4">Product Details</h6>
                                <h4>Formal suits for men wedding slim fit 3 piece dress business party jacket</h4>
                                <div className="product-info mt-4">
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icons"><MdBrandingWatermark /></span>
                                            <span className="name">Brand</span>
                                        </div>
                                        <div className="col-sm-9">
                                            <span>Ecstasy</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icons"><BiSolidCategoryAlt /></span>
                                            <span className="name">Category</span>
                                        </div>
                                        <div className="col-sm-9">
                                            <span>Man's</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icons"><FaTags /></span>
                                            <span className="name">Tags</span>
                                        </div>
                                        <div className="col-sm-9">
                                            <span>
                                                <ul className="list list-inline tags small">
                                                    <li className="list-inline-item">
                                                        <span>SUITE</span>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <span>PARTY</span>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <span>DRESS</span>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <span>SMART</span>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <span>MAN</span>
                                                    </li>
                                                </ul>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icons"><IoIosColorPalette /></span>
                                            <span className="name">Color</span>
                                        </div>
                                        <div className="col-sm-9">
                                            <span>
                                                <ul className="list list-inline tags small">
                                                    <li className="list-inline-item">
                                                        <span>RED</span>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <span>BLUE</span>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <span>WHITE</span>
                                                    </li>
                                                </ul>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icons"><PiResizeFill /></span>
                                            <span className="name">Size</span>
                                        </div>
                                        <div className="col-sm-9">
                                            <span>
                                                <ul className="list list-inline tags small">
                                                    <li className="list-inline-item">
                                                        <span>SM</span>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <span>MD</span>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <span>LG</span>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <span>XL</span>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <span>XXL</span>
                                                    </li>
                                                </ul>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icons"><IoMdPricetags /></span>
                                            <span className="name">Price</span>
                                        </div>
                                        <div className="col-sm-9">
                                            <span>$37.00 <del>$42.00</del> </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icons"><GoStarFill /></span>
                                            <span className="name">Review</span>
                                        </div>
                                        <div className="col-sm-9">
                                            <span>(03) Review</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icons"><MdOutlinePublishedWithChanges /></span>
                                            <span className="name">Published</span>
                                        </div>
                                        <div className="col-sm-9">
                                            <span>02 Feb 2520</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <h6 className="mt-4 mb-3">Product Description</h6>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae reprehenderit 
                        repellendus expedita esse cupiditate quos doloremque rerum, corrupti ab illum est 
                        nihil, voluptate ex dignissimos! Sit voluptatem delectus nam, molestiae, repellendus 
                        ab sint quo aliquam debitis amet natus doloremque laudantium? Repudiandae, 
                        consequuntur, officiis quidem quo deleniti, autem non laudantium sequi error 
                         molestiae ducimus accusamus facere velit consectetur vero dolore natus nihil 
                        temporibus aspernatur quia consequatur? Consequuntur voluptate deserunt 
                        repellat tenetur debitis molestiae doloribus dicta. In rem illum dolorem atque 
                        ratione voluptates asperiores maxime doloremque laudantium magni neque ad quae quos 
                        quidem, quaerat rerum ducimus blanditiis reiciendis</p>

                        <br />

                        <h6 className="mt-4 mb-4">Rating Analytics</h6>
                        <div className="rating-section">
                            <div className="rating-row d-flex align-items-center">
                                <span className="col1">5 Star</span>
                                <div className="col2">
                                    <div className="progress">
                                        <div className="progress-bar" style={{width: '70%'}}></div>
                                    </div>
                                </div>
                                <div className="col3"> <span>(22)</span></div>
                            </div>
                            <div className="rating-row d-flex align-items-center">
                                <span className="col1">4 Star</span>
                                <div className="col2">
                                    <div className="progress">
                                        <div className="progress-bar" style={{width: '60%'}}></div>
                                    </div>
                                </div>
                                <div className="col3"> <span>(15)</span></div>
                            </div>
                            <div className="rating-row d-flex align-items-center">
                                <span className="col1">3 Star</span>
                                <div className="col2">
                                    <div className="progress">
                                        <div className="progress-bar" style={{width: '50%'}}></div>
                                    </div>
                                </div>
                                <div className="col3"> <span>(11)</span></div>
                            </div>
                            <div className="rating-row d-flex align-items-center">
                                <span className="col1">2 Star</span>
                                <div className="col2">
                                    <div className="progress">
                                        <div className="progress-bar" style={{width: '40%'}}></div>
                                    </div>
                                </div>
                                <div className="col3"> <span>(5)</span></div>
                            </div>
                            <div className="rating-row d-flex align-items-center">
                                <span className="col1">1 Star</span>
                                <div className="col2">
                                    <div className="progress">
                                        <div className="progress-bar" style={{width: '32%'}}></div>
                                    </div>
                                </div>
                                <div className="col3"> <span>(7)</span></div>
                            </div>
                        </div>

                        <br />
                        <h6 className="mt-4 mb-4">Customer Reviews</h6>
                        <div className="reviews-section">
                            <div className="reviews-row">
                                <div className="row">
                                    <div className="col-sm-7">
                                        <div className="d-flex flex-column">
                                            <div className="user-info d-flex align-items-center mb-3">
                                                <UserImg img={user} lg={true} />
                                                <div className="info pl-3 pt-2">
                                                    <h6>Miron Mahmud</h6>
                                                    <span>25 minutes ago!</span>
                                                </div>
                                            </div>
                                            <Rating name="read-only" id="rat" value={4.5}  precision={0.5} readOnly   /> 
                                        </div>     
                                    </div>
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <Button className="btn-big btn-blue ml-auto"><FaReply /> &nbsp; Reply</Button> 
                                    </div>
                                    <p className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore 
                                        fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, 
                                        adipisci natus quod magni omnis quas.</p>
                                </div>
                            </div>

                            <div className="reviews-row reply">
                                <div className="row">
                                    <div className="col-sm-7">
                                        <div className="d-flex flex-column">
                                            <div className="user-info d-flex align-items-center mb-3">
                                                <UserImg img={user} lg={true} />
                                                <div className="info pl-3 pt-2">
                                                    <h6>Miron Mahmud</h6>
                                                    <span>25 minutes ago!</span>
                                                </div>
                                            </div>
                                            <Rating name="read-only" id="rat" value={4.5}  precision={0.5} readOnly   /> 
                                        </div>     
                                    </div>
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <Button className="btn-big btn-blue ml-auto"><FaReply /> &nbsp; Reply</Button> 
                                    </div>
                                    <p className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore 
                                        fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, 
                                        adipisci natus quod magni omnis quas.</p>
                                </div>
                            </div>

                            <div className="reviews-row reply">
                                <div className="row">
                                    <div className="col-sm-7">
                                        <div className="d-flex flex-column">
                                            <div className="user-info d-flex align-items-center mb-3">
                                                <UserImg img={user} lg={true} />
                                                <div className="info pl-3 pt-2">
                                                    <h6>Miron Mahmud</h6>
                                                    <span>25 minutes ago!</span>
                                                </div>
                                            </div>
                                            <Rating name="read-only" id="rat" value={4.5}  precision={0.5} readOnly   /> 
                                        </div>     
                                    </div>
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <Button className="btn-big btn-blue ml-auto"><FaReply /> &nbsp; Reply</Button> 
                                    </div>
                                    <p className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore 
                                        fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, 
                                        adipisci natus quod magni omnis quas.</p>
                                </div>
                            </div>

                            <div className="reviews-row">
                                <div className="row">
                                    <div className="col-sm-7">
                                        <div className="d-flex flex-column">
                                            <div className="user-info d-flex align-items-center mb-3">
                                                <UserImg img={user} lg={true} />
                                                <div className="info pl-3 pt-2">
                                                    <h6>Miron Mahmud</h6>
                                                    <span>25 minutes ago!</span>
                                                </div>
                                            </div>
                                            <Rating name="read-only" id="rat" value={4.5}  precision={0.5} readOnly   /> 
                                        </div>     
                                    </div>
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <Button className="btn-big btn-blue ml-auto"><FaReply /> &nbsp; Reply</Button> 
                                    </div>
                                    <p className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore 
                                        fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, 
                                        adipisci natus quod magni omnis quas.</p>
                                </div>
                            </div> 

                        </div>

                        <br />
                        <h6 className="mt-4 mb-4">Review Reply Form</h6>
                        <form className="review-form">
                            <textarea placeholder="Write here">
                            </textarea>
                            <Button className="btn-blue btn-big btn-lg w-100 mt-4">Drop your Replies</Button>
                        </form>
                    </div>

                </div>

            </div>

            
        </>
    )
}

export default ProductDetails;
