import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Divider, useMediaQuery } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Link from '@mui/material/Link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ErrorActionAlert from '../../components/ErrorAlert';
import AccountCreationSuccessful from '../components/AccountCreationSuccessful';
import { emailRegex } from '../../utils/MailRegex';

const theme = createTheme({
  palette: {
    colors: {
      bg_default: '#FFFFFF',
      bg_2: '#CFCCCC',
      color2: '#F1F5F9',
      text: '#2E3D54',
      button: '#0F172A',
      bc: '#E9E9E9',
    },
  },
});

function Signuppage() {
  const isLessThan500 = useMediaQuery('(max-width:500px)');
  const isLessThan800 = useMediaQuery('(max-width:800px)');
  const navigate = useNavigate();
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successful, setSuccessful] = useState(false);

  function openError(message) {
    setOpenErrorAlert(true);
    setAlertMessage(message);
  }

  const submitSignUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!emailRegex.test(data.get('email'))) {
      openError('Error: Invalid Email Address.  Make sure the email consists of at least 1 alphabet and ends with *@mailman.com*');
      return;
    }
    let statusCode;
    fetch('http://localhost:4000/v0/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.get('email'),
        password: data.get('password'),
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
      }),
    })
      .then((res) => {
        statusCode = res.status;
        if ((statusCode == 403) || (statusCode == 404)) {
          throw new Error(statusCode);
        }
        setSuccessful(true);
      })
      .catch((error) => {
        if (statusCode === 403) {
          console.log(error);
          openError('Error: Account already exists');
        } else {
          openError("Error: Make sure to fill up the form correctly.  Forms with '  *  ' are required");
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', minHeight: '100vh', background: 'repeating-radial-gradient(#B3BDC9,#FCFDFE)' }}>
        <ErrorActionAlert openAlert={openErrorAlert} message={alertMessage} closeAlert={() => { setOpenErrorAlert(!openErrorAlert); }} />
        <Box sx={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1, ml: 3,
        }}
        >
          <Avatar onClick={() => { navigate('/'); }} src="postman.jpg" sx={{ width: 50, height: 50, background: 'transparent' }} />
          <Typography
            onClick={() => { navigate('/'); }}
            sx={{
              fontWeight: 'bold', fontSize: '15px', color: 'colors.text', mx: 2,
            }}
          >
            Mailman
          </Typography>
        </Box>
        <Box sx={{
          width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
        >
          <Box
            component="form"
            onSubmit={(event) => { submitSignUp(event); }}
            sx={{
              marginTop: '3%',
              width: 'auto',
              height: 'auto',
              borderRadius: 3,
              bgcolor: 'white',
              border: 'solid',
              borderWidth: 1,
              borderColor: 'colors.bc',
              mx: 2,
              mb: 10,
            }}
          >
            {successful ? <AccountCreationSuccessful onButtonPress={() => { navigate('/'); }} />
              : (
                <Box sx={{
                  marginX: 10,
                  mt: 5,
                  '@media (max-width: 800px)': { mx: 8 },
                  '@media (max-width: 500px)': { mx: 6 },
                }}
                >
                  <Typography sx={{
                    fontSize: '30px',
                    '@media (max-width: 800px)': { fontSize: '26px' },
                    '@media (max-width: 500px)': { fontSize: '22px' },
                  }}
                  >
                    Create Account
                  </Typography>
                  <Divider sx={{
                    marginY: 3,
                    '@media (max-width: 800px)': { my: 2.5 },
                    '@media (max-width: 500px)': { my: 2 },
                  }}
                  />
                  <Box sx={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2, flexWrap: 'wrap',
                  }}
                  >
                    <Box sx={{ marginY: 'auto', mt: 1 }}>
                      <Box>
                        <Typography sx={{
                          color: 'colors.text',
                          '@media (max-width: 800px)': { fontSize: '14px' },
                          '@media (max-width: 500px)': { fontSize: '12px' },
                        }}
                        >
                          First Name
                        </Typography>
                        <TextField
                          inputProps={{
                            style: { fontSize: isLessThan500 ? '10px' : (isLessThan800 ? '12px' : '14px') },
                          }}
                          sx={{ width: 180 }}
                          required
                          id="firstName"
                          name="firstName"
                          type="text"
                        />
                      </Box>
                    </Box>
                    <Box sx={{
                      marginY: 'auto', display: 'flex', justifyContent: 'end', mt: 1,
                    }}
                    >
                      <Box>
                        <Typography sx={{
                          color: 'colors.text',
                          '@media (max-width: 800px)': { fontSize: '14px' },
                          '@media (max-width: 500px)': { fontSize: '12px' },
                        }}
                        >
                          Last Name
                        </Typography>
                        <TextField
                          inputProps={{
                            style: { fontSize: isLessThan500 ? '10px' : (isLessThan800 ? '12px' : '14px') },
                          }}
                          sx={{ width: 180 }}
                          name="lastName"
                          type="text"
                          id="lastName"
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Typography sx={{
                    mt: 2,
                    color: 'colors.text',
                    '@media (max-width: 800px)': { fontSize: '14px', mt: 1.5 },
                    '@media (max-width: 500px)': { fontSize: '12px', mt: 1 },
                  }}
                  >
                    Email Address*
                  </Typography>
                  <TextField
                    inputProps={{
                      style: { fontSize: isLessThan500 ? '10px' : (isLessThan800 ? '12px' : '14px') },
                    }}
                    required
                    fullWidth
                    id="email"
                    name="email"
                    autoComplete="email"
                  />
                  <Typography sx={{
                    mt: 2,
                    color: 'colors.text',
                    '@media (max-width: 800px)': { fontSize: '14px', mt: 1.5 },
                    '@media (max-width: 500px)': { fontSize: '12px', mt: 1 },
                  }}
                  >
                    Password*
                  </Typography>
                  <OutlinedInput
                    inputProps={{
                      style: { fontSize: isLessThan500 ? '10px' : (isLessThan800 ? '12px' : '14px') },
                    }}
                    required
                    fullWidth
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((show) => !show)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                  )}
                  />
                  <Button
                    type="submit"
                    sx={{
                      marginY: 3,
                      marginTop: 6,
                      color: 'white',
                      borderRadius: 1,
                      bgcolor: '#338FEB',
                      textTransform: 'none',
                      width: '100%',
                      height: 55,
                      fontWeight: 'bold',
                      '@media (max-width: 800px)': { fontSize: '14px', my: 2.5, height: 50 },
                      '@media (max-width: 500px)': { fontSize: '12px', my: 2, height: 45 },
                    }}
                    onSubmit={(event) => { submitSignUp(event); }}
                  >
                    Create Account
                  </Button>
                  <Divider sx={{
                    marginY: 4,
                    '@media (max-width: 800px)': { my: 3 },
                    '@media (max-width: 500px)': { my: 2.5 },
                  }}
                  />
                  <Box sx={{
                    display: 'flex', flexDirection: 'row', width: '100%', marginBottom: 10, justifyContent: 'center',

                  }}
                  >
                    <Typography sx={{
                      marginY: 'auto',
                      color: 'grey',
                      fontWeight: 'light',
                      mb: 1,
                      '@media (max-width: 800px)': { fontSize: '14px' },
                      '@media (max-width: 500px)': { fontSize: '12px' },
                    }}
                    >
                      {' '}
                      Already have an Account?
                    </Typography>
                    <Link
                      sx={{
                        color: 'colors.text',
                        fontSize: 18,
                        ml: 1,
                        '@media (max-width: 800px)': { fontSize: '16px', mb: 1 },
                        '@media (max-width: 500px)': { fontSize: '15px' },
                      }}
                      onClick={() => { navigate('/'); }}
                    >
                      {' '}
                      Sign In
                    </Link>
                  </Box>
                </Box>
              ) }
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Signuppage;
