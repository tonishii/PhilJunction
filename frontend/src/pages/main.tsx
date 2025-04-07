import Post from "@/components/post.tsx";
import SmallPost from "@/components/smallpost";
import PostSkeleton from "@skeleton/postSkeleton";
import SmallPostSkeleton from "@skeleton/smallPostSkeleton";

import { AuthContext } from "@/helpers/context";
import { makeServerURL } from "@/helpers/url";
import { IPost } from "@/models/postType";

import { Flame } from "lucide-react";
import { useState, useEffect, useContext } from 'react';

interface InitialPost {
  publicId: string;
  initialLikes: number;
  initialDislikes: number;
  initialVote: boolean;
}

export default function Main() {
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [trendingPosts, setTrending] = useState<IPost[] | null>(null);
  const [commentCount, setCommentCount] = useState<{ [key: string]: number }>({});
  const [isDisabled, setDisabled] = useState(false);
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

      if (!data) {
        setPosts([]);
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

  async function getTrendingPosts() {
    try {
      const res = await fetch(makeServerURL(`trendingposts`));
      const trending = await res.json();

      if (!res.ok) {
        return;
      }

      if (!trending) {
        setTrending([]);
        return;
      }

      setTrending(trending);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  async function addPosts() {
    try {
      if (!posts) return;

      const url = new URL(makeServerURL(`retrievemoreposts`));
      url.searchParams.set("curr_len", String(posts.length))
      const res = await fetch(url, {
        method: "GET"
      });

      const data = await res.json();

      if (!res.ok) {
        return;
      }

      if (!data.more) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }

      setPosts(oldposts => [...oldposts ?? [], ...data.posts]);
    } catch (error: unknown) {
      console.error(error);
    }
  }

  useEffect(() => {
    getGeneralPosts();
    getTrendingPosts();
  }, []);

  useEffect(() => {
    async function fetchVotes() {
      try {
        if (!posts || posts.length === 0) return;

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
            }, post: InitialPost) => {
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
  }, [posts, setPosts, setUsername]);

  // useEffect(() => {
  //   console.log(posts);
  //   console.log(trendingPosts);
  // }, [posts, trendingPosts]);

  return (
    <div className="main-container">
      <div className="left-container"></div>
      <div className="general-container">
        { !posts ? (
          <> {
            Array.from({ length: 5 }, (_, i) => (
              <PostSkeleton key={i} />
            ))} </>
        ) : posts.length === 0 ? (
            <p className="empty empty-posts text1-color">No posts yet!</p>
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

        { !isDisabled && <button
          className="add-post-button"
          disabled={isDisabled}
          onClick={addPosts}
          onScroll={detectBottom}>Add More Posts</button> }
      </div>

      { trendingPosts === null ? (
        <div className="popular-posts-list">
          <span className="popular-posts-header">
            Trending Posts <Flame className="icon" />
          </span>
          {Array.from({ length: 5 }, (_, i) => (
            <SmallPostSkeleton key={i} />
          ))}
        </div>
      ) : trendingPosts?.length > 0 ? (
        <div className="popular-posts-list">
          <span className="popular-posts-header">
            Trending Posts <Flame className="icon" />
          </span>
          {trendingPosts.map((post, i) => (
            <SmallPost key={post.publicId + i} post={post} />
          ))}
        </div>
      ) : (<div className="empty-trending"></div>)}
    </div>
  );
}
