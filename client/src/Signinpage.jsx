import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router';
import { useContext } from 'react';
import { UserContext } from './App';
import { border, borders } from '@mui/system';

const theme = createTheme({
  palette: {
    colors: {
      bg_default:'#FFFFFF',
      color2:'#F1F5F9',
      text: '#334155',
      button: '#0F172A'
    }
  },
});
export default function SignIn() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const sendCredentials = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch('http://localhost:4000/v0/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "email" :   data.get('email'),
      "password" : data.get('password'),
    }),
  })
  .then((res) => {
    return res.json();})
  .then((jsondata) => {
    user.accessToken = jsondata.accessToken;
    user.userInfo = jsondata.email;
    navigate('/main'); 
  }).catch((error) => {console.log(error.message)}); 
  };



  return (
    <ThemeProvider theme={theme}>
      <Box  sx = {{width: "100%", height: '100vh',display: 'flex', flexDirection:'column', alignItems:'center'}}>
        <img src='postman.jpg'  width="500" height="500" loading="lazy"/>
        
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '30%',
            height: '40%',
            boxShadow: '1',
            borderRadius: 3,
            border: 'solid',
            borderWidth:'2px',
            borderColor: 'whitesmoke',
          }} component="form" onSubmit={(event) => {sendCredentials(event)}} noValidate>
            <Grid2 container sx={{backgroundColor:'colors.color2',height:60,display:'flex start',borderRadius: 2}}>
              <Grid2 item xs={2} sx={{marginLeft:2, marginY:'auto'}}>
                <Button   
                type="submit"
                sx={{color:'colors.text', borderRadius:1, bgcolor:'white' ,textTransform: 'none', fontWeight:'bold'}}
                >
                Sign In
              </Button> </Grid2>
              <Grid2 item xs={2} sx={{marginY:'auto'}}><Button
                type="submit"
                sx={{color:'colors.text', borderRadius:1, textTransform: 'none', fontWeight:'bold'}}
              >
                Sign Up
              </Button> </Grid2>
              <Grid2 item xs={2} sx={{marginY:'auto'}}><Button
                type="submit"
                sx={{color:'colors.text', borderRadius:1, textTransform: 'none', fontWeight:'bold'}}
              >
                Forgot Password
              </Button> </Grid2>
            </Grid2>
            <Box sx={{marginX:5, mt:5}}>
              <Typography sx={{fontWeight:'bold', color:'colors.text'}}>Email Address</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{borderColor:'red'}}
              />
              <Typography sx={{mt:2, fontWeight:'bold', color:'colors.text'}}>Password</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%' }}> Submit </Button>
            </Box>
            
          </Box>

        
          
      </Box>
    </ThemeProvider>
  );
}