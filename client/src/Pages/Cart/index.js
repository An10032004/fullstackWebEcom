import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { IoIosClose, IoMdCart } from 'react-icons/io';
import QuantityBox from '../../Components/QuantityBox';
import Button from '@mui/material/Button';
const Cart = () => {
    return (
        <section className="section cartPage ">
            <div className="container-fluid"><h2 className="hd mb-0">Your Cart</h2>
                        <p>There are <b className='text-red'>3</b> products in your cart</p>
                <div className="row">
                    <div className="col-md-8">
                        

                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th width="45%">Product</th>
                                        <th width="15%">Unit Price</th>
                                        <th width="20%">Quantity</th>
                                        <th width="15%">Subtotal</th>
                                        <th width="10%">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td width="45%">
                                            <Link to="/product/1">
                                                <div className="d-flex align-items-center cartItemImgWrapper">
                                                    <div className="imgWrapper">
                                                        <img
                                                            src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-1-1.jpg"
                                                            className="w-100"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="info px-3">
                                                        <h6>Field Roast Chao Cheese Creamy Original</h6>
                                                        <Rating
                                                            name="read-only"
                                                            value={4.5}
                                                            readOnly
                                                            precision={0.5}
                                                            size="small"
                                                        />
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td width="15%">$7.25</td>
                                        <td width="20%">
                                            <QuantityBox />
                                        </td>
                                        <td width="15%">$7.25</td>
                                        <td width="10%">
                                            <span className="remove"><IoIosClose /></span>
                                        </td>
                                    </tr>
                                     <tr>
                                        <td width="45%">
                                            <Link to="/product/1">
                                                <div className="d-flex align-items-center cartItemImgWrapper">
                                                    <div className="imgWrapper">
                                                        <img
                                                            src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-1-1.jpg"
                                                            className="w-100"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="info px-3">
                                                        <h6>Field Roast Chao Cheese Creamy Original</h6>
                                                        <Rating
                                                            name="read-only"
                                                            value={4.5}
                                                            readOnly
                                                            precision={0.5}
                                                            size="small"
                                                        />
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td width="15%">$7.25</td>
                                        <td width="20%">
                                            <QuantityBox />
                                        </td>
                                        <td width="15%">$7.25</td>
                                        <td width="10%">
                                            <span className="remove"><IoIosClose /></span>
                                        </td>
                                    </tr>
                                     <tr>
                                        <td width="45%">
                                            <Link to="/product/1">
                                                <div className="d-flex align-items-center cartItemImgWrapper">
                                                    <div className="imgWrapper">
                                                        <img
                                                            src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-1-1.jpg"
                                                            className="w-100"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="info px-3">
                                                        <h6>Field Roast Chao Cheese Creamy Original</h6>
                                                        <Rating
                                                            name="read-only"
                                                            value={4.5}
                                                            readOnly
                                                            precision={0.5}
                                                            size="small"
                                                        />
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td width="15%">$7.25</td>
                                        <td width="20%">
                                            <QuantityBox />
                                        </td>
                                        <td width="15%">$7.25</td>
                                        <td width="10%">
                                            <span className="remove"><IoIosClose /></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-md-3">
                        {/* Future: Cart Summary or Checkout Section */}
                        <div className="card border p-3 cartDetails">
                        <h4>CART TOTALS</h4>
                        <div className="d-flex align-items-center">
                        <span>Subtotal</span>
                        <span className="ml-auto text-red">$12.31</span>
                        </div>
                        <div className="d-flex align-items-center">
                        <span>Shipping</span>
                        <span className="ml-auto "> <b>Free</b> </span>
                        </div>
                         <div className="d-flex align-items-center">
                        <span>EstimateFor</span>
                        <span className="ml-auto "> <b> United KingDom</b></span>
                        </div>
                         <div className="d-flex align-items-center">
                        <span>TOTALS</span>
                        <span className="ml-auto text-red"> $10</span>
                        </div>
                        <br/>
                        <Button className='cartBtn btn-blue bg-red btn-lg btn-big '><IoMdCart/>Add to Cart</Button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
