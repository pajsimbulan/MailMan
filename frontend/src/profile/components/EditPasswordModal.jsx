import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const theme = createTheme({
  palette: {
    colors: {
      bg_default: '#FFFFFF',
      color2: '#F1F5F9',
      text: '#334155',
      button: '#0F172A',
    },
  },
});

export default function PasswordModal({ edit, closeModal, updatePassword }) {
  const [value, setValue] = React.useState('');

  const handleClose = () => {
    closeModal();
  };

  const submitHandler = () => {
    updatePassword(value);
    closeModal();
  };
  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={edit}
        onClose={handleClose}
      >
        <Box
          component="form"
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
              color: 'colors.text',
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
              color: 'colors.text',
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
            color: 'colors.text',
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
              style: { fontSize: useMediaQuery('(max-width:500)') ? '10px' : (useMediaQuery('(max-width:800px)') ? '12px' : '14px') },
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
                bgcolor: 'grey',
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
              {' '}
              Cancel
            </Button>
            <Button
              type="submit"
              sx={{
                marginTop: 3,
                bgcolor: 'grey',
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
              onSubmit={() => { submitHandler(); }}
            >
              {' '}
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
