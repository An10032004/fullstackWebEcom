import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { MyContext } from "../../App";
import pattern from "../../assets/images/pattern.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Button } from "@mui/material";
import googleicon from "../../assets/images/googleicon.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { MdHome } from "react-icons/md";
import { postData } from "../../utils/api";

const SignUp = () => {

    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const context = useContext(MyContext);

    const [formField,setFormField] = useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        confirmPassword:"",
        isAdmin:true
    })

    const navigate = useNavigate()

    useEffect(() => {
        context.setIsHideSidebarAndHeader(true);
        window.scrollTo(0,0);
    }, [])

    const focusInput = (index) => {
        setInputIndex(index);
    }
    const onChangeInput = (e) => {
        setFormField(() => ({
            ...formField,
            [e.target.name] : e.target.value
        }))
    }
    const signUp = (e) => {
        e.preventDefault()
       if (!formField.name || !formField.email || !formField.password) {
      context.showAlert("Vui lòng nhập đầy đủ thông tin!", "warning");
      return;
    }

    if (formField.password.length < 6) {
      context.showAlert("Mật khẩu phải từ 6 ký tự!", "error");
      return;
    }

    if (formField.password !== formField.confirmPassword) {
      context.showAlert("Mật khẩu nhập lại không khớp!", "error");
      return;
    }

    // 🔹 Nếu thành công
    postData('/api/user/signUp', formField).then(res => {
            context.showAlert("Đăng ký thành công!", "success");
            navigate('/login');
            setFormField({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            isAdmin: true,
    });
        })
    

    // 🔹 Reset form
    
    }
    return (
        <>
            <img src={pattern} className="login-patern" />
            <section className="login-section sign-up-section">
                <div className="row">
                    <div className="col-md-8 d-flex align-items-center flex-column part1 justify-content-center">
                        <h1>Best UX/UI Fashion <span className="text-sky"> Ecommerce Dashboard </span> & Admin Panel</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries</p>
                        <div className="w-100 mt-4">
                            <Link to={'/'}>
                                <Button className="btn-blue btn-lg btn-big"> <MdHome /> Go To Home</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-4 pr-0">
                        <div className="login-box">
                            <div className="logo text-center">
                                <img src={logo} alt="logo" width="60" />
                                <h5 className="font-weight-bold">Register A New Account</h5>
                            </div>
                            <div className="login-wrapper mt-3 card border">
                                <form onSubmit={signUp}>
                                    <div className={`form-group position-relative ${inputIndex === 0 && 'focus'}`}>
                                        <span className="icons"><FaUserCircle /></span>
                                        <input
                                            name="name"
                                            onChange={onChangeInput}
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Your Name"
                                            onFocus={() => focusInput(0)}
                                            onBlur={() => setInputIndex(null)}
                                            autoFocus
                                        />
                                    </div>
                                    <div className={`form-group position-relative ${inputIndex === 1 && 'focus'}`}>
                                        <span className="icons"><MdEmail /></span>
                                        <input
                                            name="email"
                                            onChange={onChangeInput}
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Your Email"
                                            onFocus={() => focusInput(1)}
                                            onBlur={() => setInputIndex(null)}
                                        />
                                    </div>
                                    <div className={`form-group position-relative ${inputIndex === 1 && 'focus'}`}>
                                        <span className="icons"><FaPhoneAlt /></span>
                                        <input
                                            name="phone"
                                            onChange={onChangeInput}
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Your Phone"
                                            onFocus={() => focusInput(2)}
                                            onBlur={() => setInputIndex(null)}
                                        />
                                    </div>
                                    <div className={`form-group position-relative ${inputIndex === 2 && 'focus'}`}>
                                        <span className="icons"><RiLockPasswordFill /></span>
                                        <input
                                            name="password"
                                            onChange={onChangeInput}
                                            type={`${isShowPassword === true ? 'text' : 'password'}`}
                                            className="form-control"
                                            placeholder="Enter Your Password"
                                            onFocus={() => focusInput(3)}
                                            onBlur={() => setInputIndex(null)}
                                        />
                                        <span className="toggle-show-password"
                                            onClick={() => setIsShowPassword(!isShowPassword)}>
                                            {
                                                isShowPassword === true ? <IoMdEyeOff /> : <IoMdEye />
                                            }
                                        </span>
                                    </div>
                                    <div className={`form-group position-relative ${inputIndex === 3 && 'focus'}`}>
                                        <span className="icons"><IoShieldCheckmarkSharp /></span>
                                        <input
                                            name="confirmPassword"
                                            onChange={onChangeInput}
                                            type={`${isShowConfirmPassword === true ? 'text' : 'password'}`}
                                            className="form-control"
                                            placeholder="Confirm Your Password"
                                            onFocus={() => focusInput(4)}
                                            onBlur={() => setInputIndex(null)}
                                        />
                                        <span className="toggle-show-password"
                                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
                                            {
                                                isShowConfirmPassword === true ? <IoMdEyeOff /> : <IoMdEye />
                                            }
                                        </span>
                                    </div>
                                    <FormControlLabel control={<Checkbox />} label="I agree to the all Terms & Condiotions" />
                                    <div className="form-group">
                                        <Button type="submit" className="btn-blue btn-big w-100">Sign Up</Button>
                                    </div>
                                    <div className="form-group text-center mb-0">
                                        <div className="d-flex align-items-center justify-content-center or mt-3 mb-3">
                                            <span className="line"></span>
                                            <span className="txt">OR</span>
                                            <span className="line"></span>
                                        </div>
                                        <Button variant="outlined" className="w-100 btn-big login-with-google">
                                            <img src={googleicon} width="25px" /> &nbsp; Sign In with Google
                                        </Button>
                                    </div>
                                </form>
                            </div>
                            <div className="login-wrapper mt-3 card border footer p-3">
                                <span className="text-center">
                                    Don't have an account?
                                    <Link to='/login' className="link color ml-2">Sign In</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUp
