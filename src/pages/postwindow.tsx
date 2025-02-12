import type { PostComment } from "@/assets/post-data";

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

  function handleDate(datePosted: Date): string {
    return "a day ago"
  }

  function handleComments(comment: PostComment): JSX.Element {
    return (
      <div className="comment">
        <div className="comment-header"><span className="comment-name">{comment.username}</span> replying to <span className="comment-name">{comment.replyTo}</span></div>
        <p>{comment.content}</p>
        {comment.replies.map(comment => (
          handleComments(comment)
        ))}
      </div>
    );
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
        <h1>Comments</h1>
        {comments.map(comment => (
          handleComments(comment)
        ))}
      </div>
    </div>
  );
}