import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import MailNavBar from './MailNavBar';

function MailDrawerNavigation({ currentInbox, selectedInbox }) {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <>
      <IconButton onClick={() => setOpenDrawer(true)}><MenuIcon /></IconButton>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            display: 'flex', bgcolor: 'transparent', boxShadow: 0, border: 'none',
          },
        }}
      >
        <MailNavBar
          currentInbox={currentInbox}
          selectedInbox={selectedInbox}
          onSelect={() => setOpenDrawer(false)}
        />
      </Drawer>
    </>
  );
}

MailDrawerNavigation.propTypes = {
  currentInbox: PropTypes.string.isRequired,
  selectedInbox: PropTypes.func.isRequired,
};

export default MailDrawerNavigation;
