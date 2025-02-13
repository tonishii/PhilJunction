import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router, Routes, Route } from "react-router";

import Header from "@/components/header";
import Main from "@/pages/main";
import PostWindow from "@/pages/postwindow";
import Profile from "@/pages/profile/layout";
import ProfileInfo from "./pages/profile/info";
import UserPosts from "@/pages/profile/posts";
import UserComments from "@/pages/profile/comments";
import Settings from "@/pages/profile/settings";
import Login from "./pages/login";
import SignUp from "./pages/signup";

import userCommentData from "@/mockdata/user-comments-data";
import profileData from "@/mockdata/profile-data";
import postData from "@/mockdata/post-data";
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />}>
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
          <Route path="/profile/posts" element={<UserPosts />} />
          <Route path="/profile/comments" element={<UserComments userComments={userCommentData}/>} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>

        <Route
          path="/post"
          element={
            <PostWindow
              title={postData.title}
              body={postData.body}
              tags={postData.tags}
              datePosted={postData.datePosted}
              username={postData.username}
              comments={postData.comments}
            />
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
