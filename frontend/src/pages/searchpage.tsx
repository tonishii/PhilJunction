import "@/styles/search-styles.css";
import Post from "@/components/post";
import postData from "@/mockdata/post-data";
import TagInput from "@/components/taginput";

import { useState } from "react";

export default function SearchPage() {
    const [tags, setTags] = useState<string[]>([]);

    return (
        <div className="search-container">
            <div className="search-body">
                <label htmlFor="keywords">Keywords: </label>
                <input type="text" id="keywords" name="keywords" className="field-clicked" />
                <label htmlFor="tags">Tags: </label>
                <TagInput tags={tags} setTags={setTags} />
                <label htmlFor="sort-by">Sort by: </label>
                <select name="sort-by" id="sort-by">
                    <option value="recent">Most Recent</option>
                    <option value="liked">Most Liked</option>
                </select>
                <label htmlFor="filter-by">Filter by Time: </label>
                <select name="filter-by" id="filter-by">
                    <option value="today">Today</option>
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="NA">None</option>
                </select>
                <button className="search-buttons">Clear</button>
                <button className="search-buttons">Search</button>
            </div>

            <div className="search-posts">
                <h1 className="result-text">Results: </h1>
                <Post post={postData}/>
                <Post post={postData}/>
            </div>
        </div>
    );
}