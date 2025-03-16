import "@/styles/component-styles.css";
import React, { useEffect, useState } from "react";
import { Ellipsis, MessageCircle, Send, Pencil } from "lucide-react";
import { IComment } from "@/models/commentType";
import moment from "moment";
import { toast } from "react-toastify";

export default function Comment({
  commentData,
  isReplyable = false,
  onDeleteComment,
}: {
  commentData: IComment;
  isReplyable?: boolean;
  onDeleteComment: (commentId: string) => void;
}) {
  const [comment, setComment] = useState<IComment>(commentData);
  const [replies, setReplies] = useState<IComment[]>([]);
  const [edit, setEdited] = useState(comment.body);
  const [editVisible, setEditVisible] = useState(false);
  const [reply, setReply] = useState("");
  const [replyVisible, setReplyVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    async function fetchReplies() {
      if (!comment.replies || comment.replies.length === 0) return;

      const commentsData = await Promise.all(
        comment.replies.map(async (replyId: string) => {
          const res = await fetch(`http://localhost:3001/retrievecomment/${replyId}`);
          const data = await res.json();

          if (!res.ok) {
            toast.error("An error has occurred.");
            console.error(data.message);
            return null;
          } else {
            console.log(data.message);
            return data.comment;
          }
        })
      );
      setReplies(commentsData.filter(Boolean) ?? []);
    }
    fetchReplies();
  }, [comment.replies]);

  function handleKeyUpEdit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEdit();
    }
  }

  async function handleReply(event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) {
    if (reply.trim() === "") return;
    if ("key" in event && event.key !== "Enter") return;

    try {
      const res = await fetch("http://localhost:3001/submitcomment", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: "ANTHIMON", // TENATIVE NO USER LOGIC
          body: reply,
          publicId: comment.publicId,
          parentId: comment.commentID as string,
          type: "Reply"
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setReply("");
        setReplyVisible(false);

        console.log(data.message);
        setReplies((prevReplies) => [...prevReplies, data.newReply]);
      } else {
        toast.error("An error has occured.");
        console.error(data.message);
      }
    } catch (error: any) {
      toast.error("Error occurred while submitting reply.");
      console.error(error);
    }
  };

  async function handleEdit() {
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
        body: JSON.stringify(updatedComment),
      });

      const data = await res.json();
      if (res.ok) {
        setEdited("");
        setEditVisible(false);

        setComment(data.comment);
        console.log(data.message);
      } else {
        toast.error("An error has occured.");
        console.error(data.message);
      }
    } catch (error: any) {
      toast.error("Error occurred while editing reply.");
      console.error(error);
    }
  };

  async function handleDelete() {
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

      const data = await res.json();

      if (res.ok) {
        console.log(data.message);
        onDeleteComment(comment.commentID as string);
      } else {
        toast.error("An error has occured.");
        console.error(data.message);
      }
    } catch (error) {
      toast.error("Error occurred while deleting comment.");
      console.error(error);
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
              &nbsp;&sdot; {handleDate(comment.postDate as Date)}
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
                      onChange={(e) => setReply(e.target.value)}
                      onKeyUp={handleReply}
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
                              onChange={(e) => setEdited(e.target.value)}
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
      </div>

      <p>{comment.body}</p>

      {replies.length > 0 && (
        <div className="replies-container">
          {replies.map((reply, i) => (
            <Comment
              key={comment.commentID as string + i}
              commentData={reply}
              isReplyable={true}
              onDeleteComment={onDeleteComment} />
          ))}
        </div>
      )}
    </div>
  );
}