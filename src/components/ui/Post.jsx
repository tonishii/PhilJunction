import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

export default function Post({ title, body, tags, datePosted, user }) {
    const [vote, setVote] = useState(null);

    function transformDate(datePosted) {
        return "A day ago."
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
                    <h1>{title} &sdot; <span className="gray">{transformDate(datePosted)}</span></h1>
                    <p>Posted by {user}</p>
                </div>
                <div className="post-main"><p>{body}</p></div>
                <div className="post-footer">
                    {tags.map((tag, i) => (
                        <span key={tag + i} className="tag">{tag}</span>
                    ))

                    }
                </div>
            </div>

            <div className="post-sidebar">
                {/* <button className="sidebar-button"> */}
                <button className={`sidebar-button ${vote === "up" ? "selected-up" : ""}`}
                        onClick={handleUpvote}>
                    <ThumbsUp className="icon"/>
                </button>

                {/* <button className="sidebar-button"> */}
                <button className={`sidebar-button ${vote === "down" ? " selected-down" : ""}`}
                        onClick={handleDownvote}>
                    <ThumbsDown className="icon"/>
                </button>
            </div>
        </div>
    )
}