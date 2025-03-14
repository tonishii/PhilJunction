import '@/styles/post-styles.css'

import Comment from '@/components/comment';
import ImageCarousel from '@/components/imagecarousel';
import { useNavigate } from "react-router";
import { ThumbsUp, ThumbsDown, MessageCircle, CornerDownLeft } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import { IPost } from '@/models/postType';
import { IComment } from '@/models/commentType';
import { toast } from 'react-toastify';

export default function PostWindow({
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

  const [comments, setComments] = useState(post.comments);
  const [commentCount] = useState(post.comments.length);
  const [commentValue, setCommentValue] = useState("");

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(event.target.value);
  };

  const navigate = useNavigate();

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

  async function handleAddComment(event: React.KeyboardEvent<HTMLInputElement>): Promise<any> {
    if (event.key === "Enter" && commentValue.trim() !== "") {
      const newComment: IComment = {
        commentID: null,
        username: "Protea", // TENTATIVE NO USER LOGIC YET
        postDate: new Date(),
        body: commentValue,
        replyTo: post.postID,
        replies: []
      };

      try {
        const res = await fetch("http://localhost:3001/submitcomment", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: newComment.username,
            body: newComment.body,
            replyTo: newComment.replyTo
          }),
        });

        if (res.ok) {
          const resJson = await res.json();
          setComments([...comments, resJson.comment]);
          setCommentValue("");
        } else {
          const errorData = await res.json();
          toast.error("Server error:", errorData.message);
        }
      } catch (error) {
        toast.error("An error occurred while submitting the comment.");
      }
    }
  }

  const handleAddReply = (newReply: IComment, commentID: string) => {
    newReply.commentID = commentID;
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.commentID === newReply.replyTo
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );
  };

  const handleDeleteComment = (commentID: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.commentID !== commentID)
    );
  };

  const handleEditComment = (commentID: string, updatedBody: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.commentID === commentID
          ? { ...comment, body: updatedBody }
          : comment
      )
    );
  };

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

        {/* <ImageCarousel images={post.images} maxImages={3} /> WARNING THIS IS A BLOB!!!*/}
        <ReactMarkdown className="post-body" children={post.body} />
      </div>

      <div className="post-window-footer">
        <div className="post-button">
          <span className='count'>{likeCount}</span>
          <button
            className={`round-button ${vote === "up" ? "selected-up" : ""
              }`}
            onClick={handleUpvote}
          >
            <ThumbsUp className="icon" />
          </button>
        </div>

        <div className="post-button">
          <button
            className={`round-button ${vote === "down" ? " selected-down" : ""
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
        {comments.map((comment) =>
          <Comment
            comment={comment}
            isReplyable={true}
            onAddReply={handleAddReply}
            onDeleteComment={handleDeleteComment}
            onEditComment={handleEditComment} />
        )}
      </div>
    </div>
  );
}