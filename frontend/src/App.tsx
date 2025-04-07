import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Slide, ToastContainer } from "react-toastify";

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
import Profile from "@pages/profile";
import FourOFourPage from "@pages/error";
import About from "@/pages/about";
import ContextProviders from "@components/contextprovider";

const toastDuration = 2000;
const MemoizedToastContainer = React.memo(ToastContainer);

export default function App() {
  return (
    <ContextProviders>
      <Router>
        <Header />
        <MemoizedToastContainer
          autoClose={toastDuration}
          transition={Slide}
          theme={localStorage.getItem("theme") ?? "light"} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="user/:username/*" element={<Profile />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="about" element={<About />} />
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          <Route path="/post/:publicId" element={<PostWindow />} />
          <Route path="/holler/:publicId?" element={<CreatePost />} />
          <Route path="*" element={<FourOFourPage />} />
        </Routes>
      </Router>
    </ContextProviders>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
