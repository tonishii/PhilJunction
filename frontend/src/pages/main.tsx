import Post from "@/components/post.tsx";
import SmallPost from "@/components/smallpost";
import { useLocalStorage } from "@/hook/storage";
import { IPost } from "@/models/postType";

import { Flame } from "lucide-react";
import { useState, useEffect } from "react";

export default function Main() {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const resp = await fetch("http://localhost:3001/retrieveposts");
        console.log(resp);
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await resp.json();
        setPosts(data);
      } catch (error: unknown) {
        alert(`Server Error`);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="main-container">
      <div className="left-container"></div>
      <div className="general-container">
        {posts.map((i, j) => (
          <Post key={j} post={i} />
        ))}
      </div>

      <div className="popular-posts-list">
        <span className="popular-posts-header">
          Trending Posts <Flame className="icon" />
        </span>
        {posts.map((i, j) => (
          <SmallPost key={j} post={i} />
        ))}
      </div>
    </div>
  );
}
