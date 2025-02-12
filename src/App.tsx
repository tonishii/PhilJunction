import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router";

import Header from "@/components/header";
import Main from "@/pages/main";
import PostWindow from "@/pages/postwindow";
import Profile from "@/pages/profile";
import ProfileInfo from "./pages/ProfileInfo";
import UserPosts from  "@/pages/UserPosts";
import UserComments from  "@/pages/UserComments";
import Settings from  "@/pages/Settings";
import Login from "@/pages/login"

import profileData from "@/assets/profile-data";
import postData from "@/assets/post-data";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile/>}>
          <Route index element={
            <ProfileInfo
              icon={profileData.icon}
              username={profileData.username}
              email={profileData.email}
              description={profileData.description}/>}
            />
          <Route path="/profile/posts" element={<UserPosts />} />
          <Route path="/profile/comments" element={<UserComments />} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>

        <Route path="/post" element={
          <PostWindow
            title={postData.title}
            body={postData.body}
            tags={postData.tags}
            datePosted={postData.datePosted}
            username={postData.username}
            comments={postData.comments}/>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
