import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Divider } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router';
import { useContext, useState, useRef } from 'react';
import { UserContext } from '../App';
import SuccessActionAlert from '../components/SuccessAlert';
import ErrorActionAlert from '../components/ErrorAlert';
import GenderRadioButtons from '../components/GenderRadioButton';
import Birthdatepicker from '../components/BirthDatePicker';
import FirstNameModal from '../components/EditFirstNameModal';
import LastNameModal from '../components/EditLastNameModal';
import PasswordModal from '../components/EditPasswordModal';

const theme = createTheme({
  palette: {
    colors: {
      bg:'#FFFFFF',
      color2:'#F1F5F9',
      text: '#334155',
      button: '#0F172A',
    }
  },
});
function Profile() {
  console.log('renderProfile');
  const navigate = useNavigate();
  const {userInfo} = useContext(UserContext)
 
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
      <Box noValidate sx = {{width: "100%", height: '100vh',display: 'flex',flexDirection:'column', alignItems:'center', bgcolor:'colors.color2', margin:-1}}>
        <Box sx={{
            marginTop:'10%',
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            boxShadow: '10',
            borderRadius: 3,
            border: 'solid',  
            borderWidth:'6px',
            borderColor: 'colors.color2',
            bgcolor:'white',
          }}>
            
            
           <Grid2 container sx={{marginX:5, mt:5, mb:'10%'}} >
            <Grid2 item xs={12} sx={{marginBottom:5}}> 
                <Box sx={{display:'flex',justifyContent:'center', width:'100%'}}>
                    <Typography sx={{fontWeight:'bold', color:'colors.text', fontSize:30}}>Edit Profile</Typography> 
                </Box>
                <Box sx={{display:'flex',justifyContent:'center', width:'100%'}}>
                    <Typography sx={{fontWeight:'light', color:'colors.text', fontSize:20}}>{userInfo.email}</Typography> 
                </Box>
            </Grid2>
            <Grid2 lg={4} xs={12} item sx={{height:'full'}}>
                <Box sx={{display:'flex', justifyContent:'center'}}> 
                <Avatar sx={{height:200, width:200, border:'solid', borderWidth:'3px', borderColor:'colors.color2'}} src=""></Avatar>
                </Box>
                <Box sx={{display:'flex', justifyContent:'center', marginTop:2, marginBottom:10}}> 
                <Button sx={{color:'black', borderRadius:2, bgcolor: 'colors.color2',textTransform: 'none', fontWeight:'bold', fontSize:'65%'}}> Change Profile Picture</Button>
                </Box>
            </Grid2>
              <Grid2 lg={8} xs={12} item>
                  <Typography   Typography sx={{fontWeight:'bold', color:'colors.text', marginY:'auto'}}>First Name</Typography>
                  <FirstNameRow firstName={userInfo.firstName}/>
                  <Divider sx={{marginTop:1}}/>
                  <Typography   Typography sx={{fontWeight:'bold', color:'colors.text', marginTop:5}}>Last Name</Typography>
                  <LastNameRow lastName={userInfo.lastName}/>
                  <Divider sx={{marginTop:1}}/>
                  <Typography   Typography sx={{fontWeight:'bold', color:'colors.text', marginTop:5}}>Password</Typography>
                  <PasswordRow />
                  <Divider sx={{marginTop:1}}/> 
                  <GenderRow gender={userInfo.gender}/>
                  <Divider sx={{marginTop:1}}/>
                  <Typography   Typography sx={{fontWeight:'bold', color:'colors.text', marginTop:5}}>Birthdate</Typography>
                  <BirthDateRow birthDate={userInfo.birthDate}/>
                  <Divider sx={{marginTop:1}}/>
              </Grid2> 
              </Grid2>
          </Box>
      </Box>
    </ThemeProvider>
  );
}

function FirstNameRow({firstName}) {
  const [edit,setEdit] = useState(false);
  return (
    <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}>  
      <Box sx={{marginY:'auto'}}> 
      <FirstNameModal  edit={edit} closeModal={() => {setEdit(false)} } oldValue={firstName}/>
      <Typography sx={{fontWeight:'light', color:'colors.text'}}>{firstName}</Typography>
      </Box>  
      <Button type="button" 
      sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} 
      onClick={()=> {setEdit(true);}}> Edit </Button>
    </Box>
  );
}

function LastNameRow({lastName}) {
  const [edit,setEdit] = useState(false);
  console.log(lastName);
  return (
    <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}>  
      <Box sx={{marginY:'auto'}}> 
      <LastNameModal  edit={edit} closeModal={() => {setEdit(false)} } oldValue={lastName}/>
      <Typography sx={{fontWeight:'light', color:'colors.text'}}>{lastName}</Typography>
      </Box>  
      <Button type="button" 
      sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} 
      onClick={()=> {setEdit(true);}}> Edit </Button>
    </Box>
  );
}

function PasswordRow() {
  const [edit,setEdit] = useState(false);
  return (
    <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}>
        <Box sx={{marginY:'auto'}}> 
        <PasswordModal  edit={edit} closeModal={() => {setEdit(false)} }/>
        <Typography   Typography sx={{fontWeight:'light', color:'colors.text', marginY:'auto'}}>*********</Typography>
        </Box> 
        <Button type="button" 
          sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} 
          onClick={()=> {setEdit(true);}}> Edit 
        </Button>
    </Box>
  );

}

function BirthDateRow({birthDate}) {
  const [edit,setEdit] = useState(false);
  const [invalidBirthDate, setInvalidBirthDate] = useState(false);
  return(
  <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', marginTop:1}}>
    <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'column'}}>
    <Birthdatepicker 
      editProp={edit} 
      valid={()=>{setInvalidBirthDate(false)}} 
      invalid={()=>{setInvalidBirthDate(true)}}
      oldValue={birthDate}
      />
    {invalidBirthDate? <Typography sx={{fonweight:'light', fontSize:15, color:'red'}}>*Invalid Birthdate*</Typography>:<></>}
    </Box>
    <Button type="button" disabled={invalidBirthDate} 
    sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }}
    onClick={() => {setEdit(!edit)}}
    >{edit?"Save Changes": "Edit"} </Button>
    
  </Box>
)
}

function GenderRow({gender}) {
  const [edit,setEdit] = useState(false);

  return (
  <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}>
    <GenderRadioButtons gender={gender} editProp={edit}/>
    <Button type="button" sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} onClick={()=>{setEdit(!edit);}}> {edit?"Save":"Edit"} </Button>
  </Box>);
}

export default Profile;