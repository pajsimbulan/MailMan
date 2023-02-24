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
import Link from '@mui/material/Link';
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
  const openSuccessAlert = useRef(false);
  const openErrorAlert = useRef(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const submitSignUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      firstname: data.get('firstName'),
      lastname: data.get('lastName'),
    });
    let statusCode;
    fetch('http://localhost:4000/v0/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'email': data.get('email'),
      'password': data.get('password'),
      'firstName': data.get('firstName'),
      'lastName': data.get('lastName'),
    }),
    })
    .then((res) => {
      statusCode = res.status;
      openSucess("Account Created");
      navigate('/');
      return res.json();
  }).catch((error) => {
    if(statusCode === 403) {
      openError("Error: Email already exists");
    }
    else {
      openError("Error: Make sure to fill up the form correctly.  Forms with '  *  ' are required");
    }
  }); 
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{width: "100%", minHeight: '100vh',background:'repeating-radial-gradient(#B3BDC9,#FCFDFE)'}}>
        <Box sx={{display: 'flex', flexDirection:'row',  alignItems:'center', mt:1,ml:3}}>
            <Avatar onClick={() => {navigate('/')}} src='postman.jpg' sx={{width:70, height:70, border:'solid', borderWidth:'3px', borderColor: 'colors.bc',background:'transparent'}}/>
            <Typography onClick={() => {navigate('/')}} sx={{fontWeight:'bold', fontSize:'25px', color:'colors.text', mx:2}}>MAILMAN</Typography>
        </Box>
        <Box sx = {{width: "100%", height: '100vh',display: 'flex', flexDirection:'column', alignItems:'center'}}>
            <Box 
            component="form"
            onSubmit={(event) => {submitSignUp(event);}}
            sx={{
                width: '25%',
                height: 'auto',
                borderRadius: 3,
                bgcolor:'white',
                border:'solid',
                borderWidth:1,
                borderColor:'colors.bc',
                }}>
                <Box sx={{marginX:10, mt:5, }} >
                <Typography sx={{fontSize:30}}>Create Account</Typography>
                <Divider sx={{marginY:3}}/>
                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:2}}>
                    <Box sx={{marginY:'auto'}}>
                        <Box>
                            <Typography sx={{color:'colors.text'}}>First Name</Typography>
                            <TextField
                                sx={{width:180}}
                                required
                                id="firstName"
                                name="firstName"
                                type="text"
                            /> 
                        </Box>
                    </Box>
                    <Box sx={{marginY:'auto', display:'flex', justifyContent:'end'}}>
                        <Box>
                            <Typography sx={{color:'colors.text'}}>Last Name</Typography>
                            <TextField
                            sx={{width:180}}
                            name="lastName"
                            type="text"
                            id="lastName"
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
                <Typography sx={{mt:2, color:'colors.text'}}>Password*</Typography>
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
                <Button 
                    type="submit" 
                    sx={{marginY:3, marginTop:6, color:'white', borderRadius:1, bgcolor:'#338FEB', textTransform: 'none', width:'100%', height:55,fontWeight:'bold'}} 
                    onSubmit={(event) => {submitSignUp(event);}}> 
                    Create Account 
                </Button>
                <Divider sx={{marginY:4}}/>
                <Box sx={{display:'flex', flexDirection:'row', width:'100%', marginTop:2, marginBottom:10, justifyContent:'center'}}>
                  <Typography sx={{marginY:'auto',color:'grey', fontWeight: 'light', mb:1}}> Already have an Account? </Typography>
                  <Link sx={{color:'colors.text', fontSize:18, ml:1}} onClick={() => {navigate('/')}}> Sign In</Link>
                </Box>
                </Box>
            </Box>
        </Box>
      </Box>
      <ErrorActionAlert openAlert={openErrorAlert.current} message={alertMessage} closeAlert={() => {openErrorAlert.current = (!openErrorAlert.current)}}/>
      <SuccessActionAlert openAlert={openSuccessAlert.current} message={alertMessage} closeAlert={() => {openSuccessAlert.current = (!openSuccessAlert.current)}}/>
    </ThemeProvider>
  );
}

export default Signuppage;
