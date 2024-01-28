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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

function Sidebar() {
  const [isCreatePostDialogOpen, setCreatePostDialogOpen] = useState(false); // State for dialog visibility
  const [isEditUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [isMainButtonVisible, setMainButtonVisible] = useState(true);
  const [areOtherButtonsVisible, setOtherButtonsVisible] = useState(false);


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
          {isMainButtonVisible && (
            <li className="button-list-item">
              {/* Show the Main button */}
              <button
                className="button-link main-button"
                onClick={() => {
                  setMainButtonVisible(false);
                  setOtherButtonsVisible(true);
                }}
              >
                <HomeIcon /> Main
              </button>
            </li>
          )}
          {areOtherButtonsVisible && (
            <>
              <li>
                {/* Show the Chat button */}
                <Link to="/chat" className="button-link">
                  <ChatIcon /> Chat
                </Link>
              </li>
              <li>
                {/* Show the View Posts button */}
                <Link to="/view-posts" className="button-link">
                  <ViewListIcon /> View Posts
                </Link>
              </li>
              <li>
                {/* Show the Comment button */}
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
              <li>
                <Link
                  to="/posts"
                  className="button-link"
                  onClick={() => openEditUserDialog()}
                >
                  <AddCircleOutlineIcon /> Create Post
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
    {!isMainButtonVisible && (
      <li>
        <button
          className="button-link back-button"
          onClick={() => {
            setMainButtonVisible(true);
            setOtherButtonsVisible(false);
          }}
        >
          <ArrowBackIcon /> Back
        </button>
      </li>
    )}

    {/* Pass the dialog state to CreatePostModal */}
    <CreatePostModal open={isCreatePostDialogOpen} onClose={closeCreatePostDialog} />
    <EditUserDetailsModal open={isEditUserDialogOpen} onClose={closeEditUserDialog} />
  </div>
);
}

export default Sidebar;