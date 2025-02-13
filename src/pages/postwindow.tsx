import '@/styles/post-styles.css'

import type { PostComment } from "@/mockdata/post-data";
import Comment from '@/components/comment';
import { CornerDownLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function PostWindow({
  title,
  body,
  tags,
  datePosted,
  username,
  comments,
}: {
  title: string;
  body: string;
  tags: string[];
  datePosted: Date;
  username: string;
  comments: PostComment[];
}) {

  let navigate = useNavigate();

  function handleDate(datePosted: Date): string {
    return "a day ago"
  }

  return (
    <div className="post-window-container">
      <div className="post-window-body">
        <div className="post-header">
          <h1>{title} &sdot; {" "}
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

      <div className="post-window-comments">
        <div className="post-window-comments-header">
          <h1>Comments</h1>
          <button 
            className="round-button"
            onClick={() => navigate(-1)}>
            <CornerDownLeft className="icon" />
          </button>
        </div>

        {comments.map(comment => <Comment comment={comment} /> )}
      </div>
    </div>
  );
}