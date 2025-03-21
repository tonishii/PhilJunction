import "@/styles/login-styles.css";

import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const trimmedData = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => {
        return [key, value.toString().trim()];
      })
    );

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimmedData),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/");
        toast.info(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <>
      <form className="login-contents" onSubmit={login}>
        <label htmlFor="uname">Username: </label>
        <input type="text" id="uname" name="username" />
        <label htmlFor="pwrd">Password: </label>
        <input type="password" id="pwrd" name="password" />

        <button className="round-button auth-submit-button" type="submit">
          Continue
        </button>
      </form>

      <p className="auth-msg-link">New to PhilJunction? <Link className="auth-link" to="/auth/signup">Sign up</Link></p>
    </>
  );
}
