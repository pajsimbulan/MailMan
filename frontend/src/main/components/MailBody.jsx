/* global alert */
import * as React from 'react';
import {
  useContext, useState, useEffect, useMemo,
} from 'react';
import {
  List, Box, ListItem, Checkbox, Typography,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
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
import useEmail from '../../hooks/useEmail';
import useInbox from '../../hooks/useInbox';
import useDraft from '../../hooks/useDraft';

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

function MailBody({ selectedInbox }) {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [refresh, setRefresh] = useState(false);
  const [checkboxArray, setCheckBoxArray] = useState([]);
  const [openEmail, setOpenEmail] = useState(false);
  const [openDrafts, setOpenDrafts] = useState(false);
  const [openedEmail, setOpenedEmail] = useState(undefined);
  const [dateFilter, setDateFilter] = useState('today');
  const [selected, setSelected] = useState([]);
  console.log(`refresh: ${refresh}`);
  const {
    getEmail,
    email,
    loading: loadingEmail,
    statusCode: statusCodeEmail,
    errorMessage: errorMessageEmail,
  } = useEmail();
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
  } = useInbox();
  const {
    updateDraft,
    getDraft,
    postDraft,
    deleteDrafts,
    draft,
    loading: loadingDraft,
    email: emailDraft,
    statusCode: statusCodeDraft,
    errorMessage: errorMessageDraft,
  } = useDraft();

  useEffect(() => {
    console.log('getting inbox');
    getInbox(user.userInfo._id, selectedInbox, user.accessToken, page, 10);
  }, [refresh, selectedInbox]);

  const renderEmails = useMemo(() => {
    if (!inbox || !inbox.emails) return null;
    console.log(inbox);
    console.log(`paginationDatas: ${paginationData.page} ${paginationData.limit} ${paginationData.totalCount} ${paginationData.totalPages}`);
    const uniqueEmailIds = new Set();
    let uniqueEmails;
    if (inbox.inboxName === 'drafts') {
      uniqueEmails = inbox.drafts.filter((draft) => {
        if (!uniqueEmailIds.has(draft._id)) {
          uniqueEmailIds.add(draft._id);
          return true;
        }
        return false;
      });
    } else {
      uniqueEmails = inbox.emails.filter((email) => {
        if (!uniqueEmailIds.has(email._id)) {
          uniqueEmailIds.add(email._id);
          return true;
        }
        return false;
      });
    }

    return uniqueEmails.map((email) => (
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
        />
      </ListItem>
    ));
  }, [inbox, inbox.inboxName, refresh, selectedInbox]);

  const renderNoEmails = useMemo(() => {
    if (inbox && inbox.inboxName === selectedInbox && paginationData.totalCount <= 0) {
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
  }, [inbox, inbox.inboxName, refresh, selectedInbox, dateFilter]);

  return (
    <Box sx={{
      width: '100%',
      maxHeight: '100%',
      display: 'flex',
      margin: 0,
      borderRadius: 10,
      alignItems: 'stretch',
      justifyContent: 'center',
      overflow: 'scroll',
      pb: 2,
    }}
    >
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
                setCheckBoxArray(new Array(size.current).fill(event.target.checked));
                setSelected(
                  (selected) => { selected.push(1); console.log(selected); return selected; },
                );
              }}
            />
            <EmailPopOvers item={() => <RefreshIcon sx={EmailPopOversStyle} onClick={() => { setRefresh(!refresh); }} />} name="Refresh" />
            {selected.length > 0 ? (
              <>
                <EmailPopOvers item={() => <DeleteForeverIcon sx={EmailPopOversStyle} onClick={() => { setRefresh(!refresh); }} />} name="Delete" />
                <EmailPopOvers item={() => <StarIcon sx={EmailPopOversStyle} onClick={() => { setRefresh(!refresh); }} />} name="Starred" />
                <EmailPopOvers item={() => <ReportGmailerrorredIcon sx={EmailPopOversStyle} onClick={() => { setRefresh(!refresh); }} />} name="Spam" />
              </>
            )
              : null}
          </Box>
          {inbox && inbox.inboxName === selectedInbox ? <MailPagination range={paginationData.limit} totalCount={paginationData.totalCount} /> : null}
          <EmailDateFilterToggleButton setFilter={(filter) => { setDateFilter(filter); }} />
        </ListItem>
        {renderEmails}
        {renderNoEmails}
      </List>
    </Box>
  );
}

MailBody.propTypes = {
  selectedInbox: PropTypes.string.isRequired,
};

export default MailBody;
