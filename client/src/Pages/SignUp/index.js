import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import Logo from '../../assets/images/Logo.png';
import GG from '../../assets/images/Logo.png';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignUp = () => {
  const context = useContext(MyContext);

  useEffect(() => {
    context.setIsHeaderFooterShow(false);
  }, [context]);

  return (
    <div className="signInWrapper">
      <div className="signInBox" style={{ height: '700px' }}>
        <img src={Logo} alt="Shopify Logo" className="logo" />
        <h2>Sign Up</h2>

        <form className="signInForm">
          <div className="formRow" style={{ display: "flex", gap: "1rem" }}>
            <TextField
              label="Name *"
              type="text"
              variant="standard"
              fullWidth
                                      sx={{ pt: 1.5, pb: 1.5 }}

            />
            <TextField
              label="Phone No. *"
              type="tel"
              variant="standard"
              fullWidth
                                      sx={{ pt: 1.5, pb: 1.5 }}

            />
          </div>

          <TextField
            label="Email *"
            type="email"
            variant="standard"
            fullWidth
                                    sx={{ pt: 1.5, pb: 1.5 }}

         
          />
          <TextField
            label="Password *"
            type="password"
            variant="standard"
            fullWidth
                                    sx={{ pt: 1.5, pb: 1.5 }}

        
          />

          <div className="forgotContainer" style={{ textAlign: "right", marginTop: 8 }}>
            <Link to="/forgot-password" className="forgot">
              Forgot Password?
            </Link>
          </div>

           <div className="d-flex align-items-center mt-3 mb-3">
                        <Button className="btn-blue col btn-lg btn-big">Sign Up</Button>
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
