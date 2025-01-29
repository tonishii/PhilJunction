import { Triangle } from "lucide-react"


export default function Post({ title, body, tags, datePosted, user }) {
    function transformDate(datePosted) {
        return "A day ago."
    }
    return (
        <div className="post">
            <div className="post-body">
                <div className="post-header"><h1>{title} &sdot; <span class="gray">{transformDate(datePosted)}</span></h1></div>
                <div className="post-main"><p>{body}</p></div>
                <div className="post-footer">
                    {tags.map(tag => (
                        <span key="tag" className="tag">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="post-sidebar">
                <Triangle />
                <Triangle className="invert" />
            </div>
        </div>
    )
}