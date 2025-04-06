import Comment from "@/components/comment"
import { IUser } from "@/models/userType"
import { memo, useEffect, useState } from "react";
import { IComment } from "@/models/commentType";
import { toast } from "react-toastify";
import { makeServerURL } from "@/helpers/url";

function UserComments({ user }: { user: IUser; }) {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(makeServerURL(`/user/${user.username}/comments`));
      const data = await res.json();

      if (res.ok) {
        setComments(data.comments);
      } else {
        toast.error("An error has occured.");
      }
    }
    fetchComments();
  }, [user]);

  return (
    <div className="user-comments-container">
      {(comments.length > 0) ? (comments.map((comment, i) =>
        <Comment key={comment.commentID ?? "" + i} commentData={comment} />
      )) : <p className="error">No comments found!</p>}
    </div>
  )
}

export default memo(UserComments);
