import postData from "@/mockdata/post-data.ts";
import SmallPost from "@/components/smallpost";

export default function UserPosts() {
  return (
    <div className="user-posts-container">
      {[...Array(20)].map(() =>
        <SmallPost post={postData}/>
      )}
    </div>
  )
}