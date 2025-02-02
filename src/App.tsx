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

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post" element={<PostWindow />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
