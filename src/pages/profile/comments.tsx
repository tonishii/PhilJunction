import Comment from "@/components/comment"
import { PostComment } from "@/assets/post-data"

export default function UserComments({
  userComments,
}: {
  userComments: PostComment[],
}) {
  return (
    <div className="user-comments-container">
      <h1>History</h1>
      {userComments.map((comment) =>
        <Comment comment={comment} />
      )}
    </div>
  )
}