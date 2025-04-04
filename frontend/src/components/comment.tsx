import "@/styles/component-styles.css";
import React, { useContext, useEffect, useState } from "react";
import { Ellipsis, MessageCircle, Send, Pencil } from "lucide-react";
import { IComment } from "@/models/commentType";
import { toast } from "react-toastify";
import { AuthContext } from "@/helpers/context";
import { Link } from "react-router";

import { makeServerURL } from "@helpers/url";
import { handleDate } from "@helpers/moment";

export default function Comment({
  commentData,
  isReplyable = false,
  onDeleteComment,
  setCommentCount,
}: {
  commentData: IComment;
  isReplyable?: boolean;
  onDeleteComment?: (commentId: string) => void;
  setCommentCount?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [comment, setComment] = useState<IComment>(commentData);
  const [replies, setReplies] = useState<IComment[]>([]);

  const [edit, setEdited] = useState(comment.body);
  const [reply, setReply] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [username] = useContext(AuthContext);

  useEffect(() => {
    async function fetchReplies() {
      if (!comment.replies || comment.replies.length === 0) return;

      const commentsData = await Promise.all(
        comment.replies.map(async (replyId: string) => {
          const res = await fetch(makeServerURL(`retrievecomment/${replyId}`));
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
      setDisabled(true);
      const res = await fetch(makeServerURL(`submitcomment`), {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
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

        setReplies((prevReplies) => [...prevReplies, data.newReply]);
        setCommentCount?.((prev) => prev + 1);
      } else {
        if (res.status === 401) {
          toast.error("login first!");
        }
        toast.error("An error has occured.");
        console.error(data.message);
      }
    } catch (error: unknown) {
      toast.error("Error occurred while submitting reply.");
      console.error(error);
    } finally {
      setDisabled(false);
    }
  };

  async function handleEdit() {
    if (!edit.trim()) return;

    const updatedComment: IComment = {
      ...comment,
      body: edit,
    };

    try {
      setDisabled(true);
      const res = await fetch(makeServerURL(`editcomment/${comment.commentID}`), {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedComment),
        credentials: "include"
      });

      const data = await res.json();

      if (res.ok) {
        setEdited("");
        setEditVisible(false);
        setMenuVisible(false);

        setComment(data.comment);
        console.log(data.message);
      } else {
        if (res.status === 401) {
          toast.error("login first!");
        } else if (res.status === 403) {
          toast.error("not your comment")
        } else {
          toast.error("An error has occured.");
          console.error(data.message);
        }
      }
    } catch (error: unknown) {
      toast.error("Error occurred while editing reply.");
      console.error(error);
    } finally {
      setDisabled(false);
    }
  };

  async function handleDelete() {
    try {
      setDisabled(true);
      const res = await fetch(makeServerURL(`deletecomment/${comment.commentID}`), {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok) {
        console.log(data.message);
        onDeleteComment?.(comment.commentID as string);
        setCommentCount?.((prev) => prev - 1);
      } else {
        if (res.status === 401) {
          toast.error("login first!");
        } else if (res.status === 403) {
          toast.error("not your comment!")
        } else {
          toast.error("An error has occured.");
          console.error(data.message);
        }
      }
    } catch (error: unknown) {
      toast.error("Error occurred while deleting comment.");
      console.error(error);
    } finally {
      setDisabled(false);
    }
  };

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

  function handleDeleteComment(replyID: string) {
    setReplies((prevReplies) =>
      prevReplies.filter((reply) => reply.commentID !== replyID)
    );
  };

  return (
    <div className="comment-container">
      <div className="comment-header">
        <div className="comment-info">
          <div>
            <Link to={`/user/${comment.username}`}><span className="comment-name">{comment.username}</span></Link>
            <span className="comment-date">
              &nbsp;&sdot; {handleDate(comment.postDate as Date)}
            </span>
          </div>

          <div className="comment-sidebuttons">
            {isReplyable && (
              <div className="comment-menu">
                <button className="reply-button" onClick={toggleReply} disabled={isDisabled}>
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
                      placeholder="Join the conversation!"
                    />
                    <button className="reply-button" onClick={handleReply} disabled={isDisabled}>
                      <Send className="icon" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {username === comment.username &&
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
                              <button className="reply-button" onClick={handleEdit} disabled={isDisabled}>
                                <Pencil className="icon" />
                              </button>
                            </div>
                          )}
                        </div>
                      </li>
                      <li>
                        <button onClick={handleDelete} disabled={isDisabled}>Delete</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      </div>

      <p>{comment.body}</p>

      <div className="replies-container">
        {replies.length > 0 &&
          replies.map((reply, i) => (
            <Comment
              key={(reply.commentID ?? "") + i}
              commentData={reply}
              isReplyable={true}
              onDeleteComment={handleDeleteComment}
              setCommentCount={setCommentCount} />
          ))
        }
      </div>
    </div>
  );
}
