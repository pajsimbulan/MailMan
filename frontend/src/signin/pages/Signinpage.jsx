import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import {
  Button, Divider, OutlinedInput, useMediaQuery, Box, TextField, Typography, Link, Avatar, IconButton, InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ErrorActionAlert from '../../components/ErrorAlert';
import { UserContext } from '../../App';
import { emailRegex } from '../../utils/MailRegex';
import useSignIn from '../../hooks/useSignin';
import LoadingModal from '../../components/LoadingModal';
import { intArrayToBase64String } from '../../utils/DatatoBinary64';

function Signinpage() {
  const isLessThan500 = useMediaQuery('(max-width:500px)');
  const isLessThan800 = useMediaQuery('(max-width:800px)');
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    submitSignIn, userInfo, accessToken, loading, statusCode, errorMessage,
  } = useSignIn();
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

  const submitLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!emailRegex.test(data.get('email'))) {
      openError('Error: Invalid Email Address.  Make sure the email consists of at least 1 alphabet and ends with *@mailman.com*');
      return;
    }
    await submitSignIn(data.get('email'), data.get('password'));
    
  };

  useEffect(() => {
    if (userInfo && statusCode < 400) {
      for (const key in userInfo) {
        if (user.userInfo.hasOwnProperty(key)) {
          user.userInfo[key] = userInfo[key];
        }
      }
      user.accessToken = accessToken;
      user.userInfo.avatar = intArrayToBase64String(user.userInfo.avatar.data);
      navigate('/greet');
    }
    if (statusCode >= 400) {
      openError(errorMessage);
    }
  }, [userInfo, statusCode]);

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      background: 'repeating-radial-gradient(#CCE3FA,#EDF6FF)',
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      {loading && <LoadingModal open={loading} />}
      <ErrorActionAlert
        openAlert={openErrorAlert}
        message={alertMessage}
        closeAlert={() => { setOpenErrorAlert(!openErrorAlert); }}
      />
      <Box
        component="form"
        onSubmit={(event) => { submitLogin(event); }}
        noValidate
        sx={{
          width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginY: 8,
          '@media (max-width: 800px)': { my: 6 },
          '@media (max-width: 500px)': { my: 3 },
        }}
        >
          <Typography sx={{
            fontWeight: 'bold',
            fontSize: '25px',
            color: '#334155',
            '@media (max-width: 800px)': { fontSize: '23px' },
            '@media (max-width: 500px)': { fontSize: '20px' },
          }}
          >
            MAIL
          </Typography>
          <Avatar
            src="postman.jpg"
            sx={{
              width: 150,
              height: 150,
              border: 'solid',
              borderWidth: '3px',
              borderColor: '#E9E9E9',
              background: 'transparent',
              '@media (max-width: 800px)': { width: 135, height: 135 },
              '@media (max-width: 500px)': { width: 120, height: 120 },
            }}
          />
          <Typography sx={{
            fontWeight: 'bold',
            fontSize: '25px',
            color: '#334155',
            '@media (max-width: 800px)': { fontSize: '23px' },
            '@media (max-width: 500px)': { fontSize: '20px' },
          }}
          >
            MAN
          </Typography>
        </Box>
        <Box sx={{
          width: 'auto',
          height: 'auto',
          borderRadius: 3,
          bgcolor: 'white',
          border: 'solid',
          borderWidth: 1,
          borderColor: '#E9E9E9',
          m: 2,
          mb: 10,
        }}
        >
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
              Sign In
            </Typography>
            <Divider sx={{
              marginY: 3,
              '@media (max-width: 800px)': { my: 2.5 },
              '@media (max-width: 500px)': { my: 2 },
            }}
            />
            <Typography sx={{
              color: '#334155',
              '@media (max-width: 800px)': { fontSize: '14px' },
              '@media (max-width: 500px)': { fontSize: '12px' },
            }}
            >
              Email Address
            </Typography>
            <TextField
              sx={{ bgcolor: 'white' }}
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
              Password
            </Typography>
            <OutlinedInput
              sx={{ bgcolor: 'white' }}
              required
              fullWidth
              inputProps={{
                style: { fontSize: getFontSize() },
              }}
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
              {' '}
              Submit
            </Button>
            <Box sx={{
              display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'end',
            }}
            >
              <Link
                sx={{
                  color: '#334155',
                  '@media (max-width: 800px)': { fontSize: '14px' },
                  '@media (max-width: 500px)': { fontSize: '12px' },
                }}
                href="/forgot"
              >
                Forgot Password?
              </Link>
            </Box>
            <Divider sx={{
              marginY: 4,
              '@media (max-width: 800px)': { my: 3 },
              '@media (max-width: 500px)': { my: 2.5 },
            }}
            />
            <Box sx={{
              display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center',
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
                New to Mailman?
              </Typography>
              <Button
                type="button"
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  textTransform: 'none',
                  width: '100%',
                  height: 55,
                  fontWeight: 'bold',
                  '@media (max-width: 800px)': { fontSize: '14px', height: 50 },
                  '@media (max-width: 500px)': { fontSize: '12px', height: 45 },
                }}
                onClick={() => { navigate('/signup'); }}
              >
                Create Account
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Signinpage;



