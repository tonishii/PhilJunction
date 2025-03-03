import Comment from "@/components/comment"
import { PostComment } from "@/mockdata/post-data"

export default function UserComments({
  userComments,
}: {
  userComments: PostComment[],
}) {
  return (
    <div className="user-comments-container">
      {userComments.map((comment) =>
        <Comment comment={comment} />
      )}
    </div>
  )
}