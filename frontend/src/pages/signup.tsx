import '@/styles/login-styles.css'
import { Link } from "react-router";

export default function SignUp() {
  return (
    <form className='signup-contents'>
      <label htmlFor="uname">New Username: </label>
      <input type="text" id="uname" name="username" />
      <label htmlFor="email">Email Address: </label>
      <input type="text" id="email" name="username" />
      <label htmlFor="pwrd">Password: </label>
      <input type="password" id="pwrd" name="password" />
      <label htmlFor="cfrmpwrd">Confirm Password: </label>
      <input type="password" id="cfrmpwrd" name="password" />
      
      <Link to="/" className="link-tag">
        <button className='round-button'>Sign Up</button>
      </Link>
    </form>
  );
}