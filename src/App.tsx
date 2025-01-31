import React from "react";
import ReactDOM from "react-dom/client";
import Header from "@/components/header";
import Main from "@/pages/main";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Header />
    <Main />
  </React.StrictMode>
);
