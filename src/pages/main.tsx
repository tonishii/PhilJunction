import Post from "@/components/post.tsx";
import SmallPost from "@/components/smallpost";
import postData from "@/mockdata/post-data.ts";

import { Flame } from "lucide-react";

export default function Main() {
  return (
    <div className="main-container">
      <div></div>
      <div className="general-container">
        {[...Array(20)].map(() =>
          <Post post={postData}/>
        )}
      </div>

      <div className="popular-posts-list">
        <span className="popular-posts-header">Trending Posts <Flame className="icon"/></span>
        {[...Array(5)].map(() =>
          <SmallPost post={postData}/>
        )}
      </div>
    </div>
  );
}
