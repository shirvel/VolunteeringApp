import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ChatIcon from '@mui/icons-material/Chat';
import PostIcon from '@mui/icons-material/PostAdd';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <List>
        <ListItemButton onClick={() => navigateTo('/edit-user')} style={{ color: 'blue' }}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Edit User" />
        </ListItemButton>
        <ListItemButton onClick={() => navigateTo('/chat')} style={{ color: 'blue' }}>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Enter Chat" />
        </ListItemButton>
        <ListItemButton onClick={() => navigateTo('/view-posts')} style={{ color: 'blue' }}>
          <ListItemIcon>
            <PostIcon />
          </ListItemIcon>
          <ListItemText primary="View Posts" />
        </ListItemButton>
      </List>
    </div>
  );
};

export default Sidebar;
