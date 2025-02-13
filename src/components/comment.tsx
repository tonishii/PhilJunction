import { PostComment } from "@/mockdata/post-data"

export default function Comment({
  comment,
}: {
  comment: PostComment
}) {

  function handleDate(date: Date) {
    return "A day ago.";
  }

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

          <span className="comment-date">
            {handleDate(comment.postDate)}
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