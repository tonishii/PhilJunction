import Post from "@/components/post.tsx";
import SmallPost from "@/components/smallpost";
import { IPost } from "@/models/postType";

import { Flame } from "lucide-react";
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";

export default function Main() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [trendingPosts, setTrending] = useState<IPost[]>([]);
  const [votes, setVotes] =
    useState<{
      [key: string]: {
        initialLikes: number;
        initialDislikes: number;
        initialVote: boolean | null
      }
    }>({});

  async function getGeneralPosts() {
    try {
      const res = await fetch("http://localhost:3001/retrieveposts");
      const general = await res.json();

      if (!res.ok) {
        toast.error("A server error has occured when pulling general.");
        console.log(general.error);
      }

      setPosts(general);
    } catch (error: unknown) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  }

  async function addPosts() {
    try {
      const url = new URL("http://localhost:3001/retrievemoreposts");
      url.searchParams.set("curr_len", String(posts.length))
      console.log(posts.length, url)
      const res = await fetch(url, {
        method: "GET"
      });

      const addMore = await res.json();

      if (!res.ok) {
        toast.error("A server error has occured when pulling more posts.");
        console.log(addMore.error);
      }
      if (!addMore.length)
        toast.info("No more posts to load.");
      else
        setPosts(oldposts => [...oldposts, ...addMore]);
    } catch (error: unknown) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  }

  async function getPopularPosts() {
    try {
      const res = await fetch("http://localhost:3001/trendingposts");
      const popular = await res.json();

      if (!res.ok) {
        toast.error("A server error has occured when pulling popular.");
        console.log(popular.error);
      }

      setTrending(popular);
    } catch (error: unknown) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  useEffect(() => {
    getGeneralPosts();
    getPopularPosts();
  }, []);

  useEffect(() => {
    posts.forEach(async (post) => {
      const res = await fetch(`http://localhost:3001/retreivevote/${post.publicId}`);
      const data = await res.json();

      if (!res.ok) {
        toast.error("A server error has occured vote pull.");
      } else {
        setVotes(prevVotes => ({
          ...prevVotes,
          [post.publicId]: {
            initialLikes: data.initialLikes,
            initialDislikes: data.initialDislikes,
            initialVote: data.initialVote
          }
        }));
      }
    });
  }, [posts]);

  return (
    <div className="main-container">
      <div className="left-container"></div>
      <div className="general-container">
        {posts.map((post, i) => {
          const voteData = votes[post.publicId];

          if (!voteData) {
            return <div key={i}>Loading...</div>;
          }

          return (
            <Post
              key={i}
              post={post}
              initialLikes={voteData.initialLikes}
              initialDislikes={voteData.initialDislikes}
              initialVote={voteData.initialVote}
            />
          );
        })}
        <button onClick={addPosts}>Add More Posts</button>
      </div>

      { trendingPosts.length > 0 && (
        <div className="popular-posts-list">
          <span className="popular-posts-header">
            Trending Posts <Flame className="icon" />
          </span>
          {trendingPosts.map((i, j) => (
            <SmallPost key={j} post={i} />
          ))}
        </div>
      )}
    </div>
  );
}
