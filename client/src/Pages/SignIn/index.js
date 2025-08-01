import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import Logo from '../../assets/images/Logo.png';
import GG from '../../assets/images/ggImg.jpg';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const SignIn = () => {
    const context = useContext(MyContext);

    useEffect(() => {
        context.setIsHeaderFooterShow(false);
    }, [context]);

    return (
        <div className="signInWrapper">
            <div className="signInBox">
                <img src={Logo} alt="Shopify Logo" className="logo" />
                <h2>Sign In</h2>
                <form className="signInForm">
                    <TextField

                        label="Email *"
                        type="email"
                        variant="standard"
                        fullWidth
                        placeholder="Enter your email"
                        sx={{ pt: 1.5, pb: 1.5 }}
                    />
                    <TextField

                        label="Password *"
                        type="password"
                        variant="standard"
                        fullWidth
                        placeholder="Enter your password"
                        className="mt-3"
                        sx={{ pt: 1.5, pb: 1.5 }}
                    />
                    <div className="forgotContainer">
                        <Link to="/forgot-password" className="forgot">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="d-flex align-items-center mt-3 mb-3">
                        <Button className="btn-blue col btn-lg btn-big">Sign In</Button>
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
