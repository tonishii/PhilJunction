import "@/styles/search-styles.css";
import Post from "@/components/post";
import TagInput from "@/components/taginput";
import { toast } from "react-toastify"

import { useEffect, useState } from "react";
import { IPost } from "@/models/postType";
import { useSearchParams } from "react-router";
import { makeServerURL } from "@/helpers/url";

export default function SearchPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isDisabled, setDisabled] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function fetchPosts() {
      try {
        // console.log(searchParams.get("keywords"));
        setDisabled(true)

        const response = await fetch(`${makeServerURL(`searchposts`)}?${searchParams.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (response.ok) {
          console.log(result)
          setPosts(result)
        } else {
          const errorMessage = JSON.stringify(result, null, 2);
          toast.error(`${errorMessage || "Server Error"}`);
        }
      }
      catch (e: unknown) {
        console.log(e);
      } finally {
        setDisabled(false);
      }
    }
    setTags(JSON.parse(searchParams.get("tags") ?? "[]"))
    fetchPosts();
  }, [searchParams, setSearchParams]);

  function clear() {
    setTags([]);
  }

  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setSearchParams([
      ["keywords", formData.get("keywords")?.toString() ?? ""],
      ["tags", JSON.stringify(tags)],
      ["filterBy", formData.get("filterBy")?.toString() ?? "1"]
    ]);
  };

  return (
    <div className="search-container">
      <form className="search-body" onSubmit={search}>
        <label htmlFor="keywords">Keywords: </label>
        <input
          type="text"
          id="keywords"
          name="keywords"
          className="field-clicked"
          defaultValue={searchParams.get("keywords") ?? ""}
          placeholder="Add keywords..." />
        <label htmlFor="tags">Tags: </label>
        <TagInput tags={tags} setTags={setTags} />
        <label htmlFor="sort-by">Sort by: </label>
        <select name="sort-by" id="sort-by">
          <option value="recent">Most Recent</option>
          <option value="liked">Most Liked</option>
        </select>
        <label htmlFor="filter-by">Filter by Time: </label>
        <select name="filter-by" id="filter-by">
          <option value="1">Today</option>
          <option value="7">Last Week</option>
          <option value="30">Last Month</option>
          <option value={Date.now()}>None</option>
        </select>
        <button className="search-buttons" onClick={clear}>Clear</button>
        <button className="search-buttons" type="submit" disabled={isDisabled}>Search</button>
      </form>


      {posts.length > 0 && (
        <div className="search-posts">
          <h1 className="result-text">Results:</h1>
          {posts.map((i, j) => (
            <Post key={j} post={i} />
          ))}
        </div>)}
    </div>
  );
}
