import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Divider, OutlinedInput } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useContext, useState } from 'react';
import Link from '@mui/material/Link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ErrorActionAlert from '../../components/ErrorAlert';
import { UserContext } from '../../App';
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
function Signinpage() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function openError(message) {
    setOpenErrorAlert(true);
    setAlertMessage(message);
  }

  const submitLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (emailRegex.test(data.get('password'))) {
      openError('Error: Invalid Email Address.  Make sure the email consists of at least 1 alphabet and ends with *@mailman.com*');
      return;
    }
    let statusCode;
    fetch('http://localhost:4000/v0/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.get('email'),
        password: data.get('password'),
      }),
    })
      .then((res) => {
        statusCode = res.status;
        return res.json();
      })
      .then((jsondata) => {
        user.userInfo = jsondata.user;
        user.accessToken = jsondata.accessToken;
        navigate('/main');
      }).catch((error) => {
        console.log(error);
        if (statusCode === 404) {
          openError("Error: Account doesn't exist");
        } else if (statusCode === 400) {
          openError('Error: Invalid Input');
        } else {
          openError('Error: Make sure to fill all the required forms');
          console.log(error.message);
          console.log(statusCode);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        width: '100%', minHeight: '100vh', background: 'repeating-radial-gradient(#CCE3FA,#EDF6FF)', display: 'flex', flexDirection: 'column',
      }}
      >
        <ErrorActionAlert openAlert={openErrorAlert} message={alertMessage} closeAlert={() => { setOpenErrorAlert(!openErrorAlert); }} />
        <Box
          component="form"
          onSubmit={(event) => { submitLogin(event); }}
          noValidate
          sx={{
            width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
        >
          <Box sx={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', marginY: 8,
          }}
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: '25px', color: 'colors.text' }}>MAIL</Typography>
            <Avatar
              src="postman.jpg"
              sx={{
                width: 150, height: 150, border: 'solid', borderWidth: '3px', borderColor: 'colors.bc', background: 'transparent',
              }}
            />
            <Typography sx={{ fontWeight: 'bold', fontSize: '25px', color: 'colors.text' }}>MAN</Typography>
          </Box>
          <Box sx={{
            width: 'auto',
            height: 'auto',
            borderRadius: 3,
            bgcolor: 'white',
            border: 'solid',
            borderWidth: 1,
            borderColor: 'colors.bc',
            m: 2,
            mb: 10,
          }}
          >
            <Box sx={{ marginX: 10, mt: 5, mb: 10 }}>
              <Typography sx={{ fontSize: 30 }}>Sign In</Typography>
              <Divider sx={{ marginY: 3 }} />
              <Typography sx={{ color: 'colors.text' }}>Email Address</Typography>
              <TextField
                sx={{ bgcolor: 'white' }}
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
              />
              <Typography sx={{ mt: 2, color: 'colors.text' }}>Password</Typography>
              <OutlinedInput
                sx={{ bgcolor: 'white' }}
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
                  marginY: 3, marginTop: 6, color: 'white', borderRadius: 1, bgcolor: '#338FEB', textTransform: 'none', width: '100%', height: 55, fontWeight: 'bold',
                }}
                onSubmit={(event) => { submitLogin(event); }}
              >
                {' '}
                Submit
              </Button>
              <Box sx={{
                display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'end',
              }}
              >
                <Link sx={{ color: 'colors.text' }} onClick={() => { navigate('/forgot'); }}>Forgot Password?</Link>
              </Box>
              <Divider sx={{ marginY: 4 }} />
              <Box sx={{
                display: 'flex', flexDirection: 'column', width: '100%', marginTop: 2, justifyContent: 'center',
              }}
              >
                <Typography sx={{
                  marginY: 'auto', color: 'grey', fontWeight: 'light', mb: 1,
                }}
                >
                  {' '}
                  New to Mailman?
                </Typography>
                <Button
                  type="button"
                  variant="outlined"
                  sx={{
                    borderRadius: 1, textTransform: 'none', width: '100%', height: 55, fontWeight: 'bold',
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
    </ThemeProvider>
  );
}

export default Signinpage;
