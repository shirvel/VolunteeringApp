import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <h1>Sidebar</h1>
      <nav>
        <ul>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
          <li>
            <Link to="/view-posts">View Posts</Link>
          </li>
          <li>
            <Link to="/edit-user">Edit User</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
