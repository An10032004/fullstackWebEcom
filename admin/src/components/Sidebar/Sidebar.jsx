import React, { useContext, useState } from "react";
import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaBell } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { MyContext } from "../../App";
import { FaUser } from "react-icons/fa";

const Sidebar = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

    const context = useContext(MyContext);

    const isOpenSubmenu = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu);
    }


    return (
        <>
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to="/">
                            <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`} 
                            onClick={()=> isOpenSubmenu(0)}>
                                <span className="icons"><MdDashboard /></span>
                                Dashboard
                                <span className="arrows"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 7 && isToggleSubmenu === true ? 'active' : ''}`} 
                        onClick={()=> isOpenSubmenu(7)}>
                            <span className="icons"><FaProductHunt /></span>
                            Categories
                            <span className="arrows"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenu-wrapper ${activeTab === 7 && isToggleSubmenu === true ?  'expanded' : 'collapsed'}`}>
                            <ul className="submenu">
                                <li> <Link to="/category"> Category List</Link> </li>
                                <li> <Link to="/category/add"> Add a category</Link> </li>
                            </ul>
                        </div>
                    </li>

                    <li>
                        <Button className={`w-100 ${activeTab === 1 && isToggleSubmenu === true ? 'active' : ''}`} 
                        onClick={()=> isOpenSubmenu(1)}>
                            <span className="icons"><FaProductHunt /></span>
                            Products
                            <span className="arrows"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenu-wrapper ${activeTab === 1 && isToggleSubmenu === true ?  'expanded' : 'collapsed'}`}>
                            <ul className="submenu">
                                <li> <Link to="/products"> Product List</Link> </li>
                                <li> <Link to="/product/details"> Product View</Link> </li>
                                <li> <Link to="/product/upload"> Product Upload</Link> </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Link to="/">
                        <Button className={`w-100 ${activeTab === 2 ? 'active' : ''}`} onClick={()=> isOpenSubmenu(2)}>
                                <span className="icons"><FaCartArrowDown /></span>
                                Orders
                                <span className="arrows"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                        <Button className={`w-100 ${activeTab === 3 ? 'active' : ''}`} onClick={()=> isOpenSubmenu(3)}>
                                <span className="icons"><MdEmail /></span>
                                Messages
                                <span className="arrows"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                        <Button className={`w-100 ${activeTab === 4 ? 'active' : ''}`} onClick={()=> isOpenSubmenu(4)}>
                                <span className="icons"><FaBell /></span>
                                Notificatrions
                                <span className="arrows"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                        <Button className={`w-100 ${activeTab === 5 ? 'active' : ''}`} onClick={()=> isOpenSubmenu(5)}>
                                <span className="icons"><IoMdSettings /></span>
                                Setting
                                <span className="arrows"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login">
                        <Button className={`w-100 ${activeTab === 6 ? 'active' : ''}`} onClick={()=> isOpenSubmenu(6)}>
                                <span className="icons"><FaUser /></span>
                                Login
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/signup">
                            <Button className="w-100">
                                <span className="icons"><FaUser /></span>
                                Sign Up
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <Button className="w-100">
                                <span className="icons"><FaCartArrowDown /></span>
                                Orders
                                <span className="arrows"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <Button className="w-100">
                                <span className="icons"><MdEmail /></span>
                                Messages
                                <span className="arrows"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <Button className="w-100">
                                <span className="icons"><FaBell /></span>
                                Notificatrions
                                <span className="arrows"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <Button className="w-100">
                                <span className="icons"><IoMdSettings /></span>
                                Setting
                                <span className="arrows"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <Button className="w-100">
                                <span className="icons"><MdDashboard /></span>
                                Dashboard
                                <span className="arrows"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <Button className="w-100">
                                <span className="icons"><FaProductHunt /></span>
                                Products
                                <span className="arrows"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <Button className="w-100">
                                <span className="icons"><FaCartArrowDown /></span>
                                Orders
                                <span className="arrows"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <Button className="w-100">
                                <span className="icons"><MdEmail /></span>
                                Messages
                                <span className="arrows"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <Button className="w-100">
                                <span className="icons"><FaBell /></span>
                                Notificatrions
                                <span className="arrows"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <Button className="w-100">
                                <span className="icons"><IoMdSettings /></span>
                                Setting
                                <span className="arrows"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                </ul>
                <br />
                <div className="logout-wrapper">
                    <div className="logout-box">
                        <Button variant="contained"> <IoMdLogOut /> Logout</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
