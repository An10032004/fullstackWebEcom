import { BrowserRouter ,Route,Routes} from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from './Components/Header';
import Home from './Pages/Home'
import { createContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Footer from './Components/Footer';
import Listing from './Pages/Listing';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ProductModal from './Components/ProductModal';
import { useSnackbar } from "notistack";
import { fetchDataFromApi, postData } from './utils/api';
import WishList from './Pages/MyList';
import Checkout from './Pages/Checkout';
import Orders from './Pages/Orders';
import Account from './Pages/Account';
const MyContext = createContext()

function App() {
  const [countryList,setCountryList] = useState([])
  const [selectedCountry,setselectedCountry] = useState('')
  const [isOpenProductModal,setIsOpenProductModal] = useState({
    id:'',
    open:false,
  })
  const [user,setUser] = useState({
        name:"",
        email:""
    })
  const { enqueueSnackbar } = useSnackbar(); // hook của notistack

    
  const showAlert = (message, type = "default") => {
    enqueueSnackbar(message, { variant: type });
  };
  const [isHeaderFooterShow,setIsHeaderFooterShow] = useState(true)
  const [isLogin,setIsLogin] = useState(false)
  const [cartData,setCartData] = useState([])
  const [cartList,setCartList] = useState([])
   const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const [searchData,setSearchData] = useState([])

  const addToCart = (data) => {
  if (!data || Object.keys(data).length === 0) {
    showAlert("Cart data is empty!", "error");
    return;
  }

  postData(`/api/cart/add`, data)
    .then((res) => {
      if (res?.success) {
        showAlert("Added to cart successfully!", "success");
        setCartData((prev) => [...prev, res.cartList]);
      }else if(res?.cart) {
        showAlert("product already added", "warning");
      } else {
        showAlert("Failed to add to cart", "error");
      }
    })
    .catch((err) => {
      console.error("Error adding to cart:", err);
      showAlert("Server error", "error");
    });
};
  useEffect(() =>{
    getCountry("https://open.oapi.vn/location/countries")
    fetchDataFromApi(`/api/cart`).then((res) => {
      setCartList(res.cartList)
    })
  },[])

  useEffect(() => {
        const token = localStorage.getItem("token")
        if(token!== null && token !== ""){
            setIsLogin(true)

            const userObj = JSON.parse(localStorage.getItem("user"))
            setUser(userObj)
        }else{
            setIsLogin(false)
        }
    },[isLogin])

    const [orderData,setOrderData] = useState([])

    useEffect(() => {
  fetchDataFromApi(`/api/order`).then((res) => {
    console.log("Orders API response:", res);
    if (Array.isArray(res)) {
      setOrderData(res); // nếu API trả thẳng mảng
    } else if (Array.isArray(res.orders)) {
      setOrderData(res.orders); // nếu có field "orders"
    } else {
      setOrderData([]); // fallback an toàn
    }
  });
}, []);

useEffect(() => {
   fetchDataFromApi(`/api/cart`).then((res) => {
    setCartData(res.cartList || []);
   });
      
},[])


  const values={
    countryList,
    selectedCountry,
    setselectedCountry,
    isOpenProductModal,
    setIsOpenProductModal,
    isHeaderFooterShow,
    setIsHeaderFooterShow,
    isLogin,setIsLogin,
    showAlert,
    user,setUser,
    cartData,
    setCartData,
    addToCart,
    cartCount,
    setCartCount,
    cartTotal,
    setCartTotal,
    cartList,setCartList,
    orderData,setOrderData,
    searchData,setSearchData
  }

  

  const getCountry= async (url) => {
     await axios.get(url).then((res) => {
      setCountryList(res.data.data)
      
    })
  }
  return (
   <BrowserRouter>
   <MyContext.Provider value={values}>
      { isHeaderFooterShow ===true && <Header  />}
      <Routes>
        <Route path="/" exact={true} element={<Home />}/>
        <Route path="/cat/:id" exact={true} element={<Listing />}/>
        <Route path="/product/:id" exact={true} element={<ProductDetails />}/>
        <Route path="/cart" exact={true} element={<Cart />}/>
        <Route path="/myList" exact={true} element={<WishList />}/>
        <Route path="/checkout" exact={true} element={<Checkout />}/>
        <Route path="/signIn" exact={true} element={<SignIn />}/>
        <Route path="/signUp" exact={true} element={<SignUp />}/>
        <Route path="/order" exact={true} element={<Orders />}/>
        <Route path="/search" exact={true} element={<Listing />}/>
        <Route path="/my-account" exact={true} element={<Account />}/>
      </Routes>
      { isHeaderFooterShow ===true && <Footer  />}
      { isOpenProductModal.open && <ProductModal 
            />}
      </MyContext.Provider>
   </BrowserRouter>
  );
}


export default App;
export {MyContext}
