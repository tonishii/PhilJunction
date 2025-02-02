import data from "@/post-data"

export default function PostWindow() {
    function handleDate(datePosted: Date): String {
        return "a day ago"
    }

    return (
        <main className="post-window-main">
            <div className="post-window-container">
                <div className="post-window-header">
                    <div><h3 className="post-window-header-text">{data.title} &sdot;</h3>  {" "} {handleDate(data.datePosted)}</div>
                    <span>Posted by {data.user}</span>
                </div>
                <div className="post-window-content">
                    <p>{data.body}</p>
                </div>
                <div className="post-window-footer">
                    {/* i want to put like and dislike button here as well as no. of comments */}
                </div>
            </div>
            <div className="post-window-comments">
                <p>hi</p>
            </div>
        </main>
    );
}