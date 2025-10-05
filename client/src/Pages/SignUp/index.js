import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/images/Logo.png';
import GG from '../../assets/images/Logo.png';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { postData } from "../../utils/api";

const SignUp = () => {
  const context = useContext(MyContext);

  useEffect(() => {
    context.setIsHeaderFooterShow(false);
  }, [context]);

  const [formField,setFormField] = useState({
          name:"",
          email:"",
          phone:"",
          password:"",
          confirmPassword:"",
          isAdmin:false
      })
  
      const navigate = useNavigate()
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
              navigate('/signin');
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
    <div className="signInWrapper">
      <div className="signInBox" style={{ height: '700px' }}>
        <img src={Logo} alt="Shopify Logo" className="logo" />
        <h2>Sign Up</h2>

        <form className="signInForm" onSubmit={signUp}>
          <div className="formRow" style={{ display: "flex", gap: "1rem" }}>
            <TextField
              label="Name *"
              name="name"
              type="text"
              variant="standard"
              fullWidth
                                      sx={{ pt: 1.5, pb: 1.5 }}
                                      onChange={onChangeInput}

            />
            <TextField
              label="Phone No. *"
              name="phone"
              type="tel"
              variant="standard"
              fullWidth
                                      sx={{ pt: 1.5, pb: 1.5 }}
                                      onChange={onChangeInput}

            />
          </div>

          <TextField
            label="Email *"
            name="email"
            type="email"
            variant="standard"
            fullWidth
                                    sx={{ pt: 1.5, pb: 1.5 }}
                                    onChange={onChangeInput}

         
          />
          <TextField
            label="Password *"
            type="password"
            name="password"
            variant="standard"
            fullWidth
                                    sx={{ pt: 1.5, pb: 1.5 }}
                                    onChange={onChangeInput}

        
          />
          <TextField
            label="ConfirmPassword *"
            type="confirmPassword"
            name="confirmPassword"
            variant="standard"
            fullWidth
                                    sx={{ pt: 1.5, pb: 1.5 }}
                                    onChange={onChangeInput}

        
          />

          <div className="forgotContainer" style={{ textAlign: "right", marginTop: 8 }}>
            <Link to="/forgot-password" className="forgot">
              Forgot Password?
            </Link>
          </div>

           <div className="d-flex align-items-center mt-3 mb-3">
                        <Button type="submit" className="btn-blue col btn-lg btn-big">Sign Up</Button>
                        <Link to="/">
                            <Button className="btn-lg btn-big col ml-3" variant="outlined" onClick={() => context.setIsHeaderFooterShow(true)}>Cancel</Button>
                        </Link>
                    </div>
         <p >
                       Has Account <Link to="/signIn" className="border-effect">Sign In</Link>
                    </p>

          <div style={{ marginTop: 16, textAlign: "center", fontWeight: 500 }}>
            Or continue with social account
          </div>

          <Button className="loginWithGoogle mt-2" variant="outlined">
                    <img src={GG} alt="" /> Sign In with Google
                    </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
