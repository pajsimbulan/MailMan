import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar, Divider, TextField, useMediaQuery,
  Box, Button, IconButton, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { UserContext } from '../../App';

const iconButtonStyling = { height: 25, width: 25, '@media (max-width: 800px)': { height: 20, width: 20 } };

function EmailReplying({ submitReply, exitReply }) {
  const isLessThan800 = useMediaQuery('(max-width:800px)');
  const isLessThan1000 = useMediaQuery('(max-width:1000px)');
  const user = React.useContext(UserContext);
  const [value, setValue] = React.useState('');
  return (
    <Box sx={{ width: '100%' }}>
      <Divider sx={{ my: 2 }} />
      <Box
        component="form"
        onSubmit={() => { submitReply(value); }}
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          bgcolor: '#ECEFF1',
          mx: 5,
          p: 2,
          borderRadius: 5,
          '@media (max-width: 500px)': { mx: 3 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <Avatar src={user.userInfo.avatar ? `data:image/jpeg;base64,${user.userInfo.avatar}` : null} />
            <Typography sx={{ fontWeight: 'bold', my: 'auto', '@media (max-width: 1000px)': { fontSize: '12px' } }}>
              You
            </Typography>
          </Box>
          <IconButton sx={iconButtonStyling} onClick={() => { exitReply(); }}>
            <CloseIcon sx={iconButtonStyling} />
          </IconButton>
        </Box>
        <TextField
          multiline
          inputProps={{
            style: { fontSize: isLessThan800 ? '10px' : (isLessThan1000 ? '12px' : '14px') },
          }}
          onChange={(event) => { setValue(event.target.value); }}
          autoFocus
          sx={{ '& fieldset': { border: 'none' } }}
        />
      </Box>
      <Box sx={{
        display: 'flex', justifyContent: 'end', my: 1, mx: 5,
      }}
      >
        <Button
          size={isLessThan800 ? 'small' : 'medium'}
          type="submit"
          variant="contained"
          onClick={() => { submitReply(value); }}
          sx={{
            border: 'solid', borderRadius: 4, borderWidth: 0, textTransform: 'none',
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}

EmailReplying.propTypes = {
  submitReply: PropTypes.func.isRequired,
  exitReply: PropTypes.func.isRequired,
};

export default EmailReplying;
