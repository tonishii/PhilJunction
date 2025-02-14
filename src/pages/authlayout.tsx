import '@/styles/login-styles.css'

import Logo from "@/components/logo"
import { Link, Outlet } from "react-router"

export default function AuthLayout() {
  return (
    <>
      <style rel='stylesheet'>{".header {display:none}"}</style>
      <div className="login-background">
        <div className="login-center">
          <div className="login-header">
            <div className="login-header-text">
              <Logo className="login-logo" /> PhilJunction!
            </div>
            <div className="login-header-caption">
              Your one-stop transit forum
            </div>
            <div className="login-signup">
              {" "}
              <Link to="/auth/login" className="login-signup">
                Log In
              </Link> |{" "}
              <Link to="/auth/signup" className="login-signup">
                Sign Up
              </Link>{" "}
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </>
  )
}