import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import EditIcon from '@mui/icons-material/Edit';
import ChatIcon from '@mui/icons-material/Chat';
import ViewListIcon from '@mui/icons-material/ViewList';
import CommentIcon from '@mui/icons-material/Comment';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar-container ${isOpen ? 'active' : ''}`}>
      <div className="sidebar">
        <h1 className="option-title">Choose Your Option</h1>
        <nav>
          <ul>
            <li>
              <Link to="/chat" className="button-link">
                <ChatIcon /> Chat
              </Link>
            </li>
            <li>
              <Link to="/view-posts" className="button-link">
                <ViewListIcon /> View Posts
              </Link>
            </li>
            <li>
              <Link to="/comment" className="button-link">
                <CommentIcon /> Comment
              </Link>
            </li>
            <li>
              <Link to="/edit-user" className="button-link">
                <EditIcon /> Edit User
              </Link>
            </li>
          </ul>
        </nav>
        <button className="toggle-button" onClick={toggleSidebar}>
          Toggle Sidebar
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
