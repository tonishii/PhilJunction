import { Link, NavLink, Outlet } from "react-router";

export default function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-body">
        <Outlet />
      </div>

      <div className="profile-sidebar">
        <NavLink to="/profile" end className={({ isActive }) => (isActive ? "sidebar-button active" : "sidebar-button")}>
          <span>Profile</span>
        </NavLink>
        <NavLink to="/profile/posts" className={({ isActive }) => (isActive ? "sidebar-button active" : "sidebar-button")}>
          <span>Posts</span>
        </NavLink>
        <NavLink to="/profile/comments" className={({ isActive }) => (isActive ? "sidebar-button active" : "sidebar-button")}>
          <span>Comments</span>
        </NavLink>
        <NavLink to="/profile/settings" className={({ isActive }) => (isActive ? "sidebar-button active" : "sidebar-button")}>
          <span>Settings</span>
        </NavLink>
        <Link to="/login" className="sidebar-button">
          <span>Sign Out</span>
        </Link>
      </div>
    </div>
  );
}