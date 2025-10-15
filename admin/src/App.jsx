import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './responsive.css';
import Dashboard from "./pages/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { createContext } from "react";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductUpload from "./pages/ProductUpload/ProductUpload";
import CategoryAdd from './pages/CategoryAdd/CategoryAdd'
import Categories from "./pages/Category/Category";
import { Snackbar } from "@mui/material";

import { SnackbarProvider,
     useSnackbar } from 'notistack';
import EditCategory from "./pages/CategoryAdd/CategoryEdit";
import ProductEdit from "./pages/ProductUpload/ProductEdit";
import AddSubcategory from "./pages/CategoryAdd/CategoryEdit";
import AdminOrders from "./pages/Orders/Order";
const MyContext = createContext();

function AppContent() {

    const [isToggleSidebar, setIsToggleSidebar] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isOpenNav, setIsOpenNav] = useState(false);
    const [themeMode, setThemeMode] = useState(localStorage.getItem('themeMode') === 'dark');
    const [baseUrl,setBaseUrl] = useState("http://localhost:4000")
    const [user,setUser] = useState({
        name:"",
        email:""
    })
    useEffect(() => {
        if (themeMode) {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
            localStorage.setItem('themeMode', 'dark');
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
            localStorage.setItem('themeMode', 'light');
        }
    }, [themeMode]);

    // const [themeMode, setThemeMode] = useState(true);

    // useEffect(()=>{
    //     if(themeMode===true){
    //         document.body.classList.remove('dark');
    //         document.body.classList.add('light');
    //         localStorage.setItem('themeMode','light');
    //     }else{
    //         document.body.classList.remove('light');
    //         document.body.classList.add('dark');
    //         localStorage.setItem('themeMode','dark'); 
    //     }
    // },[themeMode]);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
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
    
    const openNav = () => {
        setIsOpenNav(true);
    };
        const { enqueueSnackbar } = useSnackbar();

    const showAlert = (message, variant = "default") => {
    enqueueSnackbar(message, { variant });
  };
    
    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('This is a success message!', { variant });
    };
    const values = {
        isToggleSidebar,
        setIsToggleSidebar,
        isLogin,
        setIsLogin,
        isHideSidebarAndHeader,
        setIsHideSidebarAndHeader,
        themeMode,
        setThemeMode,
        windowWidth,
        openNav,
        isOpenNav,
        setIsOpenNav,
        handleClickVariant,
        setBaseUrl,
        baseUrl,
        showAlert,
        user,
        setUser
    };

    return (
        <>
            <BrowserRouter>
                <MyContext.Provider value={values}>
                    {
                        isHideSidebarAndHeader !== true &&
                        <Header />
                    }
                    <div className="main d-flex">
                        {
                            isHideSidebarAndHeader !== true &&(
                            <>
                                <div className={`side-bar-overlay d-none ${isOpenNav === true ? 'show' : ''}`} 
                                    onClick={()=>setIsOpenNav(false)}>
                                </div>
                                <div className={`sidebar-wrapper ${isToggleSidebar === true ? 'toggle' : ''} 
                                    ${isOpenNav === true ? 'open' : ''}`}>
                                    <Sidebar />
                                </div>
                            </>
                        )}
                        <div className={`content ${isHideSidebarAndHeader === true && 'full'} 
                            ${isToggleSidebar === true ? 'toggle' : ''}`}>
                            <Routes>
                                <Route path="/" exact={true} element={<Dashboard />} />
                                <Route path="/dashboard" exact={true} element={<Dashboard />} />
                                <Route path="/login" exact={true} element={<Login />} />
                                <Route path="/signUp" exact={true} element={<SignUp />} />
                                <Route path="/products" exact={true} element={<Products />} />
                                <Route path="/product/details/:id" exact={true} element={<ProductDetails />} />
                                <Route path="/product/upload" exact={true} element={<ProductUpload />} />
                                <Route path="/product/edit/:id" exact={true} element={<ProductEdit />} />
                                <Route path="/category/add" exact={true} element={<CategoryAdd />} />
                                <Route path="/category/edit/:id" exact={true} element={<EditCategory />} />
                                <Route path="/category" exact={true} element={<Categories />} />
                                <Route path="/category/edit-subCat" exact={true} element={<AddSubcategory />} />
                                <Route path="/order" exact={true} element={<AdminOrders />} />
                            </Routes>
                        </div>
                    </div>
                    
                </MyContext.Provider>
            </BrowserRouter>
        </>
    )
}

function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <AppContent />
    </SnackbarProvider>
  );
}

export default App;
export { MyContext }
