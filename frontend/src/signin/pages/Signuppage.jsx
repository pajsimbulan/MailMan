import * as React from 'react';
import {
  Button, Divider, useMediaQuery,
  Avatar, OutlinedInput, TextField,
  Box, Typography, IconButton, Link, InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ErrorActionAlert from '../../components/ErrorAlert';
import AccountCreationSuccessful from '../components/AccountCreationSuccessful';
import { emailRegex } from '../../utils/MailRegex';
import useSignUp from '../../hooks/useSignup';
import LoadingModal from '../../components/LoadingModal';

function Signuppage() {
  const isLessThan500 = useMediaQuery('(max-width:500px)');
  const isLessThan800 = useMediaQuery('(max-width:800px)');
  const navigate = useNavigate();
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const {
    submitSignUp, accountCreated, loading, statusCode, errorMessage,
  } = useSignUp();

  const getFontSize = React.useMemo(() => (() => {
    if (isLessThan500) {
      return '10px';
    } if (isLessThan800) {
      return '12px';
    }
    return '14px';
  }), [isLessThan500, isLessThan800]);

  function openError(message) {
    setOpenErrorAlert(true);
    setAlertMessage(message);
  }

  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!emailRegex.test(data.get('email'))) {
      openError('Error: Invalid Email Address.  Make sure the email consists of at least 1 alphabet and ends with *@mailman.com*');
      return;
    }
    await submitSignUp(data.get('email'), data.get('password'), data.get('firstName'), data.get('lastName'));
  };

  useEffect(() => {
    if (accountCreated && statusCode < 400) {
      setSuccessful(true);
    } else if (statusCode >= 400) {
      openError(errorMessage);
    }
  }, [accountCreated, statusCode, errorMessage]);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', background: 'repeating-radial-gradient(#B3BDC9,#FCFDFE)' }}>
      {loading && <LoadingModal open={loading} /> }
      <ErrorActionAlert
        openAlert={openErrorAlert}
        message={alertMessage}
        closeAlert={() => { setOpenErrorAlert(!openErrorAlert); }}
      />
      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1, ml: 3,
      }}
      >
        <Avatar onClick={() => { navigate('/'); }} src="postman.jpg" sx={{ width: 50, height: 50, background: 'transparent' }} />
        <Typography
          onClick={() => { navigate('/'); }}
          sx={{
            fontWeight: 'bold', fontSize: '15px', color: '#334155', mx: 2,
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
          onSubmit={(event) => { submit(event); }}
          sx={{
            marginTop: '3%',
            width: 'auto',
            height: 'auto',
            borderRadius: 3,
            bgcolor: 'white',
            border: 'solid',
            borderWidth: 1,
            borderColor: '#E9E9E9',
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
                        color: '#334155',
                        '@media (max-width: 800px)': { fontSize: '14px' },
                        '@media (max-width: 500px)': { fontSize: '12px' },
                      }}
                      >
                        First Name
                      </Typography>
                      <TextField
                        inputProps={{
                          style: { fontSize: getFontSize() },
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
                        color: '#334155',
                        '@media (max-width: 800px)': { fontSize: '14px' },
                        '@media (max-width: 500px)': { fontSize: '12px' },
                      }}
                      >
                        Last Name
                      </Typography>
                      <TextField
                        inputProps={{
                          style: { fontSize: getFontSize() },
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
                  color: '#334155',
                  '@media (max-width: 800px)': { fontSize: '14px', mt: 1.5 },
                  '@media (max-width: 500px)': { fontSize: '12px', mt: 1 },
                }}
                >
                  Email Address*
                </Typography>
                <TextField
                  inputProps={{
                    style: { fontSize: getFontSize() },
                  }}
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                />
                <Typography sx={{
                  mt: 2,
                  color: '#334155',
                  '@media (max-width: 800px)': { fontSize: '14px', mt: 1.5 },
                  '@media (max-width: 500px)': { fontSize: '12px', mt: 1 },
                }}
                >
                  Password*
                </Typography>
                <OutlinedInput
                  inputProps={{
                    style: { fontSize: getFontSize() },
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
                    href="/"
                    sx={{
                      color: '#334155',
                      fontSize: 18,
                      ml: 1,
                      '@media (max-width: 800px)': { fontSize: '16px', mb: 1 },
                      '@media (max-width: 500px)': { fontSize: '15px' },
                    }}
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
  );
}

export default Signuppage;
