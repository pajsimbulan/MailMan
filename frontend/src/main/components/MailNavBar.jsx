import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItem, ListItemIcon} from '@mui/material';
import AllInboxRoundedIcon from '@mui/icons-material/AllInboxRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import DraftsRoundedIcon from '@mui/icons-material/DraftsRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import ComposeEmail from './ComposeEmail';
import { GlobalContext } from '../pages/Mainpage';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

//bgcolor:'#002159
const ListItemStyling = {m:2, mr:4, borderRadius:3, p:3, overflow:'hidden'};
const TypographyStyling = {color:'#002159', fontWeight:'bold'};

function MailNavBar() {
  const globalVars = React.useContext(GlobalContext);
  console.log('nav bar render');
  const handleListItemClick = (event, index) => {
    globalVars.setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: '90%', minHeight:'100vh', display:'flex', flexDirection:'column',borderRight: 'solid',borderWidth:5, borderColor:'#C6CED6', borderTopRightRadius:75, borderBottomRightRadius:75, bgcolor:'white'}}>
      <Box sx={{display: 'flex', flexDirection:'row', flexWrap:'wrap', alignItems:'center', mt:2,  mx:3,  borderBottomColor:'#C6CED6', pb:2,}}>
              <Avatar src='postman.jpg' sx={{width:50, height:50, background:'transparent', my:'auto', mx:2, mb:2}}/>
              <Typography  sx={{fontWeight:'bold', fontSize:'20px', color:'#2E3D54', letterSpacing:8, my:'auto', overflow:'hidden'}}>MAILMAN</Typography>
        </Box>
      <List component="nav" aria-label="main mailbox folders" >
        <ListItem sx={{marginY:2}}>
           <ComposeEmail />
        </ListItem>
        <ListItemButton
          selected={globalVars.selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          sx={ListItemStyling}
        >
          <ListItemIcon>
            <InboxRoundedIcon sx={{color:'#002159'}} />
          </ListItemIcon>
          <Typography sx={TypographyStyling}>Inbox</Typography>
        </ListItemButton>
        <ListItemButton
          selected={globalVars.selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          sx={ListItemStyling}
        >
          <ListItemIcon>
            <SendRoundedIcon sx={{color:'#002159'}}/>
          </ListItemIcon>
          <Typography sx={TypographyStyling}>Sent</Typography>
        </ListItemButton>
        <ListItemButton
          selected={globalVars.selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
          sx={ListItemStyling}
        >
          <ListItemIcon>
            <StarRoundedIcon sx={{color:'#002159'}}/>
          </ListItemIcon>
          <Typography sx={TypographyStyling}>Starred</Typography>
        </ListItemButton>
        <ListItemButton
          selected={globalVars.selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
          sx={ListItemStyling}
        >
          <ListItemIcon>
            <DraftsRoundedIcon sx={{color:'#002159'}}/>
          </ListItemIcon>
          <Typography sx={TypographyStyling}>Drafts</Typography>
        </ListItemButton>
        <ListItem>
          <Box sx={{width:'100%', borderBottom:'solid', borderBottomWidth:2, borderBottomColor:'#C6CED6', mx:3}}/>
        </ListItem>
        <ListItemButton
          selected={globalVars.selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
          sx={ListItemStyling}
        >
            <ListItemIcon>
                <AllInboxRoundedIcon sx={{color:'#002159'}}/>
            </ListItemIcon>
          <Typography sx={TypographyStyling}>All Emails</Typography>
        </ListItemButton>
        <ListItemButton
          selected={globalVars.selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
          sx={ListItemStyling}
        >
            <ListItemIcon>
                <DeleteRoundedIcon sx={{color:'#002159'}}/>
            </ListItemIcon>
          <Typography sx={TypographyStyling}>Trash</Typography>
        </ListItemButton>
        <ListItemButton
          selected={globalVars.selectedIndex === 6}
          onClick={(event) => handleListItemClick(event, 6)}
          sx={ListItemStyling}
        >
          <ListItemIcon>
                <ReportRoundedIcon sx={{color:'#002159'}}/>
          </ListItemIcon>
          <Typography sx={TypographyStyling}>Spam</Typography>
        </  ListItemButton>
      </List>
    </Box>
  );
}

export default MailNavBar;