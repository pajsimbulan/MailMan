import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItem } from '@mui/material';
import AllInboxRoundedIcon from '@mui/icons-material/AllInboxRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import DraftsRoundedIcon from '@mui/icons-material/DraftsRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ComposeEmail from './ComposeEmail';
import SuccessActionAlert from '../../components/SuccessAlert';
import ErrorActionAlert from '../../components/ErrorAlert';

const ListItemStyling = {
  m: 2,
  mx: 2,
  borderRadius: 3,
  p: 2,
  flexWrap: 'wrap',
  '@media (max-width: 1250px)': {
    display: 'flex', flexDirection: 'column', justifyContents: 'center', alignContents: 'center',
  },
  '@media (max-width: 800px)': { p: 1 },
};
const TypographyStyling = {
  color: '#002159', fontWeight: 'bold', my: 1, '@media (max-width: 900px)': { fontSize: 10 },
};

const inboxes = ['inbox', 'sent', 'starred', 'drafts', 'all emails', 'trash', 'spam'];

function MailNavBar({ currentInbox, selectedInbox, onSelect = undefined }) {
  const [selectedIndex, setSelectedIndex] = React.useState(inboxes.indexOf(currentInbox));
  const [composeEmail, setComposeEmail] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  React.useState(() => {
    selectedInbox(inboxes[selectedIndex]);
  }, [selectedIndex]);

  const handleListItemClick = (event, index) => {
    event.preventDefault();
    setSelectedIndex(index);
    selectedInbox(inboxes[index]);
    setTimeout(() => {
      if (onSelect) {
        onSelect();
      }
    }, 200);
  };

  const closeAlerts = () => {
    setOpenSuccess(false);
    setOpenError(false);
  };

  const openAlert = (status) => {
    if (status === 'error') {
      setOpenError(true);
    }
    if (status === 'success') {
      setOpenSuccess(true);
    }

    setTimeout(() => {
      closeAlerts();
    }, 3000);
  };

  return (
    <Box sx={{
      width: '90%',
      display: 'flex',
      flexDirection: 'column',
      borderRight: 'solid',
      borderWidth: 5,
      borderColor: '#C6CED6',
      borderTopRightRadius: 75,
      borderBottomRightRadius: 75,
      bgcolor: 'white',
      py: 2,
      pb: 4,
      '@media (min-width: 800px)': { minHeight: '100vh' },
    }}
    >

      {composeEmail
        ? (
          <ComposeEmail
            openComposeEmail={composeEmail}
            closeComposeEmail={(status) => {
              setComposeEmail(false);
              openAlert(status);
            }}
          />
        ) : null}

      <SuccessActionAlert openAlert={openSuccess} message="Email sent successfully" closeAlert={() => { closeAlerts(); }} />
      <ErrorActionAlert openAlert={openError} message="Error sending email" closeAlert={() => { closeAlerts(); }} />
      <Box sx={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', mt: 2, mx: 3, borderBottomColor: '#C6CED6', pb: 2,
      }}
      >
        <Avatar
          src="postman.jpg"
          sx={{
            width: 50, height: 50, background: 'transparent', my: 'auto', mx: 'auto', mb: 2,
          }}
        />
        <Typography sx={{
          fontWeight: 'bold', fontSize: '20px', color: '#2E3D54', letterSpacing: 8, my: 'auto', overflow: 'hidden', mx: 'auto', '@media (max-width: 1300px)': { fontSize: 14, letterSpacing: 4 }, '@media (max-width: 1000px)': { fontSize: 12, letterSpacing: 2 },
        }}
        >
          MAILMAN
        </Typography>
      </Box>
      <List component="nav" aria-label="main mailbox folders" sx={{}}>
        <ListItemButton
          sx={{
            width: '80%', backgroundColor: '#338FEB', color: 'white', borderRadius: 3, mx: 'auto', my: 2,
          }}
          onClick={() => { setComposeEmail(true); }}
        >
          <Typography variant="overline" sx={{ overflow: 'hidden', mx: 'auto', '@media (max-width: 900px)': { fontSize: 10 } }}>
            Compose
          </Typography>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          sx={ListItemStyling}
        >
          <InboxRoundedIcon sx={{ mr: 2, color: '#002159', '@media (max-width: 1250px)': { mr: 0 } }} />
          <Typography sx={TypographyStyling}>Inbox</Typography>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          sx={ListItemStyling}
        >
          <SendRoundedIcon sx={{ mr: 2, color: '#002159', '@media (max-width: 1250px)': { mr: 0 } }} />
          <Typography sx={TypographyStyling}>Sent</Typography>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
          sx={ListItemStyling}
        >
          <StarRoundedIcon sx={{ mr: 2, color: '#002159', '@media (max-width: 1250px)': { mr: 0 } }} />
          <Typography sx={TypographyStyling}>Starred</Typography>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
          sx={ListItemStyling}
        >
          <DraftsRoundedIcon sx={{ mr: 2, color: '#002159', '@media (max-width: 1250px)': { mr: 0 } }} />
          <Typography sx={TypographyStyling}>Drafts</Typography>
        </ListItemButton>
        <ListItem>
          <Box sx={{
            width: '100%', borderBottom: 'solid', borderBottomWidth: 2, borderBottomColor: '#C6CED6', mx: 3,
          }}
          />
        </ListItem>
        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
          sx={ListItemStyling}
        >

          <AllInboxRoundedIcon sx={{ mr: 2, color: '#002159', '@media (max-width: 1250px)': { mr: 0 } }} />

          <Typography sx={TypographyStyling}>All Emails</Typography>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
          sx={ListItemStyling}
        >
          <DeleteRoundedIcon sx={{ mr: 2, color: '#002159', '@media (max-width: 1250px)': { mr: 0 } }} />
          <Typography sx={TypographyStyling}>Trash</Typography>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 6}
          onClick={(event) => handleListItemClick(event, 6)}
          sx={ListItemStyling}
        >
          <ReportRoundedIcon sx={{ mr: 2, color: '#002159', '@media (max-width: 1250px)': { mr: 0 } }} />
          <Typography sx={TypographyStyling}>Spam</Typography>
        </ListItemButton>
      </List>
    </Box>
  );
}

export default MailNavBar;
