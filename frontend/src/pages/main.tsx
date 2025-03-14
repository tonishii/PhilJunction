import Post from "@/components/post.tsx";
import SmallPost from "@/components/smallpost";
import { useLocalStorage } from "@/hook/storage";
import { post1, post2, post3, post4, post5, post6 } from "@/mockdata/more-post-data";
import postData from "@/mockdata/post-data.ts";
import { Post as mockPosts } from "@/mockdata/post-data.ts";

import { Flame } from "lucide-react";
import { useState, useEffect } from 'react';

export default function Main() {
  const [posts, setPosts] = useState<mockPosts[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const resp = await fetch('http://localhost:3001/retrieveposts');
        console.log(resp);
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await resp.json();
        setPosts(data);
      }
      catch (error: any) {
        alert(`Server Error`);
      }
    }
    getPosts();
  }, []);
  const [theme] = useLocalStorage("theme", "light");

  useEffect(() => {
    console.log(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="main-container">
      <div className="left-container">
      </div>
      <div className="general-container">
        {posts.map((i, j) =>
          <Post key={j} post={i} />
        )}
      </div>

      <div className="popular-posts-list">
        <span className="popular-posts-header">Trending Posts <Flame className="icon" /></span>
        {posts.map((i, j) =>
          <SmallPost key={j} post={i} />
        )}
      </div>
    </div>
  );
}
