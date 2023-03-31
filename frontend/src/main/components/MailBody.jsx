import * as React from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Toolbar } from '@mui/material';
import { useNavigate } from 'react-router';
import {
  useContext, useState, useEffect, useRef,
} from 'react';
import { UserContext } from '../../App';
import EmailPopOvers from './EmailPopOver';
import EmailDateFilterToggleButton from './EmailDateFilter';
import MailPagination from './MailPagination';
import EmailBlock from '../blocks/MailBodyEmailBlock';
import EmailContentWindow from './EmailContents';
import { tempEmails } from '../../utils/tempEmails';

const EmailPopOversStyle = { color: 'grey', height: 20, width: 20 };

function MailBody({ selectedInbox }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const user = useContext(UserContext);
  const size = useRef(0);
  const [refresh, setRefresh] = useState(false);
  const [checkboxArray, setCheckBoxArray] = useState([]);
  const [openEmail, setOpenEmail] = React.useState(false);
  const [openedEmail, setOpenedEmail] = React.useState(undefined);
  const [dateFilter, setDateFilter] = useState('today');
  const [selected, setSelected] = useState([]);

  const renderEmails = React.useMemo(() => (tempEmails.map((email) => (
    <ListItem
      sx={{ width: '100%' }}
      key={email._id}
    >
      <EmailBlock
        email={email}
        selected={(email) => {
          setOpenEmail(true);
          setOpenedEmail(email);
        }}
      />
    </ListItem>
  ))), [data]);

  useEffect(() => {
    console.log('mailbody fetching data');
    fetch('http://localhost:4000/v0/email', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json ', Authorization: (`jwt ${user.accessToken.toString()}`) },
    }).then((res) => res.json()).then((jsondata) => {
      size.current = jsondata.length;
      setData(jsondata);
      setCheckBoxArray(new Array(size.current).fill(false));
    }).catch((error) => {
      alert(error);
      // navigate("/");
    });
  }, [refresh]);

  return (
    <Box sx={{
      width: '100%', maxHeight: '100%', display: 'flex', margin: 0, borderRadius: 10, alignItems: 'stretch', justifyContent: 'center', overflow: 'scroll',
    }}
    >
      {openEmail ? <EmailContentWindow closeEmail={() => { setOpenEmail(false); }} email={openedEmail} /> : null}
      <List sx={{
        width: '100%', maxWidth: '95%', borderRadius: 10, bgcolor: 'transparent', boxShadow: '3', mt: 2, px: 2,
      }}
      >
        <ListItem sx={{
          display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', '@media (max-width: 400px)': { flexDirection: 'column', justifyContent: 'center' },
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
                setSelected((selected) => { selected.push(1); console.log(selected); return selected; });
              }}
            />
            <EmailPopOvers item={() => <RefreshIcon sx={EmailPopOversStyle} />} name="Refresh" />
            {selected.length > 0 ? (
              <>
                <EmailPopOvers item={() => <DeleteForeverIcon sx={EmailPopOversStyle} />} name="Delete" />
                <EmailPopOvers item={() => <StarIcon sx={EmailPopOversStyle} />} name="Starred" />
                <EmailPopOvers item={() => <ReportGmailerrorredIcon sx={EmailPopOversStyle} />} name="Spam" />
              </>
            )
              : null}
          </Box>
          <MailPagination range={50} totalCount={11} />
          <EmailDateFilterToggleButton setFilter={(filter) => { setDateFilter(filter); }} />
        </ListItem>
        {renderEmails}
      </List>
    </Box>
  );
}

export default MailBody;
