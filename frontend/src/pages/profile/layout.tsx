import '@/styles/profile-styles.css'
import { Link, NavLink, Outlet } from "react-router";

export default function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-body">
          <Outlet />
        </div>
        <div className="profile-sidebar">
          <NavLink to="/user" end className={({ isActive }) => (isActive ? "sidebar-button active" : "sidebar-button")}>
            <span>Profile</span>
          </NavLink>
          <NavLink to="/user/posts" className={({ isActive }) => (isActive ? "sidebar-button active" : "sidebar-button")}>
            <span>Posts</span>
          </NavLink>
          <NavLink to="/user/comments" className={({ isActive }) => (isActive ? "sidebar-button active" : "sidebar-button")}>
            <span>Comments</span>
          </NavLink>
          <NavLink to="/user/settings" className={({ isActive }) => (isActive ? "sidebar-button active" : "sidebar-button")}>
            <span>Settings</span>
          </NavLink>
          <Link to="/auth/login" className="sidebar-button">
            <span>Sign Out</span>
          </Link>
        </div>
      </div>
    </div>
  );
}