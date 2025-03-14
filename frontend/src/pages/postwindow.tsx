import "@/styles/post-styles.css";

import Comment from "@/components/comment";
import ImageCarousel from "@/components/imagecarousel";
import { useNavigate, useParams } from "react-router";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  CornerDownLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import { IPost } from "@/models/postType";
import { IComment } from "@/models/commentType";

export default function PostWindow() {
  const { postId } = useParams();
  const [postData, setPostData] = useState<IPost | null>(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:3001/retrievepost/${postId}`);
      if (response.ok) {
        const data = await response.json();
        setPostData(data);
      } else {
        console.log(response);
      }
    }
    fetchData();
  }, [postId]);

  const [vote, setVote] = useState<"up" | "down" | null>("up");
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  // const [comments, setComments] = useState({});
  const [commentCount] = useState(0);
  const [commentValue, setCommentValue] = useState("");

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(event.target.value);
  };

  const navigate = useNavigate();

  function handleDate(datePosted: Date = new Date()): string {
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
  /*
    function handleAddComment(
      event: React.KeyboardEvent<HTMLInputElement>
    ): void {
      if (event.key === "Enter" && commentValue.trim() !== "") {
        const newComment: IComment = {
          username: "JamesPH", // TENTATIVE NO USER LOGIC YET
          replyTo: post.username,
          postDate: new Date(),
          commentID: String(comments.length + 1), // TENTATIVE
          body: commentValue,
          replies: [],
        };
  
        setComments([...comments, newComment]);
        setCommentValue("");
      }
    }
    */
  return (
    <div className="post-window-container">
      <div className="post-window-header">
        <div className="post-window-header-info">
          <h1>
            {postData?.title} &sdot;{" "}
            <span className="gray">{handleDate(postData?.postDate)}</span>
          </h1>

          <button className="round-button" onClick={() => navigate(-1)}>
            <CornerDownLeft className="icon black" />
          </button>
        </div>

        <p className="gray">Posted by {postData?.username}</p>
      </div>

      <div className="post-window-main">
        <div className="tag-list">
          {postData?.tags.map((tag, i) => (
            <span key={tag + i} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {/* <ImageCarousel images={post.images} maxImages={3} /> WARNING THIS IS A BLOB!!!*/}
        <ReactMarkdown className="post-body" children={postData?.body} />
      </div>

      <div className="post-window-footer">
        <div className="post-button">
          <span className="count">{likeCount}</span>
          <button
            className={`round-button ${vote === "up" ? "selected-up" : ""}`}
            onClick={handleUpvote}
          >
            <ThumbsUp className="icon" />
          </button>
        </div>

        <div className="post-button">
          <button
            className={`round-button ${vote === "down" ? " selected-down" : ""
              }`}
            onClick={handleDownvote}
          >
            <ThumbsDown className="icon" />
          </button>
          <span className="count">{dislikeCount}</span>
        </div>

        <div className="post-button">
          <button className="round-button">
            <MessageCircle className="icon" />
          </button>
          <span className="count">{commentCount}</span>
        </div>

        <input
          type="text"
          placeholder="Add a Comment"
          id="comment-input"
          className="comment-input"
          onChange={handleCommentChange}
          value={commentValue}
        />
      </div>

      <div className="post-window-comments">
        <h1>Comments</h1>
        {postData?.comments.map((comment, i) => (
          <Comment comment={comment} isReplyable={true} key={i} />
        ))}
      </div>
    </div>
  );
}
