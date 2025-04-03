import '@/styles/auth-styles.css'

import Logo from "@/components/logo"
import { Link, Outlet } from "react-router"

export default function AuthLayout() {
  return (
    <>
      <style rel='stylesheet'>{".header {display:none}"}</style>

      <div className="auth-background">
        <div className="auth-center">
          <div className="auth-header">
            <Link to="/" className="header-link">
              <button className="auth-header-button">
                <Logo />
              </button>
              <h1 className="auth-header-text">PhilJunction!</h1>
            </Link>
            <i>Your one-stop transit forum</i>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  )
}