import Post from "@/components/post.tsx";
import SmallPost from "@/components/smallpost";
import { useLocalStorage } from "@/hook/storage";
import { post1, post2, post3, post4, post5, post6 } from "@/mockdata/more-post-data";
import postData from "@/mockdata/post-data.ts";

import { Flame } from "lucide-react";
import { useEffect } from "react";

export default function Main() {
  const data = [postData, post1, post2, post3, post4, post5, post6];
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
        {[...Array(20)].map(() =>
          <Post key={Math.random() * data.length} post={data[
            Math.floor(Math.random() * data.length)]} />
        )}
      </div>

      <div className="popular-posts-list">
        <span className="popular-posts-header">Trending Posts <Flame className="icon" /></span>
        {[...Array(5)].map(() =>
          <SmallPost post={data[
            Math.floor(Math.random() * data.length)]} />
        )}
      </div>
    </div>
  );
}
