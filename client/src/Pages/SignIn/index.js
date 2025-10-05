import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/images/Logo.png';
import GG from '../../assets/images/ggImg.jpg';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { postData } from "../../utils/api";


const SignIn = () => {
    const context = useContext(MyContext);

    useEffect(() => {
  context.setIsHeaderFooterShow(false);
  return () => context.setIsHeaderFooterShow(true);
}, []);

      const [formField,setFormField] = useState({
                email:"",
                password:"",
                isAdmin:false
            })
                const navigate = useNavigate()

      const onChangeInput = (e) => {
                setFormField(() => ({
                    ...formField,
                    [e.target.name] : e.target.value
                }))
            }
            const signin = (e) => {
                e.preventDefault()
                if (!formField.email || !formField.password) {
          context.showAlert("Vui lòng nhập đầy đủ thông tin!", "warning");
          return;
        }
    
        if (formField.password.length < 6) {
          context.showAlert("Mật khẩu phải từ 6 ký tự!", "error");
          return;
        }
        
           
    
            // 🔹 Nếu thành công
            postData('/api/user/signin', formField).then(res => {
                
                    localStorage.setItem("token",res?.token) 
    
                    const user = {
                        name:res?.user?.name,
                        email:res?.user?.email,
                        userId:res?.user?.id,
                        isAdmin: res?.user?.isAdmin || false,
                    }
                    localStorage.setItem("user",JSON.stringify(user)) 
                    
                    context.showAlert("Đăng Nhapthành công!", "success");
                    navigate('/');
                    setFormField({
                    email: "",
                    password: "",
                    isAdmin: false,
            });
        })}
    return (
        <div className="signInWrapper">
            <div className="signInBox">
                <img src={Logo} alt="Shopify Logo" className="logo" />
                <h2>Sign In</h2>
                <form className="signInForm" onSubmit={signin}>
                    <TextField

                        label="Email *"
                        name="email"
                        type="email"
                        variant="standard"
                        fullWidth
                        placeholder="Enter your email"
                        sx={{ pt: 1.5, pb: 1.5 }}
                        onChange={onChangeInput}
                    />
                    <TextField
                        name="password"
                        label="Password *"
                        type="password"
                        variant="standard"
                        fullWidth
                        placeholder="Enter your password"
                        className="mt-3"
                        sx={{ pt: 1.5, pb: 1.5 }}
                                                onChange={onChangeInput}

                    />
                    <div className="forgotContainer">
                        <Link to="/forgot-password" className="forgot">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="d-flex align-items-center mt-3 mb-3">
                        <Button type="submit" className="btn-blue col btn-lg btn-big">Sign In</Button>
                        <Link to="/">
                            <Button className="btn-lg btn-big col ml-3" variant="outlined" onClick={() => context.setIsHeaderFooterShow(true)}>Cancel</Button>
                        </Link>
                    </div>
                   
                    <p >
                        Not Registered? <Link to="/signUp" className="border-effect">Sign Up</Link>
                    </p>

                    <h4 className="mt-2 text-center">Or continue with social account</h4>
                    <Button className="loginWithGoogle mt-2" variant="outlined">
                    <img src={GG} alt="" /> Sign In with Google
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
