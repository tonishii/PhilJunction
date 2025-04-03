import '@styles/post-styles.css';
import '@styles/skeleton-styles.css';

export default function PostSkeleton() {
  return (
    <div className="post-container">
      <div className="post-main">
        <div className="post-header">
            <a>
              <div className='skeleton skeleton-title'></div>
              <hr />
              <div className="post-info">
                <div className="skeleton skeleton-info"></div>
              </div>
            </a>
        </div>

        <div className="post-body-container">
          <div className='skeleton skeleton-body'></div>
          <div className='skeleton-images'>
            <div className='skeleton skeleton-image'></div>
            <div className='skeleton skeleton-image'></div>
          </div>
        </div>

        <div className="post-footer">
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="skeleton skeleton-tag">
              {" "}
            </span>
          ))}
        </div>
      </div>

      <div className="post-sidebar">
      </div>
    </div>
  );
}
