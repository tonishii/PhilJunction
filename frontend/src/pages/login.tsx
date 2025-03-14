import "@/styles/login-styles.css";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        const errorMessage = JSON.stringify(result, null, 2);
        toast.error(`${errorMessage || "Server Error"}`);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <form className="login-contents" onSubmit={login}>
      <label htmlFor="uname">Username: </label>
      <input type="text" id="uname" name="username" />
      <label htmlFor="pwrd">Password: </label>
      <input type="password" id="pwrd" name="password" />
      <button className="round-button" type="submit">
        Log In
      </button>
    </form>
  );
}
