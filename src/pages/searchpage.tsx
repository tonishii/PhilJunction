import "@/styles/search-styles.css";
import Post from "@/components/post";
import postData from "@/mockdata/post-data";

export default function SearchPage() {
    return (
    <div className="search-container">
        <div className="search-body">
            <label htmlFor="keywords">Keywords: </label>
            <input type="text" id="keywords" name="keywords" />
            <label htmlFor="tags">Tags: </label>
            <input type="text" id="tags" name="tags" />
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
        </div>
        <div className="search-list">
            <span className="search-results">Results:</span>
            <div className="search-posts">
                <Post
                    title={postData.title}
                    body={postData.body}
                    tags={postData.tags}
                    datePosted={postData.datePosted}
                    username={postData.username}
                />
            </div>
        </div>
    </div>
    );
}