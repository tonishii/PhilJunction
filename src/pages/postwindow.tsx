export default function PostWindow({
  title,
  body,
  tags,
  datePosted,
  username,
}: {
  title: string;
  body: string;
  tags: string[];
  datePosted: Date;
  username: string;
}) {

    function handleDate(datePosted: Date): String {
        return "a day ago"
    }

    return (
        <main className="post-window-main">
            <div className="post-window-container">
                <div className="post-window-header">
                    <div><h3 className="post-window-header-text">{title} &sdot;</h3>  {" "} {handleDate(datePosted)}</div>
                    <span>Posted by {username}</span>
                </div>
                <div className="post-window-content">
                    <p>{body}</p>
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