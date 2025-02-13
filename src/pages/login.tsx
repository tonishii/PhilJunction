import "@/styles/login-styles.css";

import { Link } from "react-router";

export default function Login() {
  return (
    <form className="login-contents">
      <label htmlFor="uname">Username: </label>
      <input type="text" id="uname" name="username" />
      <label htmlFor="pwrd">Password: </label>
      <input type="password" id="pwrd" name="password" />
      <Link to="/" className="link-tag">
        <button className="round-button">Log In</button>
      </Link>
    </form>
  );
}
