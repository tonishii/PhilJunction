import postData from "@/assets/post-data.ts";
import Post from "@/components/post";

export default function UserPosts() {
  return (
    <div className="user-posts-container">
      {[...Array(20)].map(() =>
        <Post
          title={postData.title}
          body={postData.body}
          tags={postData.tags}
          datePosted={postData.datePosted}
          username={postData.username}
        />
      )}
    </div>
  )
}