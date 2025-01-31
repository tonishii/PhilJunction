export default function Profile({
  // icon,
  username,
  email,
  description
}: {
    // icon: string;
    username?: string;
    email?: string;
    description?: string;
}) {
  return (
    <div>
      {/* This is for future profile icon
       <img src={icon} alt="icon" /> */}
      <h1 className="profile-text">Profile</h1>
      <h1>{username}</h1>
      <p>{username}</p>
      <p className="description-text">{description}</p>

      <button className="gray-button"><span>Posts</span></button>
      <button className="gray-button"><span>Comments</span></button>
      <button className="gray-button"><span>Settings</span></button>
    </div>
  );
}