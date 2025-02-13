import '@/styles/post-styles.css'

import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function Post({
  title,
  body,
  tags,
  datePosted,
  username,
  initialVote = null,
  initialLikes = 0,
  initialDislikes = 0,
  initialComments = 0,
}: {
  title: string;
  body: string;
  tags: string[];
  datePosted: Date;
  username: string;
  initialVote?: "up" | "down" | null;
  initialLikes?: number;
  initialDislikes?: number;
  initialComments?: number;
}) {
  const [vote, setVote] = useState<"up" | "down" | null>(initialVote);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [dislikeCount, setDislikeCount] = useState(initialDislikes);
  const [commentCount] = useState(initialComments);

  function handleDate(datePosted: Date): string {
    return "a day ago.";
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
      <div className="post-container">
        <Link to="/post" className="post-link">
          <div className="post-body">
            <div className="post-header">
              <h1>
                {title} &sdot;{" "}
                <span className="gray">{handleDate(datePosted)}</span>
              </h1>
              <p className="gray">Posted by {username}</p>
            </div>
            <div className="post-main">
              <p>{body}</p>
            </div>
            <div className="post-footer">
              {tags.map((tag, i) => (
                <span key={tag + i} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
        
        <div className="post-sidebar">
          <div className='sidebar-button'>
            <span className='count'>{likeCount}</span>
            <button
              className={`round-button ${
                vote === "up" ? "selected-up" : ""
              }`}
              onClick={handleUpvote}
            >
              <ThumbsUp className="icon" />
            </button>
          </div>

          <div className="sidebar-button">
            <button
              className={`round-button ${
                vote === "down" ? " selected-down" : ""
              }`}
              onClick={handleDownvote}>
              <ThumbsDown className="icon" />
            </button>
            <span className='count'>{dislikeCount}</span>
          </div>

          <div className="sidebar-button">
            <Link to="/post">
              <button className="round-button">
                <MessageCircle className="icon" />
              </button>
            </Link>
            <span className='count'>{commentCount}</span>
          </div>
        </div>
      </div>
  );
}
