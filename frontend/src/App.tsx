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
import RandoUser from "./pages/randouser";

function App() {
  // USE FOR TESTING
  // useEffect(() => {
  //   fetch("http://localhost:3001/")
  //     .then((res) => res.text())
  //     .then((data) => console.log("[RESPONSE]:", data))
  //     .catch((error) => console.error("[ERROR] Failed to connect:", error));
  // }, []);


  document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") ?? "light");

  return (
    <Router>
      <Header />
      <ToastContainer
        autoClose={3000}
        transition={Slide}/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="user" element={<RandoUser />} />
        <Route path="user/:username/*" element={<Profile />} />
        <Route path="search" element={<SearchPage />} />

        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route path="/post/:publicId" element={<PostWindow isEditable={true} />} />

        <Route path="/holler" element={<CreatePost />} />
        <Route path="/holler/:publicId?" element={<CreatePost />}/>
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
