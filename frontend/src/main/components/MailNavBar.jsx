import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItem, ListItemIcon,  ListItemText} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import ComposeEmail from './ComposeEmail';
import { GlobalContext } from '../pages/Mainpage';
import { Typography } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export default function EmailNavBar() {
  const globalVars = React.useContext(GlobalContext);
  console.log('nav bar render');
  const handleListItemClick = (event, index) => {
    globalVars.setSelectedIndex(index);
  };


  return (
    <Box sx={{ width: '100%', minHeight:'100vh', boxShadow:'0',  display:'flex', flexDirection:'column',borderRight: 'solid', borderWidth:'1px', borderColor:'#C6CED6', bgcolor:'white'}}>
      <Box sx={{display:'flex', direction:'flex-row', px:'2em'}}>
        <Avatar src='postman.jpg' sx={{width:50, height:50, }}/>
        <Box sx={{marginY:'auto',  fontWeight: 'bold', fontFamily:'sans-serif', marginX:4}}>
          <Typography variant="h6">
            Mail Man
          </Typography>
        </Box>
      </Box>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem sx={{marginY:2}}>
           <ComposeEmail />
        </ListItem>
        <ListItemButton
          selected={globalVars.selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          sx={{m:3}}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
        <ListItemButton
          selected={globalVars.selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          sx={{m:3}}
        >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItemButton>
        <ListItemButton
          selected={globalVars.selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
          sx={{m:3}}
        >
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItemButton>
        <ListItemButton
          selected={globalVars.selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
          sx={{m:3}}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
        <ListItemButton
          selected={globalVars.selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
          sx={{m:3}}
        >
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItemButton>
        <ListItemButton
          selected={globalVars.selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
          sx={{m:3}}
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
