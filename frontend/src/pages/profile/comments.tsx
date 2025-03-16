import Comment from "@/components/comment"
import { IUser } from "@/models/userType"
import { useEffect, useState } from "react";
import { ICommentTree } from "@/models/commentType";

export default function UserComments({ user }: { user: IUser; }) {
  const [comments, setComments] = useState<ICommentTree[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/user/${user.username}/comments`).
      then((response) =>  response.json()).
      then((data) => {
        if (data.message) {

        } else {
          setComments(data);
        }
      })
  }, [user]);

  return (
    <div className="user-comments-container">
      {(comments.length > 0) ? (comments.map((comment) =>
        <Comment comment={comment} />
      )) : <p className="error">No comments found!</p> }
    </div>
  )
}