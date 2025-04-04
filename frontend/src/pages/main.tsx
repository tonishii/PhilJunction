import Post from "@/components/post.tsx";
import SmallPost from "@/components/smallpost";
import PostSkeleton from "@skeleton/postSkeleton";
import SmallPostSkeleton from "@skeleton/smallPostSkeleton";

import { AuthContext } from "@/helpers/context";
import { makeServerURL } from "@/helpers/url";
import { IPost } from "@/models/postType";

import { Flame } from "lucide-react";
import { useState, useEffect, useContext } from 'react';
import { toast } from "react-toastify";

export default function Main() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [trendingPosts, setTrending] = useState<IPost[]>([]);
  const [commentCount, setCommentCount] = useState<{ [key: string]: number }>({});
  const [votes, setVotes] =
    useState<{
      [key: string]: {
        initialLikes: number;
        initialDislikes: number;
        initialVote: boolean | null
      }
    }>({});
  const [, setUsername] = useContext(AuthContext);

  function detectBottom() {
    // do nothing
  }

  async function getGeneralPosts() {
    try {
      const res = await fetch(makeServerURL(`retrieveposts`));
      const data = await res.json();

      if (!res.ok) {
        return;
      }

      setPosts(data.map((item: { post: IPost }) => item.post));
      setCommentCount(
        data.reduce((acc: { [key: string]: number }, item: { post: IPost; commentCount: number }) => {
          acc[item.post.publicId] = item.commentCount;
          return acc;
        }, {})
      );
    } catch (error: unknown) {
      console.error(error);
    }
  }

  async function addPosts() {
    try {
      const url = new URL(makeServerURL(`retrievemoreposts`));
      url.searchParams.set("curr_len", String(posts.length))
      const res = await fetch(url, {
        method: "GET"
      });

      const addMore = await res.json();

      if (!res.ok) {
        return;
      }
      if (!addMore.length) {
        toast.info("No more posts to load.");
      } else {
        setPosts(oldposts => [...oldposts, ...addMore]);
      }
    } catch (error: unknown) {
      console.error(error);
    }
  }

  async function getTrendingPosts() {
    try {
      const res = await fetch(makeServerURL(`trendingposts`));
      const trending = await res.json();

      if (!res.ok) {
        return;
      }

      setTrending(trending);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGeneralPosts();
    getTrendingPosts();
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;

    async function fetchVotes() {
      try {
        const postIds = posts.map(post => post.publicId).join(",");
        const res = await fetch(makeServerURL(`/retrievevote?ids=${postIds}`), {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          if (res.status === 401) {
            console.error("User is not logged in.");
            setUsername(null);
          }

          return;
        }

        setVotes((prevVotes) => {
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
            return { ...prevVotes, ...acc };
          }, {});
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchVotes();
  }, [posts]);

  return (
    <div className="main-container">
      <div className="left-container"></div>
      <div className="general-container">
        { posts && posts.length === 0 ? (
          <> {
            Array.from({ length: 5 }, (_, i) => (
              <PostSkeleton key={i} />
            ))} </>
        ) : (
          posts.map((post, i) => {
            const voteData = votes[post.publicId];

            if (!voteData) {
              return <PostSkeleton key={post.publicId + i} />;
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
          })
        )}
        <button className="add-post-button" onClick={addPosts} onScroll={detectBottom}>Add More Posts</button>
      </div>

      <div className="popular-posts-list">
        <span className="popular-posts-header">
          Trending Posts <Flame className="icon" />
        </span>
        { trendingPosts && trendingPosts.length === 0 ? (
          <> {
            Array.from({ length: 5 }, (_, i) => (
              <SmallPostSkeleton key={i} />
            ))} </>
        ) : (
          trendingPosts.map((post, i) => {
            return <SmallPost key={post.publicId + i} post={post} />;
          })
        )}
      </div>
    </div>
  );
}
