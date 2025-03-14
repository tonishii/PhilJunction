import "@/styles/component-styles.css";
import { useState } from "react";
import { Ellipsis, MessageCircle, Send, Pencil } from "lucide-react";
import { IComment } from "@/models/commentType";
import moment from "moment";
import { toast } from "react-toastify";

export default function Comment({
  comment,
  isReplyable = false,
  onAddReply = () => {},
  onDeleteComment = () => {},
  onEditComment = () => {},
}: {
  comment: IComment;
  isReplyable?: boolean;
  onAddReply?: (newReply: IComment, commentID: string) => void;
  onDeleteComment?: (commentID: string) => void;
  onEditComment?: (commentID: string, updatedBody: string) => void;
}) {
  const [reply, setReply] = useState("");
  const [edit, setEdited] = useState(comment.body);
  const [editVisible, setEditVisible] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReply(e.target.value);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdited(e.target.value);
  };

  function handleKeyUpReply(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleReply();
    }
  }

  function handleKeyUpEdit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEdit();
    }
  }

  const handleEdit = async () => {
    if (!edit.trim()) return;

    const updatedComment: IComment = {
      ...comment,
      body: edit,
    };

    try {
      const res = await fetch(`http://localhost:3001/editcomment`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentID: updatedComment.commentID,
          body: updatedComment.body
        }),
      });

      if (res.ok) {
        const resJson = await res.json();
        onEditComment(comment.commentID as string, resJson.comment.body);
        setEditVisible(false);
      } else {
        const errorData = await res.json();
        console.error("Server error:", errorData.message);
      }
    } catch (error) {
      toast.error("Error occurred while editing reply.");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3001/deletecomment`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentID: comment.commentID,
        }),
      });

      console.log(comment.commentID);
      if (res.ok) {
        const resJson = await res.json();
        onDeleteComment(comment.commentID as string);
      } else {
        const errorData = await res.json();
        console.error("Server error:", errorData.message);
      }
    } catch (error) {
      toast.error("Error occurred while deleting comment.");
    }
  };

  const handleReply = async () => {
    if (reply.trim() === "") return;

    const newReply: IComment = {
      commentID: null,
      username: "Protea", // TENATIVE NO USER LOGIC
      postDate: new Date(),
      body: reply,
      replyTo: comment.commentID as string,
      replies: [],
    };

    try {
      const res = await fetch("http://localhost:3001/submitcomment", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newReply.username,
          body: newReply.body,
          replyTo: newReply.replyTo,
        }),
      });

      if (res.ok) {
        const resJson = await res.json();
        onAddReply(resJson.comment, resJson.comment._id);
        setReply("");
        setReplyVisible(false);
      } else {
        const errorData = await res.json();
        console.error("Server error:", errorData.message);
      }
    } catch (error) {
      toast.error("Error occurred while submitting reply.");
    }
  };

  function handleDate(datePosted: Date) {
    return moment(datePosted).fromNow();
  }

  const toggleMenu = () => {
    if (menuVisible) {
      setMenuVisible(false);
      setEditVisible(false);
    } else {
      setMenuVisible(true);
      setReplyVisible(false);
    }
  };

  const toggleReply = () => {
    if (replyVisible) {
      setReplyVisible(false);
    } else {
      setReplyVisible(true);
      setMenuVisible(false);
      setEditVisible(false);
    }
  };

  return (
    <div className="comment-container">
      <div className="comment-header">
        <div className="comment-info">
          <div>
            <span className="comment-name">{comment.username}</span>
            <span className="comment-date">
              &nbsp;&sdot; {handleDate(comment.postDate)}
            </span>
          </div>

          <div className="comment-sidebuttons">
            {isReplyable && (
              <div className="comment-menu">
                <button className="reply-button" onClick={toggleReply}>
                  <MessageCircle className="icon" />
                </button>

                {replyVisible && (
                  <div className="dropdown-menu">
                    <input
                      type="text"
                      name="reply"
                      id="reply"
                      value={reply}
                      onChange={handleReplyChange}
                      onKeyUp={handleKeyUpReply}
                      placeholder="Write a reply..."
                    />
                    <button className="reply-button" onClick={handleReply}>
                      <Send className="icon" />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="comment-menu">
              <button className="ellipsis-button" onClick={toggleMenu}>
                <Ellipsis className="icon" />
              </button>
              {menuVisible && (
                <div className="dropdown-menu">
                  <ul>
                    <li>
                      <div className="comment-menu">
                        <button onClick={() => setEditVisible(!editVisible)}>Edit</button>
                        {editVisible && (
                          <div className="dropdown-menu">
                            <input
                              type="text"
                              name="edit"
                              id="edit"
                              value={edit}
                              onChange={handleEditChange}
                              onKeyUp={handleKeyUpEdit}
                              placeholder="Edit a comment..."
                            />
                            <button className="reply-button" onClick={handleEdit}>
                              <Pencil className="icon" />
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                    <li>
                      <button onClick={handleDelete}>Delete</button>
                    </li>
                  </ul>
                </div>
              )}
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
          {comment.replies.map((reply, ind) => (
            <Comment key={comment.commentID as string + ind} comment={reply} isReplyable={true} onAddReply={onAddReply} />
          ))}
        </div>
      )}
    </div>
  );
}