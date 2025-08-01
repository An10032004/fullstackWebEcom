import { LuShirt } from 'react-icons/lu'
import { TbTruckDelivery } from 'react-icons/tb'
import { TbDiscount } from 'react-icons/tb'
import { CiBadgeDollar } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import {FaFacebookF} from 'react-icons/fa'
import {FaTwitter} from 'react-icons/fa'
import {FaInstagram} from 'react-icons/fa'
const Footer = () => {
    return (
        <footer>
            <div className="container-fluid" style={{marginLeft:'70px'}}>
                <div className="topInfo row">
                    <div className="col d-flex align-items-center">
                        <span><LuShirt /></span>
                        <span className='ml-2'>Everyday Fresh Product</span>
                    </div>

                    <div className="col d-flex align-items-center">
                        <span><TbTruckDelivery /></span>
                        <span className='ml-2'>Free for order over 36$</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <span><TbDiscount /></span>
                        <span className='ml-2'>Daily mega discounts</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <span><CiBadgeDollar /></span>
                        <span className='ml-2'>Good Staffs</span>
                    </div>
                </div>

                <div className='row mt-4 linksWrap'>
                    <div className='col'>
                        {/* 1. Women's Apparel */}
                        <h5>WOMEN'S APPAREL</h5>
                        <ul>
                            <li><Link to='#'>Dresses</Link></li>
                            <li><Link to='#'>Tops & Blouses</Link></li>
                            <li><Link to='#'>Skirts</Link></li>
                            <li><Link to='#'>Pants & Jeans</Link></li>
                            <li><Link to='#'>Outerwear</Link></li>
                            <li><Link to='#'>Activewear</Link></li>
                            <li><Link to='#'>Lingerie</Link></li>
                        </ul>
                        </div>
                        <div className='col'>
                            <h5>MEN'S APPAREL</h5>
                            <ul>
                                <li><Link to='#'>Shirts</Link></li>
                                <li><Link to='#'>T-shirts & Polos</Link></li>
                                <li><Link to='#'>Jeans & Trousers</Link></li>
                                <li><Link to='#'>Jackets & Coats</Link></li>
                                <li><Link to='#'>Suits & Blazers</Link></li>
                                <li><Link to='#'>Sportswear</Link></li>
                                <li><Link to='#'>Underwear</Link></li>
                            </ul>
                        </div>
                        {/* 2. Men's Apparel */}

                        <div className='col'>
                            <h5>FOOTWEAR</h5>
                            <ul>
                                <li><Link to='#'>Sneakers</Link></li>
                                <li><Link to='#'>Boots</Link></li>
                                <li><Link to='#'>Sandals</Link></li>
                                <li><Link to='#'>Heels</Link></li>
                                <li><Link to='#'>Flats</Link></li>
                                <li><Link to='#'>Dress Shoes</Link></li>
                                <li><Link to='#'>Athletic Shoes</Link></li>
                            </ul>
                        </div>
                        {/* 3. Footwear */}

                        <div className='col'><h5>ACCESSORIES</h5>
                            <ul>
                                <li><Link to='#'>Bags & Handbags</Link></li>
                                <li><Link to='#'>Jewelry</Link></li>
                                <li><Link to='#'>Hats & Beanies</Link></li>
                                <li><Link to='#'>Scarves</Link></li>
                                <li><Link to='#'>Belts</Link></li>
                                <li><Link to='#'>Watches</Link></li>
                                <li><Link to='#'>Sunglasses</Link></li>
                            </ul></div>
                        {/* 4. Accessories */}

                        <div className='col'><h5>STYLE & TRENDS</h5>
                            <ul>
                                <li><Link to='#'>New Arrivals</Link></li>
                                <li><Link to='#'>Seasonal Collections</Link></li>
                                <li><Link to='#'>Street Style</Link></li>
                                <li><Link to='#'>Designer Spotlight</Link></li>
                                <li><Link to='#'>Sustainable Fashion</Link></li>
                                <li><Link to='#'>Vintage & Retro</Link></li>
                                <li><Link to='#'>Outfit Ideas</Link></li>
                            </ul></div>
                        {/* 5. Style & Trends */}
                        <div className='col'>
                            {/* 6. Kids' Fashion */}
                            <h5>KIDS' FASHION</h5>
                            <ul>
                                <li><Link to='#'>Baby Clothes</Link></li>
                                <li><Link to='#'>Toddler Apparel</Link></li>
                                <li><Link to='#'>Boys' Clothing</Link></li>
                                <li><Link to='#'>Girls' Clothing</Link></li>
                                <li><Link to='#'>Kids' Shoes</Link></li>
                                <li><Link to='#'>School Uniforms</Link></li>
                                <li><Link to='#'>Playwear</Link></li>
                            </ul>
                        </div>
                    </div>

            <div className='copyright mt-3 pt-3 pb-3 d-flex'>
                <p className='mb-0'>copyright 2025 .By Duong Dinh An </p>
                <ul className='list list-inline ml-auto mb-0'>
                    <li className='list list-inline-item'>
                        <Link to='#'><FaFacebookF/></Link>
                    </li>
                    <li className='list list-inline-item'>
                        <Link to='#'><FaTwitter/></Link>
                    </li>
                    <li className='list list-inline-item'>
                        <Link to='#'><FaInstagram/></Link>
                    </li>
                </ul>
                </div>

                </div>
           
        </footer>
    )
}
export default Footer