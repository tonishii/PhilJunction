import { AuthContext } from "@/hook/context";
import "@/styles/login-styles.css";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();
  const [, setUsername] = useContext(AuthContext);

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    /*const data = Object.fromEntries(formData.entries());
    console.log(data);*/

    if (formData.get("password") !== formData.get("confirmPW")) {
      toast.error("Invalid: Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      if (response.ok) {
        setUsername(formData.get("username") as string);
        navigate("/");
      } else {
        toast.error("An error has occured.");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <form className="signup-contents" onSubmit={register}>
      <div>
        <label htmlFor="uname">New Username: </label>
        <input type="text" id="uname" name="username" />
      </div>
      <div>
        <label htmlFor="eml">Email Address: </label>
        <input type="text" id="eml" name="email" />
      </div>
      <div>
        <label htmlFor="pwrd">Password: </label>
        <input type="password" id="pwrd" name="password" />
      </div>
      <div>
        <label htmlFor="cfrmpwrd">Confirm Password: </label>
        <input type="password" id="cfrmpwrd" name="confirmPW" />
      </div>

      <button className="round-button authsubmit-button" type="submit">
        Sign Up
      </button>
    </form>
  );
}
