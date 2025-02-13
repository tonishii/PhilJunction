import Post from "@/components/post.tsx";
import data from "@/mockdata/post-data.ts";

export default function Main() {
  return (
    <main className="general-container">
      {[...Array(20)].map(() =>
        <Post
          title={postData.title}
          body={postData.body}
          tags={postData.tags}
          datePosted={postData.datePosted}
          username={postData.username}
        />
      )}
    </main>
  );
}
