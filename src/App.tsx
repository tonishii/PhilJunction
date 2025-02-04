import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router";

import Header from "@/components/header";
import Main from "@/pages/main";
import Profile from "@/pages/profile";
import PostWindow from "./pages/postwindow";

import profileData from "@/assets/profile-data.ts";
import postData from "@/assets/post-data.ts";
import profileIcon from "@/assets/profile-icon.png";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={
          <Profile
            icon={profileIcon}
            username={profileData.username}
            email={profileData.email}
            description={profileData.description}/>
          } />

        <Route path="/post" element={
          <PostWindow
            title={postData.title}
            body={postData.body}
            tags={postData.tags}
            datePosted={postData.datePosted}
            username={postData.username}
            comments={postData.comments}/>}
          />
      </Routes>
    </Router>
  </React.StrictMode>
);
