import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {
  Avatar, useMediaQuery, Zoom, Box,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ReplyIcon from '@mui/icons-material/Reply';
import PropTypes from 'prop-types';
import formatDate from '../../utils/DateFormat';
import EmailReplying from '../blocks/EmailReplying';
import EmailReplyBlock from '../blocks/EmailReplyBlock';

function EmailContentWindow({ closeEmail, email, onClose }) {
  const [open, setOpen] = React.useState(true);
  const [starred, setStarred] = React.useState(false);
  const [reply, setReply] = React.useState(false);
  const isLessThan800 = useMediaQuery('(max-width:800px)');
  const replies = React.useRef([]);
  console.log(replies.current.length);
  const handleClose = () => {
    console.log('handleClose called');
    setOpen(false);
    closeEmail();
    // onClose(starred);
  };

  const mobileHeader = React.useMemo(() => (
    <Box sx={{
      display: 'flex', flexDirection: 'column', flexWrap: 'wrap', p: 1,
    }}
    >
      <Box sx={{
        display: 'flex', flexDirection: 'row', flexGrow: 1, justifyContent: 'end',
      }}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => {
            console.log('Close button clicked');
            handleClose();
          }}
          aria-label="close"
          sx={{
            mr: 1, height: 20, width: 20, my: 'auto',
          }}
        >
          <CloseIcon sx={{ height: 20, width: 20 }} />
        </IconButton>
      </Box>
      <Box sx={{
        width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', px: 1,
      }}
      >
        <Typography sx={{
          fontWeight: 'bold',
          my: 'auto',
          fontSize: '12px',
          textAlign: 'center',
          '@media (max-width: 500px)': { fontSize: '10px' },
        }}
        >
          {email.subject}
        </Typography>
      </Box>
      <Box sx={{
        width: '100%', display: 'flex', px: 1, my: 1, flexDirection: 'row',
      }}
      >
        <Avatar sx={{
          height: 50, width: 50, mr: 1.5, my: 'auto', '@media (max-width: 700px)': { mx: 0.5 },
        }}
        />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          my: 'auto',
          '@media (max-width: 500px)': { whiteSpace: 'none', overflow: 'auto' },
        }}
        >
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            Zaheer
          </Typography>
          <Typography sx={{ fontSize: '10px' }}>
            {`<${email.from}>`}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexgrow: 1 }} />
        <Box sx={{
          width: '100%', display: 'flex', justifyContent: 'end', px: 1,
        }}
        >
          <Typography sx={{ my: 'auto', color: '#8e8080', fontSize: '10px' }}>
            {formatDate(email.createdAt)}
          </Typography>
          <IconButton
            sx={{
              height: 20, width: 20, my: 'auto', ml: 0.5,
            }}
            onClick={(event) => { event.stopPropagation(); setStarred(!starred); console.log('star'); }}
          >
            {starred
              ? <StarIcon sx={{ height: 20, width: 20 }} />
              : <StarBorderIcon sx={{ height: 20, width: 20 }} />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  ), [email]);

  const pcHeader = React.useMemo(() => (
    <Box sx={{
      display: 'flex', flexDirection: 'row', flexWrap: 'wrap', p: 2,
    }}
    >
      <Box sx={{
        width: '33.33%', display: 'flex', px: 1, flexDirection: 'row',
      }}
      >
        <Avatar sx={{
          mr: 2,
          height: 60,
          width: 60,
          my: 'auto',
          '@media (max-width: 1000px)': { height: 50, width: 50, mr: 1.5 },
        }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', my: 'auto' }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: 15,
              fontWeight: 'bold',
              '@media (max-width: 1000px)': { fontSize: '12px' },
            }}
          >
            Zaheer
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: 12,
              '@media (max-width: 1000px)': { fontSize: '10px' },
            }}
          >
            {`<${email.from}>`}
          </Typography>
        </Box>
      </Box>
      <Box sx={{
        width: '33.33%', display: 'flex', justifyContent: 'center', flexDirection: 'column', px: 1,
      }}
      >
        <Typography sx={{
          fontWeight: 'bold',
          my: 'auto',
          '@media (max-width: 1000px)': { fontSize: '12px' },
          textAlign: 'center',
        }}
        >
          {email.subject}
        </Typography>
      </Box>
      <Box sx={{
        width: '33.33%', display: 'flex', justifyContent: 'end', px: 1,
      }}
      >
        <Typography sx={{
          my: 'auto',
          color: '#8e8080',
          fontSize: '13px',
          '@media (max-width: 1000px)': { fontSize: '10px' },
        }}
        >
          {formatDate(email.createdAt)}
        </Typography>
        <IconButton
          sx={{
            height: 40, width: 40, my: 'auto', mx: 1,
          }}
          onClick={(event) => { event.stopPropagation(); setStarred(!starred); console.log('star'); }}
        >
          {starred ? <StarIcon sx={{ height: 25, width: 25 }} />
            : <StarBorderIcon sx={{ height: 25, width: 25 }} />}
        </IconButton>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => {
            console.log('Close button clicked');
            handleClose();
          }}
          aria-label="close"
          sx={{ mr: 1 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  ), [email]);

  return (
    <Box>
      <Dialog
        TransitionComponent={Zoom}
        transitionDuration={1000}
        PaperProps={{
          style: {
            minHeight: '90%',
            maxHeight: '90%',
            minWidth: '90%',
            maxWidth: '90%',
            border: 'solid',
            borderWidth: 5,
            borderRadius: 10,
            borderColor: '#edf4fb',

          },
        }}
        open={open}
        onClose={() => {
          console.log('Modal closed');
          handleClose();
        }}
      >
        <Box sx={{ width: '100%' }}>
          {isLessThan800 ? mobileHeader : pcHeader}
          {/** Main Email */}
          <Box sx={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            bgcolor: '#ECEFF1',
            mx: 5,
            p: 2,
            borderRadius: 5,
            gap: 2,
            overflow: 'auto',
            '@media (max-width: 500px)': { mx: 3 },
          }}
          >
            <Typography sx={{
              '@media (max-width: 1000px)': { fontSize: '12px' },
              '@media (max-width: 800px)': { fontSize: '10px' },
            }}
            >
              {email.contents + email.contents + email.contents + email.contents}
            </Typography>
            <Avatar sx={{ width: 200, height: 200 }} />
          </Box>
          {replies.current.map((reply) => <EmailReplyBlock key={reply} contents={reply} />)}
          {reply ? null
            : (
              <Box sx={{
                display: 'flex', flexGrow: 1, justifyContent: 'end', my: 1, mx: 5,
              }}
              >
                <Button
                  size={isLessThan800 ? 'small' : 'medium'}
                  variant="outlined"
                  onClick={() => { setReply(true); }}
                  endIcon={<ReplyIcon />}
                  sx={{
                    border: 'solid', borderRadius: 4, borderWidth: 2, textTransform: 'none', color: '#338feb',
                  }}
                >
                  Reply
                </Button>
              </Box>
            ) }
          {/** END of Main Email */}
          {/** Reply Email */}
          {reply ? (
            <EmailReplying
              submitReply={(value) => { setReply(false); replies.current.push(value); }}
              exitReply={() => { setReply(false); }}
            />
          )
            : null}
          {/** END of Reply Email */}

        </Box>
      </Dialog>
    </Box>
  );
}

EmailContentWindow.propTypes = {
  closeEmail: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  email: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EmailContentWindow;
