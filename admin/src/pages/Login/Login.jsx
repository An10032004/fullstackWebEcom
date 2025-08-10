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
import { Link } from "react-router-dom";

const Login = () => {

    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const context = useContext(MyContext);

    useEffect(() => {
        context.setIsHideSidebarAndHeader(true);
    }, [])

    const focusInput = (index) => {
        setInputIndex(index);
    }

    return (
        <>
            <img src={pattern} className="login-patern" />
            <section className="login-section">
                <div className="login-box">
                    <div className="logo text-center">
                        <Link to='/dashboard'><img src={logo} alt="logo" width="60" /></Link>
                        <h5 className="font-weight-bold">Login to Hotash</h5>
                    </div>
                    <div className="login-wrapper mt-3 card border">
                        <form>
                            <div className={`form-group position-relative ${inputIndex === 0 && 'focus'}`}>
                                <span className="icons"><MdEmail /></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Your Email"
                                    onFocus={() => focusInput(0)}
                                    onBlur={() => setInputIndex(null)}
                                    autoFocus
                                />
                            </div>
                            <div className={`form-group position-relative ${inputIndex === 1 && 'focus'}`}>
                                <span className="icons"><RiLockPasswordFill /></span>
                                <input
                                    type={`${isShowPassword === true ? 'text' : 'password'}`}
                                    className="form-control"
                                    placeholder="Enter Your Password"
                                    onFocus={() => focusInput(1)}
                                    onBlur={() => setInputIndex(null)}
                                />
                                <span className="toggle-show-password"
                                    onClick={() => setIsShowPassword(!isShowPassword)}>
                                    {
                                        isShowPassword === true ? <IoMdEyeOff /> : <IoMdEye />
                                    }
                                </span>
                            </div>
                            <div className="form-group">
                                <Button className="btn-blue btn-big w-100">Sign In</Button>
                            </div>
                            <div className="form-group text-center mb-0">
                                <Link top='/forgot-password' className="link">FORGOT PASSWORD</Link>
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
                            <Link to='/signUp' className="link color ml-2">Register</Link> 
                        </span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;
