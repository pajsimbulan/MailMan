import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router';
import { useContext, useState, useRef } from 'react';
import { UserContext } from '../../App';
import SuccessActionAlert from '../../components/SuccessAlert';
import ErrorActionAlert from '../../components/ErrorAlert';
import Link from '@mui/material/Link';

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
function Forgotpage() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [renderSignIn, setRenderSignIn] = useState(true);
  const openSuccessAlert = useRef(false);
  const openErrorAlert = useRef(false);
  const [alertMessage, setAlertMessage] = useState("");
  
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

  const submitLogin = (event) => {
    console.log('got here');
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let statusCode;
    fetch('http://localhost:4000/v0/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "email" :   data.get('email'),
      "password" : data.get('password'),
    }),
  })
  .then((res) => {
    statusCode = res.status;
    return res.json();})
  .then((jsondata) => {
    user.userInfo = jsondata.user;
    user.accessToken = jsondata.accessToken;
    navigate('/main'); 
  }).catch((error) => {
    console.log(error);
    openError("Error: Invalid Input");
  }); 
  };

  return (
    <ThemeProvider theme={theme}>
      <ErrorActionAlert openAlert={openErrorAlert.current} message={alertMessage} closeAlert={() => {openErrorAlert.current = (!openErrorAlert.current)}}/>
      <SuccessActionAlert openAlert={openSuccessAlert.current} message={alertMessage} closeAlert={() => {openSuccessAlert.current = (!openSuccessAlert.current)}}/>
      <Box sx = {{width: "100%", height: '100vh',display: 'flex',flexDirection:'column', alignItems:'center', background:'repeating-radial-gradient(#EBF5FF,#FCFDFE)'}}>
        <Box component="form" onSubmit={(event) => {submitLogin(event);}} 
          noValidate sx = {{width: "100%", height: '100vh',display: 'flex', flexDirection:'column', alignItems:'center'}}>
          <Box sx={{display: 'flex', flexDirection:'row',  alignItems:'center', marginY:8, }}>
          <Typography sx={{fontWeight:'bold', fontSize:'30px', color:'colors.text'}}>MAIL</Typography>
          <Avatar src='postman.jpg' sx={{width:200, height:200, border:'solid', borderWidth:'3px', borderColor: 'colors.bc',background:'transparent'}}/>
          <Typography sx={{fontWeight:'bold', fontSize:'30px', color:'colors.text'}}>MAN</Typography>
          </Box>
          <Box sx={{
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
                <Typography sx={{color:'colors.text'}}>Email Address</Typography>
                <TextField
                  sx={{bgcolor:'white'}}
                 
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                />
                <Typography sx={{mt:2, color:'colors.text'}}>Password</Typography>
                <TextField
                  sx={{bgcolor:'white'}}
                 
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button type="submit" sx={{marginY:3, marginTop:6, color:'white', borderRadius:1, bgcolor:'#338FEB', textTransform: 'none', width:'100%', height:55,fontWeight:'bold'}} onSubmit={(event) => {submitLogin(event);}}> Submit </Button>
                <Box sx={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'end'}}>
                  <Link sx={{color:'colors.text'}}>Forgot Password?</Link>
                </Box>
                <Divider sx={{marginY:4}}/>
                <Box sx={{display:'flex', flexDirection:'column', width:'100%', marginTop:2, marginBottom:10, justifyContent:'center'}}>
                  <Typography sx={{marginY:'auto',color:'colors.text', fontWeight: 'light', mb:1}}> New to Mail Man? </Typography>
                  <Button type="button" variant="outlined" sx={{borderRadius:1, textTransform: 'none', width:"100%", height:55, fontWeight:'bold'}} >Sign Up</Button>
                </Box>
              </Box>
            </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Forgotpage;
