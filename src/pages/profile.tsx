import { Link } from "react-router";

export default function Profile({
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
  return (
    <div className="profile-container">
      <div className="profile-body">
        <h1 className="profile-title">Profile</h1>
        <img src={icon} alt="icon" className="profile-icon"/>
        <h1 className="profile-username">{username}</h1>
        <p className="profile-email">{email}</p>
        <p className="profile-description">{description}</p>
      </div>

      {/* TENTATIVE FIGURING OUT ROUTING */}
      <div className="profile-sidebar">
        <Link to="/profile">
          <button className="gray-button"><span>Profile</span></button>
        </Link>
        <Link to="/profile/posts">
          <button className="gray-button"><span>Posts</span></button>
        </Link>
        <Link to="/profile/comments">
          <button className="gray-button"><span>Comments</span></button>
        </Link>
        <Link to="/profile/settings">
          <button className="gray-button"><span>Settings</span></button>
        </Link>
      </div>
    </div>
  );
}