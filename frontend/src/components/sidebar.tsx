import React , { useState }from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import EditIcon from '@mui/icons-material/Edit';
import ChatIcon from '@mui/icons-material/Chat';
import ViewListIcon from '@mui/icons-material/ViewList';
import CommentIcon from '@mui/icons-material/Comment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CreatePostModal } from "../Post/CreatePostModal";
import { EditUserDetailsModal } from "../User/EditUserDetailsModal";

function Sidebar() {
  const [isCreatePostDialogOpen, setCreatePostDialogOpen] = useState(false); // State for dialog visibility
  const [isEditUserDialogOpen, setEditUserDialogOpen] = useState(false);

  // Function to open the Create Post dialog
  const openCreatePostDialog = () => {
    setCreatePostDialogOpen(true);
  };

  // Function to close the Create Post dialog
  const closeCreatePostDialog = () => {
    setCreatePostDialogOpen(false);
  };
  const openEditUserDialog = () => {
    setEditUserDialogOpen(true);
  };
  
  // Function to close the Edit User dialog
  const closeEditUserDialog = () => {
    setEditUserDialogOpen(false);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <h1 className="option-title">Choose Your Option</h1>
        <nav>
          <ul>
            <li>
              {/* Open the Create Post dialog on link click */}
              <Link
                to="/posts"
                className="button-link"
                onClick={() => openCreatePostDialog()}
              >
                <AddCircleOutlineIcon /> Create Post
              </Link>
            </li>
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
              <Link
                to="/edit-user"
                className="button-link"
                onClick={() => openEditUserDialog()}
              >
                <EditIcon /> Edit User
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Pass the dialog state to CreatePostModal */}
      <CreatePostModal open={isCreatePostDialogOpen} onClose={closeCreatePostDialog} />
      <EditUserDetailsModal open={isEditUserDialogOpen} onClose={closeEditUserDialog} />

    </div>
  );
}

export default Sidebar;