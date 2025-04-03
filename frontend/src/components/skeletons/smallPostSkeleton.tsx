import '@/styles/post-styles.css'

export default function SmallPostSkeleton() {
  return (
    <div className="smallpost-container">
        <div className="smallpost-header">
          <div className="skeleton skeleton-title"></div>

          <div className="tag-list">
            {Array(4).fill(null).map((_, i) => (
              <span key={i} className="skeleton skeleton-smalltag">
                {" "}
              </span>
            ))}
          </div>
        </div>

        <div className="skeleton-smallpost-body-wrapper">
          <div className='skeleton skeleton-smallbody'></div>
        </div>
    </div>
  );
}
