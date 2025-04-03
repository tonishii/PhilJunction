import Post from "@/components/post.tsx";
import SmallPost from "@/components/smallpost";
import { AuthContext } from "@/hook/context";
import { IPost } from "@/models/postType";

import { Flame } from "lucide-react";
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Main() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [commentCount, setCommentCount] = useState<{ [key: string]: number }>({});
  const [trendingPosts, setTrending] = useState<IPost[]>([]);
  const [votes, setVotes] =
    useState<{
      [key: string]: {
        initialLikes: number;
        initialDislikes: number;
        initialVote: boolean | null
      }
    }>({});
  const [username, setUsername] = useContext(AuthContext);
  const navigate = useNavigate();

  function detectBottom() {
    // do nothing
  }

  async function getGeneralPosts() {
    try {
      const res = await fetch("http://localhost:3001/retrieveposts");
      const data = await res.json();

      if (!res.ok) {
        toast.error("A server error has occured when pulling general.");
        console.log(data.error);
      }

      setPosts(data.map((item: { post: IPost }) => item.post));
      setCommentCount(
        data.reduce((acc: { [key: string]: number }, item: { post: IPost; commentCount: number }) => {
          acc[item.post.publicId] = item.commentCount;
          return acc;
        }, {})
      );
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
    if (posts.length === 0) return;

    async function fetchVotes() {
      try {
        const postIds = posts.map(post => post.publicId).join(",");
        const res = await fetch(`http://localhost:3001/retrievevote?ids=${postIds}`);
        const data = await res.json();

        if (!res.ok) {
          if (res.status === 401) {
            if (username) toast.error("Session has expired!");
            else toast.error("Please log in first.");

            setUsername(null);
            navigate("/auth/login");
          } else {
            toast.error("Error retrieving votes.");
          }

          return;
        }

        setVotes(() => {
          return data.reduce((
            acc: {
              [key: string]: {
                initialLikes: number;
                initialDislikes: number;
                initialVote: boolean
              }
            }, post: any) => {
            acc[post.publicId] = {
              initialLikes: post.initialLikes,
              initialDislikes: post.initialDislikes,
              initialVote: post.initialVote,
            };
            return acc;
          }, {});
        });

      } catch (error) {
        toast.error("An error has occured while pulling votes.");
        console.error(error);
      }
    }

    fetchVotes();
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
              initialComments={commentCount[post.publicId]}
            />
          );
        })}
        <button className="add-post-button" onClick={addPosts} onScroll={detectBottom}>Add More Posts</button>
      </div>

      {trendingPosts.length > 0 && (
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
