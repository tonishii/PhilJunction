import '@/styles/login-styles.css'
import { Link } from "react-router";

export default function SignUp() {
    return (
        <div className="login-background">
            <div className="signup-center">
                <div className="login-header">
                    <div className="login-header-text"> <img className="login-logo" src="src/assets/logo.svg" alt="PhilJunction Logo" /> PhilJunction!</div>
                    <div className='login-header-caption'>Your one-stop transit forum</div>
                    <div className='login-signup'> <Link to="/login" className='login-signup'>Log In</Link> | <span className='bolded-text'>Sign Up</span> </div>
                </div>
                <div className='login-content-container'>
                    <form className='signup-contents'>
                        <label htmlFor="uname">New Username: </label>
                        <input type="text" id="uname" name="username" />
                        <label htmlFor="email">Email Address: </label>
                        <input type="text" id="email" name="username" />
                        <label htmlFor="pwrd">Password: </label>
                        <input type="password" id="pwrd" name="password" />
                        <label htmlFor="cfrmpwrd">Confirm Password: </label>
                        <input type="password" id="cfrmpwrd" name="password" />
                    </form>
                    <Link to="/" className="link-tag"><button className='login-button'>Sign Up</button></Link>
                </div>
            </div>
        </div>
    );
}