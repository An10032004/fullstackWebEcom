import { BrowserRouter ,Route,Routes} from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from './Components/Header';
import Home from './Pages/Home'
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Components/Footer';
import Listing from './Pages/Listing';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ProductModal from './Components/ProductModal';
import { useSnackbar } from "notistack";
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
  useEffect(() =>{
    getCountry("https://open.oapi.vn/location/countries")
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
    user,setUser
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
        <Route path="/signIn" exact={true} element={<SignIn />}/>
        <Route path="/signUp" exact={true} element={<SignUp />}/>
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
