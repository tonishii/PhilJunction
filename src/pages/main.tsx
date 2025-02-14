import Post from "@/components/post.tsx";
import SmallPost from "@/components/smallpost";
import { post1 } from "@/mockdata/more-post-data";
import postData from "@/mockdata/post-data.ts";

import { Flame } from "lucide-react";

export default function Main() {
  const data = [postData, post1]
  return (
    <div className="main-container">
      <div className="left-container">
      </div>
      <div className="general-container">
        {[...Array(20)].map(() =>
          <Post post={data[
            Math.floor(Math.random() * data.length)]} />
        )}
      </div>

      <div className="popular-posts-list">
        <span className="popular-posts-header">Trending Posts <Flame className="icon" /></span>
        {[...Array(5)].map(() =>
          <SmallPost post={postData} />
        )}
      </div>
    </div>
  );
}
