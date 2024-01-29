import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import EditIcon from '@mui/icons-material/Edit';
import ChatIcon from '@mui/icons-material/Chat';
import ViewListIcon from '@mui/icons-material/ViewList';
import CommentIcon from '@mui/icons-material/Comment';
import LogOffIcon from '@mui/icons-material/ExitToApp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export default function TemporaryDrawer({state, setSate, toggleDrawer}) {
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
       <List>
        {/* Posts */}
        <ListItem key="view-posts" disablePadding>
        <ListItemButton href={`/view-posts`}>
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="view-posts" />
          </ListItemButton>
        </ListItem>

        {/* Comments */}
        <ListItem key="Comments" disablePadding>
        <ListItemButton href={`/comment`}>
            <ListItemIcon>
              <CommentIcon />
            </ListItemIcon>
            <ListItemText primary="Comments" />
          </ListItemButton>
        </ListItem>

        {/* Chat */}
        <ListItem key="Chat" disablePadding>
          <ListItemButton href={`/chat`}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        {/* Edit User */}
        <ListItem key="edit-user" disablePadding>
        <ListItemButton href={`/edit-user`}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="edit-user" />
          </ListItemButton>
        </ListItem>

        {/* LogOff */}
        <ListItem key="LogOff" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LogOffIcon />
            </ListItemIcon>
            <ListItemText primary="LogOff" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
