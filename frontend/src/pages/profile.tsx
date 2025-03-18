import "@/styles/profile-styles.css";

import { useEffect, useState } from "react";
import { useParams, Link, NavLink, Route, Routes, useNavigate } from "react-router";

import ProfileInfo from "@profile/info";
import Settings from "@profile/settings";
import UserComments from "@profile/comments";
import UserPosts from "@profile/posts";
import { IUser } from "@/models/userType";
import { toast } from "react-toastify";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`http://localhost:3001/user/${username}`);
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 404) {
          toast.info("Can't find that person!")
          navigate("/");
        } else {
          toast.error("An error has occured.");
          console.log(data.message);
        }
      } else {
        setUser(data.user);
        console.log(data);
      }
    }

    fetchUser();
  }, [username]);

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-body">
          {user ? (
            <Routes>
              <Route index element={<ProfileInfo user={user} />} />
              <Route path="posts" element={<UserPosts user={user} />} />
              <Route path="comments" element={<UserComments user={user} />} />
              <Route path="settings" element={<Settings user={user} setUser={setUser} />} />
            </Routes>
          ) : <p className="error">Loading...</p>}
        </div>
        <div className="profile-sidebar">
          <NavLink to={`/user/${username}`} end className={({ isActive }) => (isActive ? "sidebar-button active" : "sidebar-button")}>
            <span>Profile</span>
          </NavLink>
          <NavLink to={`/user/${username}/posts`} className={({ isActive }) => (isActive ? "sidebar-button active" : "sidebar-button")}>
            <span>Posts</span>
          </NavLink>
          <NavLink to={`/user/${username}/comments`} className={({ isActive }) => (isActive ? "sidebar-button active" : "sidebar-button")}>
            <span>Comments</span>
          </NavLink>
          <NavLink to={`/user/${username}/settings`} className={({ isActive }) => (isActive ? "sidebar-button active" : "sidebar-button")}>
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