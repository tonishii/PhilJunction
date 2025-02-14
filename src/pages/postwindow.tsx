import '@/styles/post-styles.css'

import type { Post } from "@/mockdata/post-data";
import Comment from '@/components/comment';
import ImageCarousel from '@/components/imagecarousel';
import { useNavigate } from "react-router";
import { ThumbsUp, ThumbsDown, MessageCircle, CornerDownLeft } from "lucide-react";
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
  const [comments, setComments] = useState(post.comments);
  const [commentCount] = useState(post.comments.length);
  const [commentValue, setCommentValue] = useState("");

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(event.target.value);
  };

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

  function handleAddComment(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter" && commentValue.trim() !== "") {
      const newComment = {
        username: "JamesPH", // TENTATIVE NO USER LOGIC YET
        replyTo: post.username,
        postDate: new Date(),
        id: comments.length + 1,
        content: commentValue,
        replies: []
      };

      setComments([...comments, newComment]);
      setCommentValue("");
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
            <CornerDownLeft className="icon black" />
          </button>
        </div>

        <p className="gray">Posted by {post.username}</p>
      </div>

      <div className="post-window-main">
        <div className="tag-list">
          {post.tags.map((tag, i) => (
            <span key={tag + i} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <ImageCarousel images={post.images} maxImages={3}/>

        <p>{post.body}</p>
      </div>

      <div className="post-window-footer">
        <div className="post-button">
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

        <div className="post-button">
          <button
            className={`round-button ${
              vote === "down" ? " selected-down" : ""
            }`}
            onClick={handleDownvote}>
            <ThumbsDown className="icon" />
          </button>
          <span className='count'>{dislikeCount}</span>
        </div>

        <div className="post-button">
          <button className="round-button">
            <MessageCircle className="icon" />
          </button>
          <span className='count'>{commentCount}</span>
        </div>

        <input
          type="text"
          placeholder="Add a Comment"
          id="comment-input"
          className="comment-input"
          onChange={handleCommentChange}
          onKeyDown={handleAddComment}
          value={commentValue}
        />
      </div>

      <div className="post-window-comments">
        <h1>Comments</h1>
        {comments.map(comment => <Comment comment={comment} isReplyable={true}/> )}
      </div>
    </div>
  );
}