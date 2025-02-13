import { PostComment } from "@/assets/post-data"

export default function Comment({
  comment,
}: {
  comment: PostComment
}) {

  function handleComments(comment: PostComment): JSX.Element {
    return (
      <div className="comment">
        <div className="comment-header">
          <span className="comment-name">
            {comment.username}
          </span> 
          <span> replying to </span>
          <span className="comment-name">
            {comment.replyTo}
          </span>
        </div>
    
        <p>{comment.content}</p>
        {comment.replies.map(comment => (
          handleComments(comment)
        ))}
      </div>
    );
  }

  return (handleComments(comment))
}