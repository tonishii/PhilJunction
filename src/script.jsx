import React from 'react';
import ReactDOM from 'react-dom/client';

function Start () {
  return (
    <div>
      <h1>hello world</h1>;
    </div>
  )
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Start />);

export default Start;