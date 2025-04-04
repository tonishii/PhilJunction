import "@/styles/auth-styles.css";
import { AuthContext } from "@/helpers/context";
import { Link, useNavigate } from "react-router";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import ReCAPTCHA from 'react-google-recaptcha';
import { makeServerURL } from "@/helpers/url";

export default function SignUp() {
  const recaptcha = useRef<ReCAPTCHA | null>(null);
  const navigate = useNavigate();
  const [isDisabled, setDisabled] = useState(false);
  const [, setUsername] = useContext(AuthContext);

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const captchaVal = recaptcha.current?.getValue();

    if (!captchaVal) {
      toast.error('Please verify the reCAPTCHA!');
    } else {
      const res = await fetch(makeServerURL('verify'), {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ captchaVal: captchaVal }),
      })

      if (!res.ok) {
        toast.error('reCAPTCHA validation failed!');
        return;
      }
    }

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
      setDisabled(true);
      const response = await fetch(makeServerURL(`register`), {
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
        if (response.status === 400) {
          toast.error((await response.json()).message);
        } else {
          toast.error("An error has occured.");
        }
      }
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <form className="signup-contents" onSubmit={register}>
        <label htmlFor="uname">New Username</label>
        <input type="text" id="uname" name="username" />
        <label htmlFor="eml">Email Address</label>
        <input type="text" id="eml" name="email" />
        <label htmlFor="pwrd">Password</label>
        <input type="password" id="pwrd" name="password" />
        <label htmlFor="cfrmpwrd">Confirm Password</label>
        <input type="password" id="cfrmpwrd" name="confirmPW" />

        <ReCAPTCHA
          ref={recaptcha}
          theme="dark"
          sitekey={import.meta.env.VITE_APP_SITE_KEY} />

        <button
          className="round-button auth-submit-button"
          type="submit"
          disabled={isDisabled}>
            Continue
        </button>
      </form>

      <p className="auth-msg-link">Already have an account? <Link className="auth-link" to="/auth/login">Log In</Link></p>
    </>
  );
}
