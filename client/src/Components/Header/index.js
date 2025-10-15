import { Link, useNavigate } from "react-router-dom"
import Logo from '../../assets/images/Logo.png'
import CountryDropDown from "../CountryDropdown"
import { IoBagOutline } from "react-icons/io5"
import Button from "@mui/material/Button"
import { FiUser } from "react-icons/fi"
import SearchBox from "./SearchBox"
import Navigation from "./Navigation"
import { useContext, useEffect, useState } from "react"
import { MyContext } from "../../App"
import { fetchDataFromApi } from "../../utils/api"
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

import { Settings, Logout, Person } from "@mui/icons-material";
import { FaClipboardCheck, FaUserAlt } from "react-icons/fa"
const Header = () => {
  const context = useContext(MyContext)
  const { cartCount, cartTotal } = useContext(MyContext);

  const [catData, setCatData] = useState([])
  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      const categories = res.categoryList || [];
      setCatData(categories);
    }, [])
  })

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 🔹 Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    context.setIsLogin(false);
    context.showAlert("Đăng xuất thành công!", "success");
    handleClose();
    navigate("/");
  };

      const [user1,setUser1] = useState({})
useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        fetchDataFromApi(`/api/user/${user.userId}`).then((res) => {
            setUser1(res)
        })
    },[])
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
                  {context.isLogin === true && <div className="ml-auto cartTab mr-4" >
                    <span className="price">{user1.name}</span>
                  </div>
                  }

                  {context.isLogin === true && <Button className="circle mr-3"><Tooltip title="Tài khoản">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "user-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      className="mr-3"
                    >
                      <FiUser size={22} />
                    </IconButton>
                  </Tooltip>
                    <>
                      <Menu
                        id="user-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      >
                       <Link to={`my-account`}>
                        <MenuItem>
                          <ListItemIcon>
                            <Person fontSize="small" />
                          </ListItemIcon>
                          Profile
                        </MenuItem></Link>

                        <Link to={`/myList`}>
                          <MenuItem>
                            <ListItemIcon>
                              <FaUserAlt fontSize="small" />
                            </ListItemIcon>
                            WishList
                          </MenuItem>
                        </Link>

                        <Link to={`/order`}>
                          <MenuItem>
                            <ListItemIcon>
                              <FaClipboardCheck fontSize="small" />
                            </ListItemIcon>
                            Orders
                          </MenuItem>
                        </Link>

                        <MenuItem>
                          <ListItemIcon>
                            <Settings fontSize="small" />
                          </ListItemIcon>
                          Settings
                        </MenuItem>

                        <Divider />

                        <MenuItem onClick={handleLogout}>
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                    </>

                  </Button>
                  }
                  <div className="ml-auto cartTab" >
                    <span className="price">${cartTotal}</span>
                  </div>
                  <div className="position-relative ml-2">
                    <Link to={'/Cart'}> <Button className="btn circle circle2 ml-2"><IoBagOutline /></Button></Link>
                    <span className="count d-flex align-items-center justify-content-center">{cartCount}</span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </header>

        <Navigation catData={catData} />
      </div>



    </div>

  )
}

export default Header