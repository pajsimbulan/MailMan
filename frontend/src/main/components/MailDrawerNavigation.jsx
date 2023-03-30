import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

function MailDrawerNavigation({drawerNavigationProps}) {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <>
          <IconButton onClick={() => setOpenDrawer(true)}><MenuIcon/></IconButton>
          <Drawer
            anchor='left'
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            PaperProps={{sx:{display:'flex', bgcolor:'transparent', boxShadow:0, border:'none',}}}
          >
            {drawerNavigationProps}
          </Drawer>
   </>
  );
}

export default MailDrawerNavigation