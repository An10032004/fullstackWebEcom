import Sidebar from "../../Components/Sidebar"
import Button from "@mui/material/Button"
import { IoIosMenu } from 'react-icons/io'
import { CgMenuGridR } from 'react-icons/cg'
import { HiViewGrid } from 'react-icons/hi'
import { TfiLayoutGrid4Alt } from 'react-icons/tfi'
import { FaAngleDown } from 'react-icons/fa'
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import {useState }from "react"
import ProductItem from "../../Components/ProductItem/productItem";
import Pagination from "@mui/material/Pagination"
const Listing = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView,setProductView] = useState('four')
  const openDropDowm = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <section className="product_Listing_Page">
        <div className="container-fluid" style={{ marginLeft: '70px' }}>
          <div className="productlisting d-flex">
            <Sidebar />

            <div className="content_right">
              <img alt="" src="https://dosi-in.com/file/detailed/383/dosiin-261743836_268519555294775_3808784598501987694_n383300.jpg?w=1200&h=500&fit=crop&fm=webp" className="w-100" style={{   borderRadius: '8px' }} />

              <div className="showBy mt-3 mb-3 d-flex align-items-center">
                <div className="d-flex align-items-center btnWrapper">
                  <Button onClick={() => setProductView('one')}><IoIosMenu /></Button>
                  <Button onClick={() => setProductView('two')}><HiViewGrid /></Button>
                  <Button onClick={() => setProductView('four')}><TfiLayoutGrid4Alt /></Button>
                  <Button onClick={() => setProductView('three')}><CgMenuGridR /></Button>
                </div>
                 <div className="ml-auto showByFilter">
                <Button onClick={handleClick}>Show 9 <FaAngleDown /></Button>
                <Menu
                  className="w-100 showPerPageDropdown"
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openDropDowm}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>11</MenuItem>
                  <MenuItem onClick={handleClose}>14</MenuItem>
                  <MenuItem onClick={handleClose}>15</MenuItem>
                </Menu>
              </div>
              </div>

            <div className="productlisting">
              <ProductItem itemView={productView}/>
              <ProductItem itemView={productView}/>
              <ProductItem itemView={productView}/>
              <ProductItem itemView={productView}/>
              <ProductItem itemView={productView}/>
              <ProductItem itemView={productView}/>
              <ProductItem itemView={productView}/>
              <ProductItem itemView={productView}/>
              <ProductItem itemView={productView}/>
              <ProductItem itemView={productView}/>
            </div>

            <div className="d-flex align-items-center justify-content-center">
              <Pagination count={10} color="primary" size="large"/>
            </div>


            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Listing