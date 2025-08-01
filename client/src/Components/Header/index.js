import { Link } from "react-router-dom"
import Logo from '../../assets/images/Logo.png'
import CountryDropDown from "../CountryDropdown"
import { IoBagOutline } from "react-icons/io5"
import Button from "@mui/material/Button"
import { FiUser } from "react-icons/fi"
import SearchBox from "./SearchBox"
import Navigation from "./Navigation"
import { useContext } from "react"
import { MyContext } from "../../App"
const Header = () => {
    const context = useContext(MyContext)
    return (
        <div className="headerWrapper">
            <div className="top-strip bg-blue">
                <div className="container">
                    <p className="mb-0 mt-0 text-center" >Introduce</p>
                </div>

            </div>


            <div style={{ position: 'sticky', top: 0, zIndex: 999, backgroundColor: '#fff' }}>

                <header className="header">
                    <div className="container">
                        <div className="row editRow">
                            <div className="logoWrapper d-flex align-items-center col-sm-2 justify-content-between">
                                <Link to={'/'}><img src={Logo} alt='Logo' /></Link>

                            </div>
                            <div className="col-sm-10 d-flex align-items-center part2">
                                {
                                    context.countryList.length !== 0 && <CountryDropDown />
                                }

                                {/* HeaderSearchStart */}
                                <SearchBox />
                                {/* HeaderSearchend */}

                                <div className="part3 d-flex align-items-center ml-auto" >
                                    {context.isLogin === false && <Link to={'/signIn'}><Button className="btn-blue btn-lg btn-big btn-round mr-3">Sign In</Button></Link>
                                    }
                                    {context.isLogin === true && <Button className="circle mr-3"><FiUser /></Button>
                                    }
                                    <div className="ml-auto cartTab" >
                                        <span className="price">$3.29</span>
                                    </div>
                                    <div className="position-relative ml-2">
                                        <Button className="btn circle circle2 ml-2"><IoBagOutline /></Button>
                                        <span className="count d-flex align-items-center justify-content-center">1</span>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </header>

                <Navigation />
            </div>



        </div>

    )
}

export default Header