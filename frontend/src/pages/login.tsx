import "@/styles/auth-styles.css";
import { AuthContext } from "@/helpers/context";
import { useContext, useRef, useState } from "react";

import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { makeServerURL } from "@/helpers/url";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const recaptcha = useRef<ReCAPTCHA | null>(null);
  const navigate = useNavigate();
  const [isDisabled, setDisabled] = useState(false);
  const [, setUsername] = useContext(AuthContext);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const captchaVal = recaptcha.current?.getValue();

    if (!captchaVal) {
      toast.error('Please complete the reCAPTCHA!');
      return;
    }

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

    const formData = new FormData(e.target as HTMLFormElement);
    const trimmedData = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => {
        return [key, value.toString().trim()];
      })
    );

    try {
      setDisabled(true);
      const response = await fetch(makeServerURL(`login`), {
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
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <form className="login-contents" onSubmit={login}>
        <label htmlFor="uname">Username</label>
        <input type="text" id="uname" name="username" />
        <label htmlFor="pwrd">Password</label>
        <input type="password" id="pwrd" name="password" />

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

      <p className="auth-msg-link">New to PhilJunction? <Link className="auth-link" to="/auth/signup">Sign up</Link></p>
    </>
  );
}
