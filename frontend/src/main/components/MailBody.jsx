/* global alert */
import * as React from 'react';
import {
  useContext, useState, useEffect, useMemo,
} from 'react';
import {
  List, Box, ListItem, Checkbox, Typography, InputLabel, FormControl, NativeSelect
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { UserContext } from '../../App';
import EmailPopOvers from './EmailPopOver';
import EmailDateFilterToggleButton from './EmailDateFilter';
import MailPagination from './MailPagination';
import EmailBlock from '../blocks/MailBodyEmailBlock';
import EmailContentWindow from './EmailContents';
import ComposeEmail from './ComposeEmail';
import useInbox from '../../hooks/useInbox';
import useEmail from '../../hooks/useEmail';
import LoadingBackdrop from '../../components/LoadingBackdrop';

const EmailPopOversStyle = { color: 'grey', height: 20, width: 20 };

function emptyMailMessage(dateRange) {
  if (dateRange === 'today') {
    return 'You have no emails for today';
  }
  if (dateRange === '3d') {
    return 'You have no emails from the past 3 days';
  }
  if (dateRange === '1w') {
    return 'You have no emails from the past week';
  }
  if (dateRange === '1m') {
    return 'You have no emails from the past month';
  }
  if (dateRange === 'all') {
    return 'You have no emails for all time';
  }
  return 'Select a date range to view emails';
}

function MailBody({ selectedInbox, query }) {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [refresh, setRefresh] = useState(false);
  const [checkboxArray, setCheckBoxArray] = useState([]);
  const [openEmail, setOpenEmail] = useState(false);
  const [openDrafts, setOpenDrafts] = useState(false);
  const [openedEmail, setOpenedEmail] = useState(undefined);
  const [dateFilter, setDateFilter] = useState('today');
  const [uniqueEmails, setUniqueEmails] = useState([]);
  const numCheckboxSelected = useMemo(() => { let count = 0; checkboxArray.forEach((checked) => { if (checked) count += 1; }); return count; }, [checkboxArray]);

  const {
    getInbox,
    inbox,
    page,
    limit,
    setPage,
    setLimit,
    paginationData = { totalCount: 0 },
    loading: loadingInbox,
    statusCode: statusCodeInbox,
    errorMessage: errorMessageInbox,
  } = useInbox(user.userInfo._id, selectedInbox, user.accessToken, dateFilter, query);

  const {
    moveEmail,
    loading: loadingEmail,
  } = useEmail();

  useEffect(() => {
    if(statusCodeInbox >= 400) {
      navigate('/uhoh');
    }
  }, [statusCodeInbox]);


  


  useEffect(() => {
    //console.log('getting inbox');
    getInbox();
    // Set up a timer to fetch emails every 5 minutes
    const timer = setInterval(() => {
      getInbox();
    }, 300000);

    // Clean up the timer when the component is unmounted or the dependencies change
    return () => {
      clearInterval(timer);
    };
  }, [refresh, dateFilter, query]);

  useEffect(() => {
    //console.log('setting checkbox array');
    setCheckBoxArray(new Array(paginationData.totalCount).fill(false));
  }, [inbox, inbox.inboxName, selectedInbox]);

  useEffect(() => {
    if (!inbox) return;
    if (!inbox.emails) return;
    if (!inbox.emails) return;
    //console.log(inbox);

    const uniqueEmailIds = new Set();
    let emails;

    if (inbox.inboxName === 'drafts') {
      emails = inbox.drafts.filter((draft) => {
        if (!uniqueEmailIds.has(draft._id)) {
          uniqueEmailIds.add(draft._id);
          return true;
        }
        return false;
      });
    } else {
      emails = inbox.emails.filter((email) => {
        if (!uniqueEmailIds.has(email._id)) {
          uniqueEmailIds.add(email._id);
          return true;
        }
        return false;
      });
    }

    setUniqueEmails(emails);
    setCheckBoxArray(new Array(emails.length).fill(false));
  }, [inbox, selectedInbox]);

  const renderEmails = useMemo(() => {
    if (!uniqueEmails) return null;

    return uniqueEmails.map((email, index) => (
      <ListItem sx={{ width: '100%' }} key={email._id}>
        <EmailBlock
          email={email}
          selected={(email) => {
            setOpenedEmail(email);
            if (inbox.inboxName === 'drafts') {
              setOpenDrafts(true);
            } else {
              setOpenEmail(true);
            }
          }}
          setCheck={(checkValue) => {
            setCheckBoxArray((prevArray) => {
              const tempArray = [...prevArray];
              tempArray[index] = checkValue;
              return tempArray;
            });
          }}
          allChecked={checkboxArray[index]}
        />
      </ListItem>
    ));
  }, [uniqueEmails, refresh, selectedInbox, checkboxArray]);

  const renderNoEmails = useMemo(() => {
    if (inbox && inbox.inboxName === selectedInbox && paginationData.totalCount <= 0 && query.length <= 0) {
      return (
        <Box sx={{
          p: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <Typography sx={{ color: '#808080' }}>
            {emptyMailMessage(dateFilter)}
          </Typography>
        </Box>
      );
    }

    return null;
  }, [inbox, inbox.inboxName, refresh, selectedInbox, dateFilter, checkboxArray]);

  // moveEmail = async (userId, fromInboxName, toInboxName, emailIdArray, accessToken)
  const handleInbox = async () => {
    //console.log('moving emails to inbox');
    if (!inbox) return;
    if (!inbox.emails) return;
    if (selectedInbox === 'inbox') return;
    await moveEmail(user.userInfo._id, selectedInbox, 'inbox', checkboxArray.map((checked, index) => {
      if (checked) {
        return inbox.emails[index]._id;
      }
    }), user.accessToken);
    setRefresh(!refresh);
  };

  const handleDelete = async () => {
    //console.log('deleting emails');
    if (!inbox) return;
    if (!inbox.emails) return;
    if (selectedInbox === 'trash') return;
    await moveEmail(user.userInfo._id, selectedInbox, 'trash', checkboxArray.map((checked, index) => {
      if (checked) {
        return inbox.emails[index]._id;
      }
    }), user.accessToken);
    setRefresh(!refresh);
  };

  const handleSpam = async () => {
    //console.log('marking emails as spam');
    if (!inbox) return;
    if (!inbox.emails) return;
    if (selectedInbox === 'spam') return;
    await moveEmail(user.userInfo._id, selectedInbox, 'spam', checkboxArray.map((checked, index) => {
      if (checked) {
        return inbox.emails[index]._id;
      }
    }), user.accessToken);
    setRefresh(!refresh);
  };

  return (
    <Box sx={{
      width: '100%',
      maxHeight: '100%',
      display: 'flex',
      margin: 0,
      borderRadius: 10,
      alignItems: 'stretch',
      justifyContent: 'center',

      pb: 2,
    }}
    >
      {loadingEmail ? <LoadingBackdrop show message="Moving Emails" /> : null}
      {loadingInbox ? <LoadingBackdrop show message="Fetching Emails" /> : null}
      {openEmail ? (
        <EmailContentWindow
          closeEmail={() => { setOpenEmail(false); setRefresh(!refresh); }}
          email={openedEmail}
        />
      ) : null}
      {openDrafts ? (
        <ComposeEmail
          openComposeEmail={openDrafts}
          closeComposeEmail={() => { setOpenDrafts(false); setRefresh(!refresh); }}
          draftId={openedEmail._id}
        />
      ) : null}
      <List sx={{
        width: '100%', maxWidth: '95%', borderRadius: 10, bgcolor: 'transparent', boxShadow: '3', mt: 2, px: 2,
      }}
      >
        <ListItem sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          '@media (max-width: 400px)': { flexDirection: 'column', justifyContent: 'center' },
        }}
        >
          <Box sx={{
            my: 'auto', bgcolor: '#dceaf7', borderRadius: 10, px: 0.5, m: 1, mr: 1, '@media (max-width: 800px)': { m: 0, mr: 0.5 },
          }}
          >
            <Checkbox
              edge="start"
              sx={{
                color: 'grey', transform: 'scale(0.8)', ml: 0.5, '@media (max-width: 800px)': { transform: 'scale(0.65)' },
              }}
              onChange={(event) => {
                if (inbox && paginationData && paginationData.totalCount > 0) {
                  setCheckBoxArray(new Array(paginationData.totalCount).fill(event.target.checked));
                }
              }}
            />
            <EmailPopOvers item={() => <RefreshIcon sx={EmailPopOversStyle} onClick={() => { setRefresh(!refresh); }} />} name="Refresh" />
            {numCheckboxSelected > 0 ? (
              <>
                <EmailPopOvers item={() => <MoveToInboxIcon sx={EmailPopOversStyle} onClick={handleInbox} />} name="Inbox" />
                <EmailPopOvers item={() => <DeleteForeverIcon sx={EmailPopOversStyle} onClick={handleDelete} />} name="Delete" />
                <EmailPopOvers item={() => <ReportGmailerrorredIcon sx={EmailPopOversStyle} onClick={handleSpam} />} name="Spam" />
              </>
            )
              : null}
          </Box>
          {inbox && inbox.inboxName === selectedInbox ? <MailPagination range={paginationData.limit} totalCount={paginationData.totalCount} currentPage={page} changePage={(pageNumber) => { setPage(pageNumber); }} /> : null}
          <EmailDateFilterToggleButton setFilter={(filter) => { setDateFilter(filter); }} />
        </ListItem>
        {inbox && numCheckboxSelected > 0
          ? (
            <ListItem sx={{
              display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
            }}
            >
              <Typography sx={{
                color: '#808080', fontSize: 16, p: 1.5, m: 1, '@media (max-width: 900px)': { fontSize: 14.5 }, '@media (max-width: 400px)': { fontSize: 11 },
              }}
              >
                {`Currently selecting ${numCheckboxSelected} conversation${(numCheckboxSelected === 1 ? '' : 's')}` }
              </Typography>
            </ListItem>
          ) : null}
          {inbox && query.length > 0
          ? (
            <ListItem sx={{
              display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
            }}
            >
              <Typography sx={{
                color: '#808080', fontSize: 16, p: 1.5, m: 1, '@media (max-width: 900px)': { fontSize: 14.5 }, '@media (max-width: 400px)': { fontSize: 11 },
              }}
              >
                {"Search Results:" }
              </Typography>
            </ListItem>
          ) : null}
        {renderEmails}
        {renderNoEmails}
        <ListItem sx={{ display:'flex', flexDirection:'row', flexGrow:1, justifyContent:'end'}}>
          <Box sx={{width:100}}>
            <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Rows Per Page
            </InputLabel>
            <NativeSelect
              defaultValue={limit ? limit : 10}
              onChange={(event) => {setLimit(event.target.value)}}
              inputProps={{
                name: 'age',
                id: 'uncontrolled-native',
              }}
            >
              <option value={1}>1</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </NativeSelect>
          </FormControl>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
}

MailBody.propTypes = {
  selectedInbox: PropTypes.string.isRequired,
};

export default MailBody;
