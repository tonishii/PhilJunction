import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function Post({
  title,
  body,
  tags,
  datePosted,
  user,
}: {
  title: string;
  body: string;
  tags: string[];
  datePosted: Date;
  user: string;
}) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  function transformDate(datePosted: Date) {
    return "a day ago.";
  }

  function handleUpvote() {
    if (vote === "up") {
      setVote(null);
    } else {
      setVote("up");
    }
  }

  function handleDownvote() {
    if (vote === "down") {
      setVote(null);
    } else {
      setVote("down");
    }
  }

  return (
      <div className="post">
        <div className="post-body">
          <div className="post-header">
            <h1>
              <Link to="/post" className="post-link">{title} &sdot;</Link> {" "}
              <span className="gray">{transformDate(datePosted)}</span>
            </h1>
            <p className="gray">Posted by {user}</p>
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

        <div className="post-sidebar">
          <button
            className={`gray-button ${
              vote === "up" ? "selected-up" : ""
            }`}
            onClick={handleUpvote}
          >
            <ThumbsUp className="icon" />
          </button>

          <Link to="/profile">
            <button
              className={`gray-button ${
                vote === "down" ? " selected-down" : ""
              }`}
              onClick={handleDownvote}>
              <ThumbsDown className="icon" />
            </button>
          </Link>
        </div>
      </div>
  );
}
