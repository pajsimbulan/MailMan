import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Divider } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useContext, useState, useRef } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserContext } from '../../App';
import SuccessActionAlert from '../../components/SuccessAlert';
import ErrorActionAlert from '../../components/ErrorAlert';
import FirstNameRow from '../blocks/FirstNameRow';
import LastNameRow from '../blocks/LastNameRow';
import GenderRow from '../blocks/GenderRow';
import PasswordRow from '../blocks/PasswordRow';
import BirthDateRow from '../blocks/BirthDateRow';
import ProfileBlock from '../blocks/ProfileBlock';
import useUpdateUser from '../../hooks/useUpdateUser';

const theme = createTheme({
  palette: {
    colors: {
      bg: '#ECEDF0',
      color2: '#F1F5F9',
      text: '#334155',
      button: '#338FEB',
    },
  },
});

function Profile() {
  const navigate = useNavigate();
  const { accessToken, userInfo } = useContext(UserContext);
  const openSuccessAlert = useRef(false);
  const openErrorAlert = useRef(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [madeChanges, setMadeChanges] = useState(false);
  const password = useRef('');
  const { updateUserInfo, updatePassword } = useUpdateUser({ accessToken, userInfo });

  function openSucess(message) {
    openSuccessAlert.current = true;
    openErrorAlert.current = false;
    setAlertMessage(message);
  }
  function openError(message) {
    openSuccessAlert.current = false;
    openErrorAlert.current = true;
    setAlertMessage(message);
  }

  async function returnHandler() {
    if (madeChanges) {
      let statusCode;
      try {
        statusCode = await updateUserInfo(userInfo);
        console.log(statusCode);
      } catch (error) {
        console.log(statusCode);
        console.error(error);
      }
    }
    if (password.current) {
      let statusCode;
      try {
        statusCode = await updatePassword(userInfo.firstName, userInfo.email, password.current);
        console.log(statusCode);
      } catch (error) {
        console.log(statusCode);
        console.error(error);
      }
    }
    navigate('/main');
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', height: '100%', background: 'repeating-radial-gradient(#CCE3FA,#EDF6FF)' }}>
        <ErrorActionAlert openAlert={openErrorAlert.current} message={alertMessage} closeAlert={() => { openErrorAlert.current = (!openErrorAlert.current); }} />
        <SuccessActionAlert openAlert={openSuccessAlert.current} message={alertMessage} closeAlert={() => { openSuccessAlert.current = (!openSuccessAlert.current); }} />
        <Box sx={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1, ml: 3,
        }}
        >
          <Avatar onClick={() => { navigate('/main'); }} src="postman.jpg" sx={{ width: 50, height: 50, background: 'transparent' }} />
          <Typography
            onClick={() => { navigate('/main'); }}
            sx={{
              fontWeight: 'bold', fontSize: '15px', color: 'colors.text', mx: 2,
            }}
          >
            Mailman
          </Typography>
        </Box>
        <Box sx={{
          width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2,
        }}
        >
          <Box sx={{
            marginTop: '1%',
            display: 'flex',
            flexDirection: 'column',

            borderRadius: 3,
            border: 'solid',
            borderWidth: '1px',
            borderColor: 'colors.color2',
            bgcolor: 'white',
            mx: 2,
            mb: 10,
          }}
          >
            <Grid2 container sx={{ marginX: 5, mt: 5, mb: '10%' }}>
              <Grid2 item xs={12} lg={4}>
                <Button
                  type="button"
                  sx={{
                    color: 'white', borderRadius: 10, bgcolor: 'colors.button', textTransform: 'none', marginBottom: 2, px: 2, fontSize: 12,
                  }}
                  startIcon={<ArrowBackIcon size="large" />}
                  onClick={() => { returnHandler(); }}
                >
                  Home
                </Button>
              </Grid2>
              <Grid2 item lg={4} xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <Typography sx={{
                    position: 'relative', fontWeight: 'bold', color: 'colors.text', fontSize: 30,
                  }}
                  >
                    Edit Profile
                  </Typography>
                </Box>
              </Grid2>
              <Grid2 item xs={12} sx={{ marginBottom: 5 }}>
                <Box sx={{
                  display: 'flex', justifyContent: 'center', width: '100%', mb: 2,
                }}
                >
                  <Typography sx={{ fontWeight: 'light', color: 'colors.text', fontSize: 20 }}>{userInfo.email}</Typography>
                </Box>
              </Grid2>
              <Grid2 lg={4} xs={12} item sx={{ height: 'full' }}>
                <ProfileBlock
                  avatar={userInfo.avatar}
                  update={(newAvatar) => {
                    userInfo.avatar = newAvatar;
                    setMadeChanges(true);
                  }}
                />
              </Grid2>
              <Grid2 lg={8} xs={12} item>
                <Typography Typography sx={{ fontWeight: 'bold', color: 'colors.text', marginY: 'auto' }}>First Name</Typography>
                <FirstNameRow
                  firstName={userInfo.firstName}
                  update={(newValue) => {
                    userInfo.firstName = newValue;
                    setMadeChanges(true);
                  }}
                />
                <Divider sx={{ marginTop: 1 }} />
                <Typography Typography sx={{ fontWeight: 'bold', color: 'colors.text', marginTop: 5 }}>Last Name</Typography>
                <LastNameRow
                  lastName={userInfo.lastName}
                  update={(newValue) => {
                    userInfo.lastName = newValue;
                    setMadeChanges(true);
                  }}
                />
                <Divider sx={{ marginTop: 1 }} />
                <Typography Typography sx={{ fontWeight: 'bold', color: 'colors.text', marginTop: 5 }}>Password</Typography>
                <PasswordRow update={(newValue) => { password.current = newValue; }} />
                <Divider sx={{ marginTop: 1 }} />
                <GenderRow
                  gender={userInfo.gender}
                  update={(newValue) => {
                    userInfo.gender = newValue;
                    setMadeChanges(true);
                  }}
                />
                <Divider sx={{ marginTop: 1 }} />
                <Typography Typography sx={{ fontWeight: 'bold', color: 'colors.text', marginTop: 5 }}>Birthdate</Typography>
                <BirthDateRow
                  birthDate={userInfo.birthDate}
                  update={(newValue) => {
                    userInfo.birthDate = newValue;
                    setMadeChanges(true);
                  }}
                />
                <Divider sx={{ marginTop: 1 }} />
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Profile;
