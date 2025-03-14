import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router";

// Components
import Header from "@components/header";

// Pages
import AuthLayout from "@pages/authlayout";
import CreatePost from "@pages/createpost";
import Login from "@pages/login";
import Main from "@pages/main";
import PostWindow from "@pages/postwindow";
import SearchPage from "@pages/searchpage";
import SignUp from "@pages/signup";

// Profile Pages
import Profile from "@profile/layout";
import ProfileInfo from "@profile/info";
import Settings from "@profile/settings";
import UserComments from "@profile/comments";
import UserPosts from "@profile/posts";

// Mock Data
import postData from "@mockdata/post-data";
import profileData from "@mockdata/profile-data";
import userCommentData from "@mockdata/user-comments-data";


function App() {
  // USE FOR TESTING
  // useEffect(() => {
  //   fetch("http://localhost:3001/")
  //     .then((res) => res.text())
  //     .then((data) => console.log("[RESPONSE]:", data))
  //     .catch((error) => console.error("[ERROR] Failed to connect:", error));
  // }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="user" element={<Profile />}>
          <Route
            index
            element={
              <ProfileInfo
                icon={profileData.icon}
                username={profileData.username}
                email={profileData.email}
                description={profileData.description}
              />
            }
          />
          <Route path="posts" element={<UserPosts />} />
          <Route path="comments" element={<UserComments userComments={userCommentData} />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="search" element={<SearchPage />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="post" element={<PostWindow post={postData} />} />
        <Route path="holler" element={<CreatePost />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);