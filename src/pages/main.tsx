import Post from "@/components/post.tsx";
import data from "@/mockdata/post-data.ts";

export default function Main() {
  return (
    <main className="general-container">
      <Post
        title={data.title}
        body={data.body}
        tags={data.tags}
        datePosted={data.datePosted}
        username={data.username}
      />
      <Post
        title={data.title}
        body={data.body}
        tags={data.tags}
        datePosted={data.datePosted}
        username={data.username}
      />
      <Post
        title={data.title}
        body={data.body}
        tags={data.tags}
        datePosted={data.datePosted}
        username={data.username}
      />
      <Post
        title={data.title}
        body={data.body}
        tags={data.tags}
        datePosted={data.datePosted}
        username={data.username}
      />
      <Post
        title={data.title}
        body={data.body}
        tags={data.tags}
        datePosted={data.datePosted}
        username={data.username}
      />
    </main>
  );
}
