import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Divider } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router';
import { useContext, useState, useRef } from 'react';
import { UserContext } from './App';
import SuccessActionAlert from './components/SuccessAlert';
import ErrorActionAlert from './components/ErrorAlert';
import GenderRadioButtons from './components/GenderRadioButton';

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
function Profile() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
 
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

  const submitForgot = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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
    return res.json();})
  .then((jsondata) => {
    alert(`password for the account ${jsondata.email} has been succesfully changed`);

    openSucess("Password Changed");
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
      <ErrorActionAlert openAlert={openErrorAlert.current} message={alertMessage} closeAlert={() => {openErrorAlert.current = (!openErrorAlert.current)}}/>
    <SuccessActionAlert openAlert={openSuccessAlert.current} message={alertMessage} closeAlert={() => {openSuccessAlert.current = (!openSuccessAlert.current)}}/>
      <Box noValidate sx = {{width: "100%", height: '100vh',display: 'flex', justifyContent:'center'}}>
        <Box sx={{
            marginTop:'5%',
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            height: '80%',
            boxShadow: '3',
            borderRadius: 3,
            border: 'solid',
            borderWidth:'2px',
            borderColor: 'whitesmoke',
          }}>
            
            
           <Grid2 container sx={{marginX:5, mt:5}} >
            <Grid2 item xs={12} sx={{marginBottom:5}}> 
                <Box sx={{display:'flex',direction:'column',justifyContent:'center',alignItems:'center', width:'100%'}}>
                    <Typography sx={{fontWeight:'bold', color:'colors.text', fontSize:30}}>Edit Profile</Typography> 
                </Box>
                <Box sx={{display:'flex',direction:'column',justifyContent:'center',alignItems:'center', width:'100%'}}>
                    <Typography sx={{fontWeight:'light', color:'colors.text', fontSize:20}}>{'pajsimbulan@mailman.com'}</Typography> 
                </Box>
            </Grid2>
            <Grid2 lg={4} xs={12} item sx={{height:'full'}}>
                <Box sx={{display:'flex', justifyContent:'center'}}> 
                <Avatar sx={{height:200, width:200}}></Avatar>
                </Box>
                <Box sx={{display:'flex', justifyContent:'center', marginTop:2}}> 
                <Button sx={{color:'black', borderRadius:2, bgcolor: 'colors.color2',textTransform: 'none', fontWeight:'bold', fontSize:'65%'}}> Change Profile Picture</Button>
                </Box>
            </Grid2>
            <Grid2 lg={8} xs={12} item>
                <Typography   Typography sx={{fontWeight:'bold', color:'colors.text', marginY:'auto'}}>First Name</Typography>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                    <Typography   Typography sx={{fontWeight:'light', color:'colors.text', marginY:'auto'}}>Paul</Typography>
                    <Button type="submit" sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} > Edit </Button>
                </Box>
                <Divider sx={{marginTop:1}}/>
                <Typography   Typography sx={{fontWeight:'bold', color:'colors.text', marginTop:5}}>Last Name</Typography>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                    <Typography   Typography sx={{fontWeight:'light', color:'colors.text', marginY:'auto'}}>Simbulan</Typography>
                    <Button type="submit" sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} > Edit </Button>
                </Box>
                <Divider/>
                <Typography   Typography sx={{fontWeight:'bold', color:'colors.text', marginTop:5}}>Password</Typography>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                    <Typography   Typography sx={{fontWeight:'light', color:'colors.text', marginY:'auto'}}>******</Typography>
                    <Button type="submit" sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} > Edit </Button>
                </Box>
                <Divider/>
                
                <Box sx={{width:'100%', display:'flex'}}>
                  <GenderRadioButtons gender={"Male"} />
                </Box>
                <Divider/>
                <Typography   Typography sx={{fontWeight:'bold', color:'colors.text', marginTop:5}}>Birthdate</Typography>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                    <Typography   Typography sx={{fontWeight:'light', color:'colors.text', marginY:'auto'}}>Birthdate</Typography>
                    <Button type="submit" sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} > Edit </Button>
                </Box>
                <Divider/>
            </Grid2>
              
              </Grid2>
          </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Profile;