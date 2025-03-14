import '@/styles/post-styles.css'

import ImageCarousel from './imagecarousel';
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import { IPost } from '@/models/postType';

export default function Post({
  post,
  initialVote = null,
  initialLikes = 0,
  initialDislikes = 0,
}: {
  post: IPost;
  initialVote?: "up" | "down" | null;
  initialLikes?: number;
  initialDislikes?: number;
}) {
  const [vote, setVote] = useState<"up" | "down" | null>(initialVote);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [dislikeCount, setDislikeCount] = useState(initialDislikes);
  const [commentCount] = useState(post.comments.length ?? 0);

  function handleDate(datePosted: Date): string {
    return moment(datePosted).fromNow();
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

  function handleDownvote(): void {
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
      <div className="post-body">
        <div className="post-header">
          <Link to={`/post/${post.publicId}`} className="post-link">
            <h1>
              {post.title} &sdot;{" "}
              <span className="gray">{handleDate(post.postDate)}</span>
            </h1>
          </Link>
          <p className="gray">Posted by {post.username}</p>
        </div>

        <div className="post-main">
          <ReactMarkdown className="post-body" children={post.body} />
          <div className="matchWidth">
            {/* <ImageCarousel images={post.images} maxImages={1} /> WARNING PLEASE FIX THIS IS BLOB!!!*/}
          </div>

        </div>
        <div className="post-footer">
          {post.tags.map((tag, i) => (
            <span key={tag + i} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="post-sidebar">
        <div className='post-button'>
          <span className='count'>{likeCount}</span>
          <button
            className={`round-button ${vote === "up" ? "selected-up" : ""}`}
            onClick={handleUpvote}
          >
            <ThumbsUp className="icon" />
          </button>
        </div>

        <div className="post-button">
          <button
            className={`round-button ${vote === "down" ? " selected-down" : ""}`}
            onClick={handleDownvote}>
            <ThumbsDown className="icon" />
          </button>
          <span className='count'>{dislikeCount}</span>
        </div>

        <div className="post-button">
          <Link to={`/post/${post.publicId}`}>
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
