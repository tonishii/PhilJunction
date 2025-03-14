import { UserRoundPen } from "lucide-react";
import { NavLink } from "react-router";

export default function ProfileInfo({
  icon,
  username,
  email,
  description
}: {
    icon?: string | undefined;
    username: string;
    email?: string | undefined;
    description?: string | undefined;
}) {
  return(
    <div>
      <div className="profile-icon-container">
        <img src={icon} alt="icon" className="profile-icon"/>
        <NavLink to="/user/settings">
          <button className="edit-button">
            <UserRoundPen className="icon"/>
          </button>
        </NavLink>
      </div>
      <h1 className="profile-username">{username}</h1>
      <p className="profile-email">{email}</p>
      <p className="profile-description">{description}</p>
    </div>
  );
}