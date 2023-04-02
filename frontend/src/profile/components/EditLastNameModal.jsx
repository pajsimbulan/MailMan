import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const { useMediaQuery } = require('@mui/material');

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

export default function LastNameModal({
  edit, closeModal, oldValue, setLastName,
}) {
  const islessThan500 = useMediaQuery('(max-width:500px)');
  const isLessThan800 = useMediaQuery('(max-width:800px)');
  const [value, setValue] = React.useState(oldValue);

  React.useEffect(() => { setValue(oldValue); }, [oldValue]);

  const handleClose = () => {
    setValue(oldValue);
    closeModal();
  };

  const submitHandler = () => {
    if (value.length >= 3) {
      setLastName(value);
      closeModal();
    } else {
      alert('Input at least 3 characters');
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={edit}
        onClose={handleClose}
      >
        <Box
          onKeyDown={(event) => {if(event.key === 'Enter') {event.preventDefault();
            submitHandler();}}}
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
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
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
              Edit Last Name
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
              Enter last name and submit
            </Typography>
          </Box>
          <Typography sx={{
            mt: 2,
            mb: 2,
            fontWeight: 'bold',
            color: 'colors.text',
            '@media (max-width: 800px)': { fontSize: '12px' },
            '@media (max-width: 500px)': { fontSize: '10px' },
          }}
          >
            New Last Name
          </Typography>
          <TextField
            defaultValue={value}
            onChange={(event) => { setValue(event.target.value); }}
            type="text"
            name="lastName"
            id="lastName"
            inputProps={{
              style: { fontSize: islessThan500 ? '10px' : (isLessThan800 ? '12px' : '14px') },
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
              onClick={() => { handleClose(); }}
            >
              Cancel
            </Button>
            <Button
              type="button"
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
              onClick={() => { submitHandler(); }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
