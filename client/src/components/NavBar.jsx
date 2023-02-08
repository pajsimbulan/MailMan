import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItem, ListItemIcon,  ListItemText} from '@mui/material';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import ComposeEmail from './ComposeEmail';
import { GlobalContext } from '../Mainpage';

export default function SelectedListItem() {
  const globalVars = React.useContext(GlobalContext);
  console.log('nav bar render');
  const handleListItemClick = (event, index) => {
    globalVars.setSelectedIndex(index);
  };


  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List spacing={4  } component="nav" aria-label="main mailbox folders">
        <ListItem>
           <ComposeEmail />
        </ListItem>
        <ListItemButton
          selected={globalVars.selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
        <ListItemButton
          selected={globalVars.selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItemButton>
        <ListItemButton
          selected={globalVars.selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItemButton>
        <ListItemButton
          selected={globalVars.selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
        <ListItemButton
          selected={globalVars.selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItemButton>
        <ListItemButton
          selected={globalVars.selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
        >
          <ListItemIcon>
                <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Spam" />
        </ListItemButton>
      </List>
    </Box>
  );
}
