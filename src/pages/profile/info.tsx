import { UserRoundPen } from "lucide-react";

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
      <h1 className="profile-title">Profile</h1>
      <div className="profile-icon-container">
        <img src={icon} alt="icon" className="profile-icon"/>
        <button className="edit-button">
          <UserRoundPen className="icon"/>
        </button>
      </div>
      <h1 className="profile-username">{username}</h1>
      <p className="profile-email">{email}</p>
      <p className="profile-description">{description}</p>
    </div>
  );
}