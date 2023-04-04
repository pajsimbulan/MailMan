import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useMediaQuery } from '@mui/material';

export default function PasswordModal({ edit, closeModal, updatePassword }) {
  const isLessThan500 = useMediaQuery('(max-width:500px)');
  const isLessThan800 = useMediaQuery('(max-width:800px)');
  const [value, setValue] = React.useState('');
  const getFontSize = React.useMemo(() => {
    return ( ()=> {
    if (isLessThan500) {
      return '10px';
    } if (isLessThan800) {
      return '12px';
    }
    return '14px';
})}, [isLessThan500, isLessThan800]);

  const handleClose = () => {
    closeModal();
  };

  const submitHandler = () => {
    updatePassword(value);
    closeModal();
  };
  return (
    <Modal
      open={edit}
      onClose={handleClose}
    >
      <Box
        onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); submitHandler(); } }}
        onSubmit={() => { submitHandler(); }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 10,
          bgcolor: 'background.paper',
          border: 'solid',
          borderWidth: '16px',
          borderColor: '#deedfd',
          p: 4,
        }}
      >
        <Box component="form" sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Typography sx={{
            fontWeight: 'bold',
            color: '#334155',
            fontSize: '25px',
            mx: 10,
            textAlign: 'center',
            '@media (max-width: 800px)': { fontSize: '20px' },
            '@media (max-width: 500px)': { fontSize: '16px' },
          }}
          >
            Change Password
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex', justifyContent: 'center', width: '100%', marginY: 2,
        }}
        >
          <Typography sx={{
            fontWeight: 'light',
            color: '#334155',
            fontSize: '15px',
            '@media (max-width: 800px)': { fontSize: '12px' },
            '@media (max-width: 500px)': { fontSize: '10px' },
          }}
          >
            Enter a new password
          </Typography>
        </Box>
        <Typography sx={{
          mt: 2,
          fontWeight: 'bold',
          color: '#334155',
          '@media (max-width: 800px)': { fontSize: '12px' },
          '@media (max-width: 500px)': { fontSize: '10px' },
        }}
        >
          New Password
        </Typography>
        <TextField
          margin="normal"
          name="password"
          type="password"
          id="password"
          onChange={(event) => { setValue(event.target.value); }}
          inputProps={{
            style: { fontSize: getFontSize },
          }}
        />
        <Box sx={{
          display: 'flex', flexDirection: 'row', flexGrow: 1, justifyContent: 'end', marginTop: 5,
        }}
        >
          <Button
            type="button"
            sx={{
              marginTop: 3,
              color: 'black',
              borderRadius: 1,
              bgcolor: 'whitesmoke',
              textTransform: 'none',
              width: '20%',
              height: '20%',
              marginY: 'auto',
              marginRight: 4,
              '@media (max-width: 800px)': { fontSize: '12px' },
              '@media (max-width: 500px)': { fontSize: '10px' },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            sx={{
              marginTop: 3,
              color: 'white',
              borderRadius: 1,
              bgcolor: 'colors.button',
              textTransform: 'none',
              width: '20%',
              height: '20%',
              marginY: 'auto',
              '@media (max-width: 800px)': { fontSize: '12px' },
              '@media (max-width: 500px)': { fontSize: '10px' },
            }}
            onClick={() => { submitHandler(); }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
