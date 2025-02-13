import '@/styles/post-styles.css'

import { Link } from "react-router";

export default function SmallPost({
  title,
  body,
  tags,
}: {
  title: string;
  body: string;
  tags: string[];
}) {

  return (
    <div className="smallpost-container">
      <Link to="/post" className="post-link">
        <div className="smallpost-header">
          <h1>{title}</h1>

          <div className="tag-list">
            {tags.map((tag, i) => (
              <span key={tag + i} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="smallpost-body">
          <p>{body}</p>
        </div>
      </Link>
    </div>
  );
}
