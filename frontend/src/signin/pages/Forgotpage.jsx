import * as React from 'react';
import {
  Button, Divider, useMediaQuery,
  Avatar, OutlinedInput, TextField, Box, Typography, IconButton, InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ErrorActionAlert from '../../components/ErrorAlert';
import PasswordChangedSuccesful from '../components/PasswordChangeSuccessful';
import { emailRegex } from '../../utils/MailRegex';
import useForgotPassword from '../../hooks/useForgotPassword';
import LoadingModal from '../../components/LoadingModal';

function Signuppage() {
  const isLessThan500 = useMediaQuery('(max-width:500px)');
  const isLessThan800 = useMediaQuery('(max-width:800px)');
  const navigate = useNavigate();
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    passwordChanged, loading, statusCode, errorMessage, submitForgotPassword,
  } = useForgotPassword();

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

  const submitForgot = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!emailRegex.test(data.get('email'))) {
      openError('Error: Invalid Email Address.  Make sure the email consists of at least 1 alphabet and ends with *@mailman.com*');
      return;
    }
    if (data.get('password') !== data.get('confirmPassword')) {
      openError("Error: Passwords don't match");
    }
    await submitForgotPassword(data.get('email'), data.get('password'), data.get('firstName'), data.get('secretPhrase'));
  };

  useEffect(() => {
    if (passwordChanged && statusCode < 400) {
      setSuccessful(true);
    }
    if (statusCode >= 400) {
      setSuccessful(false);
      openError(errorMessage);
    }
  }, [passwordChanged, statusCode]);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', background: 'repeating-radial-gradient(#B3BDC9,#FCFDFE)' }}>
      {loading && <LoadingModal open={loading} />}
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
            fontWeight: 'bold', fontSize: '15px', color: '#2E3D54', mx: 2,
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
          onSubmit={(event) => { submitForgot(event); }}
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
          {successful ? <PasswordChangedSuccesful onButtonPress={() => { navigate('/'); }} />
            : (
              <Box sx={{
                marginX: 10,
                mt: 5,
                mb: 10,
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
                  Forgot Password
                </Typography>
                <Divider sx={{
                  marginY: 3,
                  '@media (max-width: 800px)': { my: 2.5 },
                  '@media (max-width: 500px)': { my: 2 },
                }}
                />
                <Typography sx={{
                  mt: 2,
                  color: '#334155',
                  '@media (max-width: 800px)': { fontSize: '14px', mt: 1.5 },
                  '@media (max-width: 500px)': { fontSize: '12px', mt: 1 },
                }}
                >
                  First Name*
                </Typography>
                <TextField
                  fullWidth
                  required
                  id="firstName"
                  name="firstName"
                  type="text"
                  inputProps={{
                    style: { fontSize: getFontSize() },
                  }}
                />
                <Typography sx={{
                  mt: 2,
                  color: '#334155',
                  '@media (max-width: 800px)': { fontSize: '14px', mt: 1.5 },
                  '@media (max-width: 500px)': { fontSize: '12px', mt: 1 },
                }}
                >
                  Secret Phrase*
                </Typography>
                <TextField
                  fullWidth
                  required
                  id="secretPhrase"
                  name="secretPhrase"
                  type="text"
                  inputProps={{
                    style: { fontSize: getFontSize() },
                  }}
                />
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
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  inputProps={{
                    style: { fontSize: getFontSize() },
                  }}
                />
                <Typography sx={{
                  mt: 2,
                  color: '#334155',
                  '@media (max-width: 800px)': { fontSize: '14px', mt: 1.5 },
                  '@media (max-width: 500px)': { fontSize: '12px', mt: 1 },
                }}
                >
                  New Password*
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
                <Typography sx={{
                  mt: 2,
                  color: '#334155',
                  '@media (max-width: 800px)': { fontSize: '14px', mt: 1.5 },
                  '@media (max-width: 500px)': { fontSize: '12px', mt: 1 },
                }}
                >
                  Confirm Password*
                </Typography>
                <OutlinedInput
                  inputProps={{
                    style: { fontSize: getFontSize() },
                  }}
                  required
                  fullWidth
                  name="confirmPassword"
                  id="confirmPassword"
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
                    '@media (max-width: 800px)': {
                      fontSize: '14px', height: 50, my: 2.5, mt: 4.5,
                    },
                    '@media (max-width: 500px)': {
                      fontSize: '12px', height: 45, my: 1.5, mt: 3,
                    },
                  }}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  sx={{
                    borderRadius: 1,
                    textTransform: 'none',
                    height: 55,
                    fontWeight: 'bold',
                    width: '100%',
                    '@media (max-width: 800px)': { fontSize: '14px', height: 50 },
                    '@media (max-width: 500px)': { fontSize: '12px', height: 45 },
                  }}
                  onClick={() => { navigate('/'); }}
                >
                  Back to Sign In
                </Button>
              </Box>
            )}
        </Box>
      </Box>
    </Box>
  );
}

export default Signuppage;
