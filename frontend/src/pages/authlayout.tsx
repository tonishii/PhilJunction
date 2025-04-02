import '@/styles/login-styles.css'

import Logo from "@/components/logo"
import { Outlet } from "react-router"

export default function AuthLayout() {
  return (
    <>
      <style rel='stylesheet'>{".header {display:none}"}</style>

      <div className="auth-background">
        <div className="auth-center">
          <div className="auth-header">
            <div className="auth-header-text">
              <Logo /> PhilJunction!
            </div>
            <i>Your one-stop transit forum</i>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  )
}