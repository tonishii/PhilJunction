import Post from "@/components/post";
import data from "@/post-data";

export default function Main() {
  return (
    <main>
      <Post
        title={data.title}
        body={data.body}
        tags={data.tags}
        datePosted={data.datePosted}
        user={data.user}
      />
      <Post
        title={data.title}
        body={data.body}
        tags={data.tags}
        datePosted={data.datePosted}
        user={data.user}
      />
      <Post
        title={data.title}
        body={data.body}
        tags={data.tags}
        datePosted={data.datePosted}
        user={data.user}
      />
      <Post
        title={data.title}
        body={data.body}
        tags={data.tags}
        datePosted={data.datePosted}
        user={data.user}
      />
      <Post
        title={data.title}
        body={data.body}
        tags={data.tags}
        datePosted={data.datePosted}
        user={data.user}
      />
    </main>
  );
}
