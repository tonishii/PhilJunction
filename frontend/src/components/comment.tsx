import "@/styles/component-styles.css";

import { useState } from "react";
import { Ellipsis, MessageCircle } from "lucide-react";
import { IComment, ICommentTree } from "@/models/commentType";
import moment from "moment";

export default function Comment({
  comment,
  isReplyable = false,
}: {
  comment: ICommentTree;
  isReplyable?: boolean;
}) {
  const editComment = () => {
  };

  const deleteComment = () => {
  };

  function handleDate(datePosted: Date) {
    return moment(datePosted).fromNow();
  }

  function handleComments(comment: IComment): JSX.Element {
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

            <div className="comment-sidebuttons">
              {isReplyable && <button className="round-button">
                <MessageCircle className="icon" />
              </button>}
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
          </div>

          {comment.replyTo && (
            <div className="comment-reply">
              reply to <span>&nbsp;{comment.replyTo}</span>
            </div>
          )}
        </div>

        <p>{comment.body}</p>

        {comment.replies.length > 0 && (
          <div className="replies-container">
            {comment.replies.map((reply, index) => (
              <Comment key={index} comment={reply} isReplyable={true} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return handleComments(comment);
}