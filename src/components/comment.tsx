import "@/styles/component-styles.css";

import { useState } from "react";
import { PostComment } from "@/mockdata/post-data";
import { Ellipsis } from "lucide-react";

export default function Comment({
  comment,
}: {
  comment: PostComment
}) {
  const editComment = () => {
  };

  const deleteComment = () => {
  };

  function handleDate(date: Date) {
    return "A day ago";
  }

  function handleComments(comment: PostComment): JSX.Element {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => setMenuVisible(!menuVisible);

    return (
      <div className="comment-container">
        <div className="comment-header">
          <div className="comment-info">
            <div>
              <span className="comment-name">
                {comment.username}
              </span>
              <span className="comment-date">
                &nbsp;&sdot; {handleDate(comment.postDate)}
              </span>
            </div>

            <div className="comment-menu">
              <button
                className="ellipsis-button"
                onClick={toggleMenu}>
                <Ellipsis className="icon" />
              </button>
              {menuVisible && <div className="dropdown-menu">
                <ul>
                  <li><button onClick={editComment}>Edit</button></li>
                  <li><button onClick={deleteComment}>Delete</button></li>
                </ul>
              </div>}
            </div>
          </div>

          {comment.replyTo && (
            <div className="comment-reply">
              reply to <span>&nbsp;{comment.replyTo}</span>
            </div>
          )}
        </div>

        <p>{comment.content}</p>

        {comment.replies.length > 0 && (
          <div className="replies-container">
            {comment.replies.map((reply, index) => (
              <Comment key={index} comment={reply} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return handleComments(comment);
}