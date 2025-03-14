import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="user/:username/*" element={<Profile />} />
        <Route path="search" element={<SearchPage />} />

        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route path="post" element={<PostWindow post={{
        postID: "61cfe7b5f5201a001f3e47e1",
        username: "TransportGuru",
        title: "Best Tips for Long-Distance Trucking",
        postDate: new Date("2025-03-15T10:30:00Z"),
        body: "Long-distance trucking can be challenging, but with the right tools and mindset, you can make the journey much easier. Here are some tips: 1) Plan your route ahead of time. 2) Keep your truck in top condition. 3) Stay hydrated and take regular breaks. 4) Be mindful of traffic and weather conditions.",
        images: [],
        tags: ["trucking", "long-distance", "transportation", "tips", "road safety"],
        likes: 120,
        dislikes: 5,
        comments: [
          {
            commentID: "61cfe7b5f5201a001f3e47e2",
            username: "TruckDriverMike",
            postDate: new Date("2025-03-15T11:00:00Z"),
            body: "Great tips! I always make sure to take regular breaks and check my truck. The road conditions can be unpredictable.",
            replyTo: "61cfe7b5f5201a001f3e47e1",
            replies: []
          },
          {
            commentID: "61cfe7b5f5201a001f3e47e3",
            username: "CargoQueen",
            postDate: new Date("2025-03-15T11:15:00Z"),
            body: "Planning your route is key. I always use apps like Google Maps and Waze to avoid traffic jams.",
            replyTo: "61cfe7b5f5201a001f3e47e1",
            replies: [
              {
                commentID: "61cfe7b5f5201a001f3e47e4",
                username: "TruckDriverMike",
                postDate: new Date("2025-03-15T11:30:00Z"),
                body: "Definitely, those apps are lifesavers for real-time traffic data.",
                replyTo: "61cfe7b5f5201a001f3e47e3",
                replies: []
              }
            ]
          }
        ]
      }} />} /> {/*THIS IS DYNAMIC POST */}
        <Route path="holler" element={<CreatePost />} />
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
