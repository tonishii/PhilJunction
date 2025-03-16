import "@/styles/post-styles.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  CornerDownLeft,
} from "lucide-react";

import Comment from "@/components/comment";
// import ImageCarousel from "@/components/imagecarousel";
import { IPost } from "@/models/postType";
import { ICommentTree } from "@/models/commentType";
import { toast } from 'react-toastify';

export default function PostWindow() {
  const { postId } = useParams();
  const [post, setPost] = useState<IPost>({} as IPost);

  const [vote, setVote] = useState<boolean | null>(null);
  const [commentValue, setCommentValue] = useState("");
  const [commentTree, setCommentTree] = useState<ICommentTree[]>([]);
  const [memoizedComments, setMemoizedComments] = useState<Map<string, ICommentTree>>(new Map());
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:3001/retrievepost/${postId}`);
      if (response.ok) {
        const data: IPost = await response.json();
        setPost(data);
        // console.log(data);

        const comments = data.comments;
        const values = await Promise.all(comments.map(id => fetch(`http://localhost:3001/retrievecomment/${id}`)));
        setMemoizedComments(new Map((await Promise.all(values.map(v => v.json()))).map((v, i) => [comments[i], v])));
      } else {
        console.log(response);
      }
    }

    async function fetchVote() {
      const res = await fetch(`http://localhost:3001/retreivevote/${postId}`);
      const data = await res.json();

      if (!res.ok) {
        toast.error("A server error has occured vote pull.");
      } else {
        setVote(data.initialVote);
      }
    }

    fetchData();
    fetchVote();
  }, [postId]);

  useEffect(() => {
    const topLevelComments: ICommentTree[] = [];
    memoizedComments.forEach(c => { if (c.topLevel) topLevelComments.push(c) });
    setCommentTree(topLevelComments);

  }, [memoizedComments])

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(event.target.value);
  };

  function handleDate(datePosted: Date = new Date()): string {
    return moment(datePosted).fromNow();
  }

  async function handleUpvote(): Promise<any> {
    try {
      const res = await fetch(`http://localhost:3001/upvote/${post.publicId}`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("An error has occured.");
        console.log(data.message);
        return;
      }

      if (data.likes !== undefined && data.dislike !== undefined) {
        setPost((post) => ({...post, likes: data.likes}));
        setPost((post) => ({...post, dislikes: data.dislike}));

        if (vote === true) {
          setVote(null);
        } else {
          setVote(true);
        }
        console.log(data.message);
      }
    } catch (err: any) {
      toast.error("A server error occured.");
      console.log(err);
    }
  }

  async function handleDownvote(): Promise<any> {
    try {
      const res = await fetch(`http://localhost:3001/downvote/${post.publicId}`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("An error has occured.");
        console.log(data.message);
        return;
      }

      if (data.likes !== undefined && data.dislike !== undefined) {
        setPost((post) => ({...post, likes: data.likes}));
        setPost((post) => ({...post, dislikes: data.dislike}));

        if (vote === false) {
          setVote(null);
        } else {
          setVote(false);
        }
        console.log(data.message);
      }
    } catch (err: any) {
      toast.error("A server error occured.");
      console.log(err);
    }
  }

  async function handleAddComment(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && commentValue.trim() !== "") {

      try {
        const res = await fetch("http://localhost:3001/submitcomment", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: "Protea",
            body: commentValue,
            postId: postId,
            topLevel: true,
            replyTo: post.username
          }),
        });

        if (res.ok) {
          const resJson = await res.json();
          setCommentValue("");
          console.log(resJson);
          setMemoizedComments(a => new Map([...a, [resJson._id, resJson.comment]]));
        } else {
          const errorData = await res.json();
          toast.error("Server error:", errorData.message);
        }
      } catch (e: unknown) {
        toast.error("An error occurred while submitting the comment.");
        console.log(e);
      }
    }
  }

  // const handleAddReply = (newReply: IComment, commentID: string) => {
  //   newReply.commentID = commentID;
  //   setComments((prevComments) =>
  //     prevComments.map((comment) =>
  //       comment.commentID === newReply.replyTo
  //         ? { ...comment, replies: [...comment.replies, newReply] }
  //         : comment
  //     )
  //   );
  // };

  // const handleDeleteComment = (commentID: string) => {
  //   setComments((prevComments) =>
  //     prevComments.filter((comment) => comment.commentID !== commentID)
  //   );
  // };

  // const handleEditComment = (commentID: string, updatedBody: string) => {
  //   setComments((prevComments) =>
  //     prevComments.map((comment) =>
  //       comment.commentID === commentID
  //         ? { ...comment, body: updatedBody }
  //         : comment
  //     )
  //   );
  // };

  return (
    <div className="post-window-container">
      <div className="post-window-header">
        <div className="post-window-title">
          <h1>{post?.title}</h1>
          <button className="round-button top-right" onClick={() => navigate(-1)}>
            <CornerDownLeft className="icon black" />
          </button>
        </div>

        <hr />

        <div className="post-info">
          <i className="post-author">Posted by <span className="gray-color">{post?.username}</span> </i>
          <i className="post-date">{handleDate(post?.postDate)}</i>
        </div>
      </div>

      <div className="post-window-main">
        <div className="tag-list">
          {post?.tags?.map((tag, i) => (
            <span key={tag + i} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {/* <ImageCarousel images={post.images} maxImages={3} /> WARNING THIS IS A BLOB!!!*/}
        <ReactMarkdown className="post-body" children={post?.body} />
      </div>

      <div className="post-window-footer">
        <div className="post-button">
          <span className="like-count">{post?.likes}</span>
          <button
            className={`round-button ${vote === true ? "selected-up" : ""}`}
            onClick={handleUpvote}
          >
            <ThumbsUp className="icon" />
          </button>
        </div>

        <div className="post-button">
          <button
            className={`round-button ${vote === false ? " selected-down" : ""
              }`}
            onClick={handleDownvote}
          >
            <ThumbsDown className="icon" />
          </button>
          <span className="dislike-count">{post?.dislikes}</span>
        </div>

        <div className="post-button">
          <button className="round-button">
            <MessageCircle className="icon" />
          </button>
          <span className="comment-count">{post?.comments?.length}</span>
        </div>

        <input
          type="text"
          placeholder="Add a Comment"
          id="comment-input"
          className="comment-input"
          onChange={handleCommentChange}
          onKeyUp={handleAddComment}
          value={commentValue}
        />
      </div>

      <div className="post-window-comments">
        <h1>Comments</h1>
        {commentTree.length > 0 ? commentTree.map(comment => <Comment comment={comment} isReplyable={true} />) : "Loading..."}
        {/* {comments.map((comment) =>
          <Comment
            comment={comment}
            isReplyable={true}
            onAddReply={handleAddReply}
            onDeleteComment={handleDeleteComment}
            onEditComment={handleEditComment} />
        )} */}
      </div >
    </div >
  );
}
