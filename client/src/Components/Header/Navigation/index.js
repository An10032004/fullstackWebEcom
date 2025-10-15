import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import { FaAngleDown, FaAngleRight } from "react-icons/fa6"
import { IoIosMenu } from "react-icons/io"
import { Link } from "react-router-dom"

const Navigation = ({catData}) => {
    const [isOpenSidebarNavVal,setVal] = useState(false) 
    // useEffect(() => {
    //     console.log(catData)
    // })
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
                                    {
                                        catData?.length !== 0 && catData?.map((item,index) => {
                                            return (
                                                <li className="list-inline-item">
                                                    <Link to={`/cat/${item?.id}`}><Button>{item?.name} <FaAngleRight className="ml-auto"/></Button></Link>
                                                    <div className="submenu">
                                                        {
                                                            item?.subCat?.length > 0 && item?.subCat?.map((sub,index) => {
                                                                return (
<Link to={`/search?q=${encodeURIComponent(sub)}`} key={index}>
      <Button>{sub}</Button>
    </Link>                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                      
                                     
                                </ul>
                            </div>

                        </div>
                    </div>

                    <div className="col-sm-8 navPart2 d-flex align-items-center">
                        <ul className="list list-inline">
                            <li className="list-inline-item"><Link to={'/'}> <Button>Home</Button> </Link></li>
                            {/* <li className="list-inline-item"><Link to={'/'}> <Button>Men</Button>
                                <div className="submenu shadow">
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                    <Link to={'/'}> <Button>clothing</Button> </Link>
                                    <Link to={'/'}> <Button>footwear</Button> </Link>
                                    <Link to={'/'}> <Button>watches</Button> </Link>
                                </div>
                            </Link></li> */}
                            {
                                        catData?.length !== 0 && catData?.map((item,index) => {
                                            return (
                                                <li className="list-inline-item">
                                                    <Link to={`/cat/${item?.id}`}><Button>{item?.name} </Button></Link>
                                                    <div className="submenu shadow">
                                                        {
                                                            item?.subCat?.length > 0 && item?.subCat?.map((sub,index) => {
                                                                return (
<Link to={`/search?q=${encodeURIComponent(sub)}`} key={index}>
      <Button>{sub}</Button>
    </Link>                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }

                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation