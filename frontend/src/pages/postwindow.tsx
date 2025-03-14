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
import { memo, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import { IPost } from "@/models/postType";
import { IComment, ICommentTree } from "@/models/commentType";
import { toast } from 'react-toastify';

export default function PostWindow() {
  const { postId } = useParams();
  const [postData, setPostData] = useState<IPost>({} as IPost);

  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [commentValue, setCommentValue] = useState("");
  const [commentTree, setCommentTree] = useState<ICommentTree[]>([]);
  const [memoizedComments, setMemoizedComments] = useState<Map<string, ICommentTree>>(new Map());

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:3001/retrievepost/${postId}`);
      if (response.ok) {
        const data: IPost = await response.json();
        setPostData(data);
        // console.log(data);

        const comments = data.comments;
        const values = await Promise.all(comments.map(id => fetch(`http://localhost:3001/retrievecomment/${id}`)));
        setMemoizedComments(new Map((await Promise.all(values.map(v => v.json()))).map((v, i) => [comments[i], v])));
      } else {
        console.log(response);
      }
    }
    fetchData();
  }, [postId]);


  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const newCommentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const topLevelComments: ICommentTree[] = [];
    memoizedComments.forEach(c => { if (c.topLevel) topLevelComments.push(c) });
    setCommentTree(topLevelComments);

  }, [memoizedComments])

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
            replyTo: postData.username
          }),
        });

        if (res.ok) {
          const resJson = await res.json();
          setCommentValue("");
          console.log(resJson);
          setMemoizedComments(a => new Map([...a, [resJson._id, resJson.comment]]));
        } else {
          const errorData = await res.json();
          toast.error(errorData.message || "Server Error");
        }
      } catch (e: unknown) {
        toast.error("An error occurred while submitting the comment.");
        console.log(e);
      }
    }
  }

  useEffect(() => {
    if (!isFirstLoad && newCommentRef.current) {
      newCommentRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);

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
          {postData?.tags?.map((tag, i) => (
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
          <span className="count">{postData?.likes}</span>
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
          <span className="count">{postData?.dislikes}</span>
        </div>

        <div className="post-button">
          <button className="round-button">
            <MessageCircle className="icon" />
          </button>
          {/* <span className="count">{postData?.comments?.length}</span> */}
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

        <div ref={newCommentRef} />
      </div>
    </div>
  );
}
