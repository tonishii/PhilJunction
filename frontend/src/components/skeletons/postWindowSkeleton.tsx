export default function PostWindowSkeleton() {
  return (
    <div className="post-window-container">
      <div className="post-window-header">
        <div className="post-window-title">
          <div className='skeleton skeleton-title'></div>
        </div>
        <hr />
        <div className="post-info">
          <div className="skeleton skeleton-info"></div>
        </div>
      </div>

      <div className="post-window-main">
        <div className="tag-list">
          {Array(5).fill(null).map((_, i) => (
            <span key={i} className="skeleton skeleton-tag">
              {" "}
            </span>
          ))}
        </div>

        <div className='skeleton-images'>
          <div className='skeleton skeleton-image'></div>
          <div className='skeleton skeleton-image'></div>
        </div>
        <div className='skeleton skeleton-body'></div>

        <div className="skeleton skeleton-map"></div>
      </div>

      <div className="post-window-footer">
        <div className='skeleton skeleton-buttons'></div>
      </div>

      <div className="post-window-comments">
        <div className='skeleton skeleton-comments'></div>
        <div className='skeleton skeleton-comments'></div>
      </div >
    </div >
  );
}
