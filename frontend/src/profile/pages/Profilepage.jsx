/* global alert */
import * as React from 'react';
import {
  Button, Divider, Avatar, Box, Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useNavigate } from 'react-router';
import {
  useContext, useState, useRef, useEffect,
} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserContext } from '../../App';
import FirstNameRow from '../blocks/FirstNameRow';
import LastNameRow from '../blocks/LastNameRow';
import GenderRow from '../blocks/GenderRow';
import PasswordRow from '../blocks/PasswordRow';
import BirthDateRow from '../blocks/BirthDateRow';
import ProfileBlock from '../blocks/ProfileBlock';
import useUpdateUser from '../../hooks/useUpdateUser';
import LoadingModal from '../../components/LoadingModal';

function Profile() {
  const navigate = useNavigate();
  const { accessToken, userInfo } = useContext(UserContext);
  const [madeChanges, setMadeChanges] = useState(false);
  const password = useRef('');
  const {
    updateUserInfo, loading, statusCode, errorMessage,
  } = useUpdateUser();
  const hasMounted = useRef(false);
  const returnHandler = async () => {
    if (!madeChanges) {
      navigate('/main');
    }
    if (password.current) {
      await updateUserInfo({ ...userInfo, newPassword: password.current }, accessToken);
    } else {
      await updateUserInfo(userInfo, accessToken);
    }
  };

  useEffect(() => {
    if (hasMounted.current) {
      console.log(`statusCode: ${statusCode}`);
      if (statusCode < 400) {
        navigate('/main');
      }
      console.log(errorMessage);
    } else {
      hasMounted.current = true;
    }
  }, [statusCode, errorMessage]);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', background: 'repeating-radial-gradient(#CCE3FA,#EDF6FF)'}}>
      {loading && <LoadingModal open={loading} />}
      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', ml: 3, pt: 2,
      }}
      >
        <Avatar onClick={() => { navigate('/main'); }} src="postman.jpg" sx={{ width: 50, height: 50, background: 'transparent' }} />
        <Typography
          onClick={() => { navigate('/main'); }}
          sx={{
            fontWeight: 'bold', fontSize: '15px', color: '#334155', mx: 2,
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
          borderColor: '#F1F5F9',
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
                  color: 'white',
                  borderRadius: 10,
                  bgcolor: '#338feb',
                  textTransform: 'none',
                  marginBottom: 2,
                  px: 2,
                  fontSize: 12,
                  '@media (max-width: 800px)': { fontSize: '11px', mt: 2 },
                  '@media (max-width: 500px)': { fontSize: '10px' },
                }}
                startIcon={<ArrowBackIcon size="large" sx={{ height: 25, width: 25, '@media (max-width: 800px)': { height: 20, width: 20 } }} />}
                onClick={() => { returnHandler(); }}
              >
                Home
              </Button>
            </Grid2>
            <Grid2 item lg={4} xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Typography sx={{
                  position: 'relative',
                  fontWeight: 'bold',
                  color: '#334155',
                  fontSize: '30px',
                  '@media (max-width: 800px)': { fontSize: '26px' },
                  '@media (max-width: 500px)': { fontSize: '22px' },
                }}
                >
                  Edit Profile
                </Typography>
              </Box>
            </Grid2>
            <Grid2
              item
              xs={12}
              sx={{
                marginBottom: 5,
                '@media (max-width: 800px)': { mb: 3 },
                '@media (max-width: 500px)': { mb: 0 },
              }}
            >
              <Box sx={{
                display: 'flex', justifyContent: 'center', width: '100%', mb: 2,
              }}
              >
                <Typography sx={{
                  fontWeight: 'light',
                  color: '#334155',
                  fontSize: '20px',
                  '@media (max-width: 800px)': { fontSize: '17px' },
                  '@media (max-width: 500px)': { fontSize: '14px' },
                }}
                >
                  {userInfo.email}
                </Typography>
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
              <Typography
                Typography
                sx={{
                  fontWeight: 'bold',
                  color: '#334155',
                  marginY: 'auto',
                  '@media (max-width: 800px)': { fontSize: '13px', mt: 3.5 },
                  '@media (max-width: 500px)': { fontSize: '11px', mt: 2 },
                }}
              >
                First Name
              </Typography>
              <FirstNameRow
                firstName={userInfo.firstName}
                update={(newValue) => {
                  userInfo.firstName = newValue;
                  setMadeChanges(true);
                }}
              />
              <Divider sx={{ marginTop: 1 }} />
              <Typography
                Typography
                sx={{
                  fontWeight: 'bold',
                  color: '#334155',
                  marginTop: 5,
                  '@media (max-width: 800px)': { fontSize: '13px', mt: 3.5 },
                  '@media (max-width: 500px)': { fontSize: '11px', mt: 2 },
                }}
              >
                Last Name
              </Typography>
              <LastNameRow
                lastName={userInfo.lastName}
                update={(newValue) => {
                  userInfo.lastName = newValue;
                  setMadeChanges(true);
                }}
              />
              <Divider sx={{ marginTop: 1 }} />
              <Typography
                Typography
                sx={{
                  fontWeight: 'bold',
                  color: '#334155',
                  marginTop: 5,
                  '@media (max-width: 800px)': { fontSize: '13px', mt: 3.5 },
                  '@media (max-width: 500px)': { fontSize: '11px', mt: 2 },
                }}
              >
                Password
              </Typography>
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
              <Typography
                Typography
                sx={{
                  fontWeight: 'bold',
                  color: '#334155',
                  marginTop: 5,
                  '@media (max-width: 800px)': { fontSize: '13px', mt: 3.5 },
                  '@media (max-width: 500px)': { fontSize: '11px', mt: 2 },
                }}
              >
                Birthdate
              </Typography>
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
  );
}

export default Profile;
