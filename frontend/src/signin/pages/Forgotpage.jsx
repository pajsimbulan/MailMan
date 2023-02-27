import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Divider } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router';
import { useState, useRef } from 'react';
import SuccessActionAlert from '../../components/SuccessAlert';
import ErrorActionAlert from '../../components/ErrorAlert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const theme = createTheme({
  palette: {
    colors: {
      bg_default:'#FFFFFF',
      bg_2:'#CFCCCC',
      color2:'#F1F5F9',
      text: '#2E3D54',
      button: '#0F172A',
      bc:'#E9E9E9',
    }
  },
});
function Signuppage() {
  const navigate = useNavigate();
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function openSucess(message) {
    setOpenSuccessAlert(true);
    setOpenErrorAlert(false);
    setAlertMessage(message);
  }
  function openError(message) {
    setOpenSuccessAlert(false);
    setOpenErrorAlert(true);
    setAlertMessage(message);
  }

  const submitForgot = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('password') !== data.get('confirmPassword')) {
      console.log('here');
      openError("Error: Passwords don't match");
      return;
    }
    let statusCode;
    fetch('http://localhost:4000/v0/changepassword', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "firstName" :   data.get('firstName'),
      "email" : data.get('email'),
      "newPassword" : data.get('password'),
    }),
  }).then((res) => {
    statusCode = res.status;
    openSucess("Password Changed");
    navigate('/');
    })
  .catch((error) => {
    console.log(error);
    if(statusCode === 404) {
      openError("Error: Account doesn't exist");
    }
    else {
      openError("Error: Invalid Input.  Make sure to fill up the form correctly.  Forms with '  *  ' are required");
    }
  }); 
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{width: "100%", minHeight: '100vh',background:'repeating-radial-gradient(#B3BDC9,#FCFDFE)', m:-1}}>
        <ErrorActionAlert openAlert={openErrorAlert} message={alertMessage} closeAlert={() => {setOpenErrorAlert(!openErrorAlert)}}/>
        <SuccessActionAlert openAlert={openSuccessAlert} message={alertMessage} closeAlert={() => {setOpenSuccessAlert(!openSuccessAlert);}}/>
        <Box sx={{display: 'flex', flexDirection:'row',  alignItems:'center', mt:1,ml:3}}>
              <Avatar onClick={() => {navigate('/main')}} src='postman.jpg' sx={{width:50, height:50, background:'transparent'}}/>
              <Typography onClick={() => {navigate('/main')}} sx={{fontWeight:'bold', fontSize:'15px', color:'colors.text', mx:2}}>Mailman</Typography>
        </Box>
        <Box sx = {{width: "100%", height: '100vh',display: 'flex', flexDirection:'column', alignItems:'center'}}>
            <Box 
            component="form"
            onSubmit={(event) => {submitForgot(event);}}
            sx={{
                marginTop:'1%',
                width: '25%',
                height: 'auto',
                borderRadius: 3,
                bgcolor:'white',
                border:'solid',
                borderWidth:1,
                borderColor:'colors.bc',
                }}>
                <Box sx={{marginX:10, mt:5, }} >
                <Typography sx={{fontSize:30}}>Forgot Password</Typography>
                <Divider sx={{marginY:3}}/>
                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:2}}>
                    <Box sx={{marginY:'auto'}}>
                        <Box>
                            <Typography sx={{color:'colors.text'}}>First Name*</Typography>
                            <TextField
                                sx={{width:180}}
                                required
                                id="firstName"
                                name="firstName"
                                type="text"
                            /> 
                        </Box>
                    </Box>
                   
                </Box>      
                <Typography sx={{color:'colors.text'}}>Email Address*</Typography>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                />
                <Typography sx={{mt:2, color:'colors.text'}}>New Password*</Typography>
                <OutlinedInput
                  required
                  fullWidth
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                  }
                />
                <Typography sx={{mt:2, color:'colors.text'}}>Confirm Password*</Typography>
                <OutlinedInput
                  required
                  fullWidth
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                  }
                />
                <Button 
                    type="submit" 
                    sx={{marginY:3, marginTop:6, color:'white', borderRadius:1, bgcolor:'#338FEB', textTransform: 'none', width:'100%', height:55,fontWeight:'bold'}} 
                    onSubmit={(event) => {submitForgot(event);}}> 
                    Submit
                </Button>
                <Button 
                  type="button" 
                  variant="outlined" 
                  sx={{borderRadius:1, textTransform: 'none', width:"100%", height:55, fontWeight:'bold', mb:5}} 
                  onClick={() => {navigate('/')}}>
                    Back to Sign In
                  </Button>
                </Box>
            </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Signuppage;
