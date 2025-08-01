import Button from "@mui/material/Button"
import { useState } from "react"
import { FaAngleDown, FaAngleRight } from "react-icons/fa6"
import { IoIosMenu } from "react-icons/io"
import { Link } from "react-router-dom"

const Navigation = () => {
    const [isOpenSidebarNavVal,setVal] = useState(false) 
    return (
        <nav style={{ position: 'sticky', top: 0, zIndex: 999, backgroundColor: '#fff' ,height:'100%'}}>
            <div className="container " >
                <div className="row">
                    <div className="col-sm-2 navPart1">
                        <div className="catWrapper">
                            <Button className="allCatTab align-items-center" onClick={() => setVal(!isOpenSidebarNavVal)}>
                                <span className="icon1"><IoIosMenu /></span>
                                <span class="text">All CATERGORIES</span>

                                <span className="icon2"><FaAngleDown /></span>
                            </Button>

                            <div className={`sidebarsubmenu shadow ${isOpenSidebarNavVal===true ? 'open' : ''}`}>
                                <ul>
                                      <li ><Link to={'/'}> <Button>Men <FaAngleRight className="ml-auto"/> </Button></Link>
                                        <div className="submenu">
                                            <Link to={'/'}> <Button>clothing</Button> </Link>
                                            <Link to={'/'}> <Button>footwear</Button> </Link>
                                            <Link to={'/'}> <Button>watches</Button> </Link>
                                            <Link to={'/'}> <Button>clothing</Button> </Link>
                                            <Link to={'/'}> <Button>footwear</Button> </Link>
                                            <Link to={'/'}> <Button>watches</Button> </Link>
                                        </div>
                                      </li>
                                      <li ><Link to={'/'}> <Button>Women</Button></Link></li>
                                      <li ><Link to={'/'}> <Button>beauty</Button></Link></li>
                                      <li ><Link to={'/'}> <Button>watches</Button></Link></li>
                                      <li ><Link to={'/'}> <Button>kids</Button></Link></li>
                                      <li ><Link to={'/'}> <Button>gift</Button></Link></li>
                                      <li ><Link to={'/'}> <Button>Men</Button></Link></li>
                                        <li ><Link to={'/'}> <Button>Men</Button></Link></li>
                                      <li ><Link to={'/'}> <Button>Women</Button></Link></li>
                                      <li ><Link to={'/'}> <Button>beauty</Button></Link></li>
                                      <li ><Link to={'/'}> <Button>watches</Button></Link></li>
                                      <li ><Link to={'/'}> <Button>kids</Button></Link></li>
                                      <li ><Link to={'/'}> <Button>gift</Button></Link></li>
                                      <li ><Link to={'/'}> <Button>Men</Button></Link></li>
                                </ul>
                            </div>

                        </div>
                    </div>

                    <div className="col-sm-8 navPart2 d-flex align-items-center">
                        <ul className="list list-inline">
                            <li className="list-inline-item"><Link to={'/'}> <Button>Home</Button> </Link></li>
                            <li className="list-inline-item"><Link to={'/'}> <Button>Men</Button>
                                <div className="submenu shadow">
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                </div>
                            </Link></li>
                            <li className="list-inline-item"><Link to={'/'}> <Button>Women</Button>
                                <div className="submenu shadow">
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                </div>
                            </Link></li>
                            <li className="list-inline-item"><Link to={'/'}> <Button>Beauty</Button>
                                <div className="submenu shadow">
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                </div> </Link></li>
                            <li className="list-inline-item"><Link to={'/'}> <Button>Watches</Button>
                                <div className="submenu shadow">
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                </div> </Link></li>
                            <li className="list-inline-item"><Link to={'/'}> <Button>kids</Button>
                                <div className="submenu shadow">
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                </div> </Link></li>
                            <li className="list-inline-item"><Link to={'/'}> <Button>Gift</Button>
                                <div className="submenu shadow">
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                </div> </Link></li>
                            <li className="list-inline-item"><Link to={'/'}> <Button>Contact Us</Button>
                                <div className="submenu shadow">
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                </div> </Link></li>

                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation