import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './responsive.css';
import Dashboard from "./pages/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductUpload from "./pages/ProductUpload/ProductUpload";
import CategoryAdd from './pages/CategoryAdd/CategoryAdd'
import Categories from "./pages/Category/Category";
import EditCategory from "./pages/CategoryAdd/CategoryEdit";
import ProductEdit from "./pages/ProductUpload/ProductEdit";
import AddSubcategory from "./pages/CategoryAdd/CategoryEdit";
import AdminOrders from "./pages/Orders/Order";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { fetchDataFromApi } from "./utils/api";

export const MyContext = createContext();

function AppContent() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [checkingLogin, setCheckingLogin] = useState(true); // trạng thái check token
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [themeMode, setThemeMode] = useState(localStorage.getItem('themeMode') === 'dark');
  const [baseUrl,setBaseUrl] = useState("http://localhost:4000")
  const [user,setUser] = useState({ name:"", email:"" })
  const [stats, setStats] = useState({ totalProducts: 0, totalPrice: 0, totalFeatured: 0 });
  const [countUser,setCountUser] = useState(0)

  // check theme
  useEffect(() => {
    document.body.classList.toggle('dark', themeMode);
    document.body.classList.toggle('light', !themeMode);
  }, [themeMode]);

  // check window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // check token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      setIsLogin(true);
      const userObj = JSON.parse(localStorage.getItem("user") || '{}');
      setUser(userObj);
    } else {
      setIsLogin(false);
    }
    setCheckingLogin(false);
  }, []);

  const openNav = () => setIsOpenNav(true);
  const { enqueueSnackbar } = useSnackbar();
  const showAlert = (message, variant = "default") => enqueueSnackbar(message, { variant });

  // fetch stats
  useEffect(() => {
    fetchDataFromApi("/api/products?all=true").then((res) => {
      const products = Array.isArray(res) ? res : res.productList || [];
      setStats({
        totalProducts: products.length,
        totalPrice: products.reduce((sum, item) => sum + (item.price || 0), 0),
        totalFeatured: products.filter(p => p.isFeatured).length
      });
    });

    fetchDataFromApi("/api/user/get/count").then((res) => {
      setCountUser(res?.userCount || 0)
    });
  }, []);

  const values = {
    isToggleSidebar, setIsToggleSidebar,
    isLogin, setIsLogin,
    checkingLogin,
    isHideSidebarAndHeader, setIsHideSidebarAndHeader,
    themeMode, setThemeMode,
    windowWidth,
    openNav, isOpenNav, setIsOpenNav,
    showAlert,
    user, setUser,
    stats, setStats,
    countUser, setCountUser
  };

  if(checkingLogin) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {!isHideSidebarAndHeader && <Header />}
        <div className="main d-flex">
          {!isHideSidebarAndHeader && (
            <>
              <div className={`side-bar-overlay d-none ${isOpenNav ? 'show' : ''}`} onClick={()=>setIsOpenNav(false)}></div>
              <div className={`sidebar-wrapper ${isToggleSidebar ? 'toggle' : ''} ${isOpenNav ? 'open' : ''}`}>
                <Sidebar />
              </div>
            </>
          )}
          <div className={`content ${isHideSidebarAndHeader ? 'full' : ''} ${isToggleSidebar ? 'toggle' : ''}`}>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={ <Login /> } />
              <Route path="/signUp" element={!isLogin ? <SignUp /> : <Navigate to="/" replace />} />

              {/* Private routes */}
              <Route path="/" element={isLogin ? <Dashboard /> : <Navigate to="/login" replace />} />
              <Route path="/dashboard" element={isLogin ? <Dashboard /> : <Navigate to="/login" replace />} />
              <Route path="/products" element={isLogin ? <Products /> : <Navigate to="/login" replace />} />
              <Route path="/product/details/:id" element={isLogin ? <ProductDetails /> : <Navigate to="/login" replace />} />
              <Route path="/product/upload" element={isLogin ? <ProductUpload /> : <Navigate to="/login" replace />} />
              <Route path="/product/edit/:id" element={isLogin ? <ProductEdit /> : <Navigate to="/login" replace />} />
              <Route path="/category/add" element={isLogin ? <CategoryAdd /> : <Navigate to="/login" replace />} />
              <Route path="/category/edit/:id" element={isLogin ? <EditCategory /> : <Navigate to="/login" replace />} />
              <Route path="/category" element={isLogin ? <Categories /> : <Navigate to="/login" replace />} />
              <Route path="/category/edit-subCat" element={isLogin ? <AddSubcategory /> : <Navigate to="/login" replace />} />
              <Route path="/order" element={isLogin ? <AdminOrders /> : <Navigate to="/login" replace />} />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <AppContent />
    </SnackbarProvider>
  )
}
