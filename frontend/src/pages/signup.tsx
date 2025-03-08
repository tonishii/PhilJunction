import '@/styles/login-styles.css'
import { redirect, useNavigate  } from "react-router";

interface NewUserData {
  username: string,
  email: string,
  password: string,
  confirmPW: string
}

export default function SignUp() {
  const navigate = useNavigate(); 

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const data = Object.fromEntries(formData.entries());
    console.log(data);

    if(formData.get("password") !== formData.get("confirmPW")) {
      alert("bro check your pw");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      const result = await response.json();

      if(response.ok) {
        navigate("/");
      }
      else {
        const errorMessage = JSON.stringify(result, null, 2);
        alert(`Error: ${errorMessage || "Error"}`);
      }
    }
    catch (error: any) {
      console.log('yikes', error);
    }
  }

  return (
    <form className='signup-contents' onSubmit={register}>
      <label htmlFor="uname">New Username: </label>
      <input type="text" id="uname" name="username" />
      <label htmlFor="eml">Email Address: </label>
      <input type="text" id="eml" name="email" />
      <label htmlFor="pwrd">Password: </label>
      <input type="password" id="pwrd" name="password" />
      <label htmlFor="cfrmpwrd">Confirm Password: </label>
      <input type="password" id="cfrmpwrd" name="confirmPW" />
      
      <button className='round-button' type="submit">Sign Up</button>
      {/* 
      <Link to="/" className="link-tag">
        <button className='round-button'>Sign Up</button>
      </Link>*/}
    </form>
  );
}