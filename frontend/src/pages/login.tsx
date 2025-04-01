import { AuthContext } from "@/hook/context";
import "@/styles/login-styles.css";
import { useContext } from "react";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [, setUsername] = useContext(AuthContext);

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
        credentials: "include",
        body: JSON.stringify(trimmedData),
      });

      const data = await response.json();
      if (response.ok) {
        setUsername(formData.get("username") as string);
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
    <form className="login-contents" onSubmit={login}>
      <div>
        <label htmlFor="uname">Username: </label>
        <input type="text" id="uname" name="username" />
      </div>
      <div>
        <label htmlFor="pwrd">Password: </label>
        <input type="password" id="pwrd" name="password" />
      </div>
      <button className="round-button authsubmit-button" type="submit">
        Log In
      </button>
    </form>
  );
}
