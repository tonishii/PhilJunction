import '@/styles/post-styles.css'

import { Link } from "react-router";
import type { Post } from '@/mockdata/post-data';
import ReactMarkdown from 'react-markdown';

export default function SmallPost({
  post,
}: {
  post: Post;
}) {

  return (
    <div className="smallpost-container">
      <Link to="/post" className="post-link">
        <div className="smallpost-header">
          <p>{post.title}</p>

          <div className="tag-list">
            {post.tags.map((tag, i) => (
              <span key={tag + i} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="smallpost-body">
          <ReactMarkdown className="post-body" children={post.body} />
        </div>
      </Link>
    </div>
  );
}
