import '@/styles/post-styles.css'

import type { Post } from "@/mockdata/post-data";
import Comment from '@/components/comment';
import { CornerDownLeft } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function PostWindow({
  post,
  initialVote = null,
  initialLikes = 0,
  initialDislikes = 0,
}: {
  post: Post;
  initialVote?: "up" | "down" | null;
  initialLikes?: number;
  initialDislikes?: number;
}) {

  const [vote, setVote] = useState<"up" | "down" | null>(initialVote);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [dislikeCount, setDislikeCount] = useState(initialDislikes);
  const [commentCount] = useState(post.comments.length);

  let navigate = useNavigate();

  function handleDate(datePosted: Date): string {
    return "a day ago"
  }

  function handleUpvote(): void {
    if (vote === "up") {
      setVote(null);
      setLikeCount(likeCount - 1);
    } else {
      setVote("up");
      setLikeCount(likeCount + 1);

      if (vote === "down") {
        setDislikeCount(dislikeCount - 1);
      }
    }
  }

  function handleDownvote(): void{
    if (vote === "down") {
      setVote(null);
      setDislikeCount(dislikeCount - 1);
    } else {
      setVote("down");
      setDislikeCount(dislikeCount + 1);

      if (vote === "up") {
        setLikeCount(likeCount - 1);
      }
    }
  }

  return (
    <div className="post-window-container">
      <div className="post-window-header">
        <div className="post-window-header-info">
          <h1>{post.title} &sdot; {" "}
            <span className="gray">{handleDate(post.postDate)}</span>
          </h1>

          <button
            className="round-button"
            onClick={() => navigate(-1)}>
            <CornerDownLeft className="icon" />
          </button>
        </div>

        <p className="gray">Posted by {post.username}</p>
      </div>

      <div className="post-window-main">
         {post.tags.map((tag, i) => (
          <span key={tag + i} className="tag">
            {tag}
          </span>
        ))}
        <div className="post-image-container">
          {post.images.map(imagePath => (
            <img src={imagePath} alt="post image" className="post-image" />
          ))}
        </div>
        <p>{post.body}</p>
      </div>

      <div className="post-window-footer">
        <span className='count'>{likeCount}</span>
        <button
          className={`round-button ${
            vote === "up" ? "selected-up" : ""
          }`}
          onClick={handleUpvote}
        >
          <ThumbsUp className="icon" />
        </button>

        <button
          className={`round-button ${
            vote === "down" ? " selected-down" : ""
          }`}
          onClick={handleDownvote}>
          <ThumbsDown className="icon" />
        </button>
        <span className='count'>{dislikeCount}</span>

        <button className="round-button">
          <MessageCircle className="icon" />
        </button>
        <span className='count'>{commentCount}</span>

        <button className='addcomment-button'>Add a Comment</button>
      </div>

      <div className="post-window-comments">
        <h1>Comments</h1>

        {post.comments.map(comment => <Comment comment={comment}/> )}
      </div>
    </div>
  );
}