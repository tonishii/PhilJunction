import SmallPost from "@/components/smallpost";

import { IUser } from "@/models/userType";
import { IPost } from "@/models/postType";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function UserPosts({ user }: { user: IUser; }) {
  const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
      async function fetchPosts() {
        const res = await fetch(`http://localhost:3001/user/${user.username}/posts`);
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
          console.log(data.message);
        } else {
          toast.error("An error has occured.");
          console.error(data.message);
        }
      }

      fetchPosts();
    }, [user]);

  return (
    <div className="user-posts-container">
      {(posts.length > 0) ? posts.map((post, i) =>
        <SmallPost key={post.publicId + i} post={post}/>
      ) : (
        <p className="error">No posts found!</p>
      )}
    </div>
  );
}