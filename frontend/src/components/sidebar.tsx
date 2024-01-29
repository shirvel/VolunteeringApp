import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { styled } from '@mui/system'; // Import styled from @mui/system
import EditIcon from '@mui/icons-material/Edit';
import ChatIcon from '@mui/icons-material/Chat';
import ViewListIcon from '@mui/icons-material/ViewList';
import CommentIcon from '@mui/icons-material/Comment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CreatePostModal } from "../Post/CreatePostModal";
import { EditUserDetailsModal } from "../User/EditUserDetailsModal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 250;
import backgroundImage from '../../public/volunteer.jpg'; // Import the image
const SidebarContainer = styled('div')({
  display: 'flex',
});

const Sidebar = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
});

const SidebarPaper = {
  width: drawerWidth,
  background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
};

const backgroundImageStyle: React.CSSProperties = {
  backgroundImage: `url('${backgroundImage}')`, // Set your background image URL here
  backgroundSize: 'cover',
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: -1, // Place the background image behind other content
};

const OptionTitle = styled('h1')({
  fontSize: 20,
  marginBottom: 20,
  alignSelf: 'flex-start', // Align the title to the left side
});

const ButtonLink = styled('a')({
  display: 'block',
  textDecoration: 'none',
  color: 'white',
  padding: '10px 20px', // Add horizontal padding to the buttons
  textAlign: 'left', // Align text to the left
  border: 'none', // Remove button borders
  backgroundColor: 'transparent', // Make buttons transparent
  transition: 'background-color 0.3s ease', // Add a smooth transition effect
});

const MainButton = styled('button')({
  backgroundColor: '#555',
  width: '100%',
  textAlign: 'left',
  paddingLeft: 20,
  marginBottom: 10, // Add spacing between Main button and other buttons
});

const ButtonListItem = styled(ListItem)({
  '&:hover': {
    backgroundColor: '#555',
  },
});

const Icon = styled('span')({
  marginRight: 10,
});

const StyledHomeIcon = styled(HomeIcon)({
  marginRight: 10,
});

const StyledChatIcon = styled(ChatIcon)({
  marginRight: 10,
});

const StyledViewListIcon = styled(ViewListIcon)({
  marginRight: 10,
});

const StyledCommentIcon = styled(CommentIcon)({
  marginRight: 10,
});

const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)({
  marginRight: 10,
});

const ContentWrapper = styled('div')({
  width: '100%',
  position: 'relative',
});

function SidebarComponent() {
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
    <SidebarContainer>
      <Sidebar
        sx={SidebarPaper} // Apply styles using sx prop
        variant="permanent"
        anchor="left"
      >
        <OptionTitle>Choose Your Option</OptionTitle>
        <List>
          {isMainButtonVisible && (
            <ButtonListItem>
              {/* Show the Main button */}
              <MainButton
                className={`button-link ${MainButton}`}
                onClick={() => {
                  setMainButtonVisible(false);
                  setOtherButtonsVisible(true);
                }}
              >
                <StyledHomeIcon /> Main
              </MainButton>
            </ButtonListItem>
          )}
          {areOtherButtonsVisible && (
            <>
              <ButtonListItem>
                {/* Show the Chat button */}
                <Link to="/chat" className={`button-link ${ButtonLink}`}>
                  <StyledChatIcon /> Chat
                </Link>
              </ButtonListItem>
              <ButtonListItem>
                {/* Show the View Posts button */}
                <Link to="/view-posts" className={`button-link ${ButtonLink}`}>
                  <StyledViewListIcon /> View Posts
                </Link>
              </ButtonListItem>
              <ButtonListItem>
                {/* Show the Comment button */}
                <Link to="/comment" className={`button-link ${ButtonLink}`}>
                  <StyledCommentIcon /> Comment
                </Link>
              </ButtonListItem>
              <ButtonListItem>
                <Link
                  to="/edit-user"
                  className={`button-link ${ButtonLink}`}
                  onClick={() => openEditUserDialog()}
                >
                  <EditIcon/> Edit User
                </Link>
              </ButtonListItem>
              <ButtonListItem>
                <Link
                  to="/posts"
                  className={`button-link ${ButtonLink}`}
                  onClick={() => openCreatePostDialog()}
                >
                  <StyledAddCircleOutlineIcon /> Create Post
                </Link>
              </ButtonListItem>
            </>
          )}
        </List>
        {!isMainButtonVisible && (
          <ButtonListItem>
            <button
              className={`button-link back-button ${ButtonLink}`}
              onClick={() => {
                setMainButtonVisible(true);
                setOtherButtonsVisible(false);
              }}
            >
              <ArrowBackIcon/> Back
            </button>
          </ButtonListItem>
        )}
      </Sidebar>
      <ContentWrapper>
        <div style={backgroundImageStyle}></div>
      </ContentWrapper>
    </SidebarContainer>
  );
}

export default SidebarComponent;
