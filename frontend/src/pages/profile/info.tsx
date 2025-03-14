import { UserRoundPen } from "lucide-react";
import { NavLink } from "react-router";
import { IUser } from "@/models/userType";

export default function ProfileInfo({ user }: { user: IUser; }) {
  return (
    <div className="profile-info">
      <div className="profile-icon-container">
        <img src={user.icon} alt="icon" className="profile-icon"/>
        <NavLink to="/user/settings">
          <button className="edit-button">
            <UserRoundPen className="icon"/>
          </button>
        </NavLink>
      </div>
      <h1 className="profile-username">{user.username}</h1>
      <p className="profile-email">{user.email}</p>
      <p className="profile-description">{user.description}</p>
    </div>
  );
}