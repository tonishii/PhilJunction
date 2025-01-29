import React from "react";
import ReactDOM from "react-dom/client";
import Header from "@layout/Header";
import Post from "./components/ui/Post";

const root = ReactDOM.createRoot(document.getElementById("header"));
root.render(
  <React.StrictMode>
    <Header />
    <main>
      <Post title={"hello world"} body={"glasses are really versitile"} tags={["hi", "hello"]} datePosted={new Date()} user={"me"} />
      <Post title={"hello world"} body={"glasses are really versitile"} tags={["hi", "hello"]} datePosted={new Date()} user={"me"} /><Post title={"hello world"} body={"glasses are really versitile"} tags={["hi", "hello"]} datePosted={new Date()} user={"me"} /><Post title={"hello world"} body={"glasses are really versitile"} tags={["hi", "hello"]} datePosted={new Date()} user={"me"} /><Post title={"hello world"} body={"glasses are really versitile"} tags={["hi", "hello"]} datePosted={new Date()} user={"me"} />
    </main>
  </React.StrictMode>
);