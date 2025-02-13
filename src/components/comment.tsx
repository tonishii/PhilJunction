import { PostComment } from "@/mockdata/post-data"
import { PencilRuler, Reply } from "lucide-react"

export default function Comment({
  comment,
}: {
  comment: PostComment
}) {

  function handleDate(date: Date) {
    return "A day ago";
  }

  function handleComments(comment: PostComment): JSX.Element {
    return (
      <div className="comment comment-padding">
        <div className="comment-header">
          <span className="comment-name">
            {comment.username}
          </span> 
          <span className="comment-date">
            &nbsp;&sdot; {handleDate(comment.postDate)}
          </span>
          <span className="comment-icons">  <Reply /><PencilRuler /></span>
          <div className="comment-reply"> 
            reply to 
            <span className="comment-reply-name">
              &nbsp;{comment.replyTo}
            </span>
          </div>
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