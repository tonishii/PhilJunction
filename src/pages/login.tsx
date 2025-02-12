import '@/styles/login-styles.css'
import { Link } from 'react-router'

export default function Login() {
    return (
        <div className="login-background">
            <div className="login-center">
                <div className="login-header">
                    <div className="login-header-text"> <img className="login-logo" src="src/assets/logo.svg" alt="PhilJunction Logo" /> PhilJunction!</div>
                    <div className='login-header-caption'>Your one-stop transit forum</div>
                    <div className='login-signup'> <span className='bolded-text'>Log In</span> | <Link to="/signup" className='login-signup'>Sign Up</Link>  </div>
                </div>
                <div className='login-content-container'>
                    <form className='login-contents'>
                        <label htmlFor="uname">Username: </label>
                        <input type="text" id="uname" name="username" />
                        <label htmlFor="pwrd">Password: </label>
                        <input type="password" id="pwrd" name="password" />
                    </form>
                    <Link to="/" className="link-tag"><button className='login-button'>Log In</button></Link>
                </div>
            </div>
        </div>
    );
}