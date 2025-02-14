import "@/styles/search-styles.css";
import Post from "@/components/post";
import postData from "@/mockdata/post-data";

import { useState } from "react";
import { X } from "lucide-react";

export default function SearchPage() {
    const [newTag, setNewTag] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    function handleAddTags() {
        if (newTag.trim() !== "" && !tags.includes(newTag)) {
            setTags([...tags, newTag.trim()]);
        }
        setNewTag("");
    }

    function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTags();
        }
    }

    function handleRemoveTag(index: number) {
        setTags(tags.filter((_, i) => i !== index));
    }

    return (
        <div className="search-container">
            <div className="search-body">
                <label htmlFor="keywords">Keywords: </label>
                <input type="text" id="keywords" name="keywords" className="field-clicked" />
                <label htmlFor="tags">Tags: </label>
                <div className="tags-input">
                    {tags.map((tag, i) => (
                        <span key={tag + i} className="tag">
                            {tag} <button onClick={() => handleRemoveTag(i)}><X size={10}/></button>
                        </span>
                    ))}
                    <input
                        type="text"
                        name="tag"
                        id="tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyUp={handleKeyUp}
                    />
                </div>
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