import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Divider } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router';
import { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../App';
import SuccessActionAlert from '../components/SuccessAlert';
import ErrorActionAlert from '../components/ErrorAlert';
import GenderRadioButtons from '../components/GenderRadioButton';
import Birthdatepicker from '../components/BirthDatePicker';
import FirstNameModal from '../components/EditFirstNameModal';
import LastNameModal from '../components/EditLastNameModal';
import PasswordModal from '../components/EditPasswordModal';
import UpdateUserUser from '../hooks/useUpdateUser';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useUpdateUser from '../hooks/useUpdateUser';

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
  
  const navigate = useNavigate();
  const {accessToken, userInfo} = useContext(UserContext);
  const openSuccessAlert = useRef(false);
  const openErrorAlert = useRef(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [madeChanges, setMadeChanges] = useState(false);
  const password = useRef("");
  const {updateUserInfo, updatePassword} = useUpdateUser({accessToken, userInfo});
  
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
      <ErrorActionAlert openAlert={openErrorAlert.current} message={alertMessage} closeAlert={() => {openErrorAlert.current = (!openErrorAlert.current)}}/>
      <SuccessActionAlert openAlert={openSuccessAlert.current} message={alertMessage} closeAlert={() => {openSuccessAlert.current = (!openSuccessAlert.current)}}/>
      <Box noValidate sx = {{width: "100%", height: '100vh',display: 'flex',flexDirection:'column', alignItems:'center',  margin:-1}}>
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
            <Grid2 item xs={12} lg={4}>
            <Button 
              type="button" 
              sx={{bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:100, height:40,fontSize:'80%', marginBottom:2}} 
              startIcon={<ArrowBackIcon sx={{marginLeft:-2}}/>}
              onClick={()=>{returnHandler()}}> 
              Home 
            </Button>
            </Grid2>
            <Grid2 item lg={4} xs={12}>
              <Box sx={{display:'flex',justifyContent:'center', width:'100%'}}>
                  <Typography sx={{position:'relative', fontWeight:'bold', color:'colors.text', fontSize:30}}>Edit Profile</Typography> 
              </Box>
            </Grid2>
            <Grid2 item xs={12} sx={{marginBottom:5}}> 
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
                  <FirstNameRow firstName={userInfo.firstName} update={(newValue)=>{
                    userInfo.firstName = newValue;
                    setMadeChanges(true);
                    }}/>
                  <Divider sx={{marginTop:1}}/>
                  <Typography   Typography sx={{fontWeight:'bold', color:'colors.text', marginTop:5}}>Last Name</Typography>
                  <LastNameRow lastName={userInfo.lastName} update={(newValue)=>{
                    userInfo.lastName = newValue;
                    setMadeChanges(true);
                    }}/>
                  <Divider sx={{marginTop:1}}/>
                  <Typography   Typography sx={{fontWeight:'bold', color:'colors.text', marginTop:5}}>Password</Typography>
                  <PasswordRow update={(newValue) => {password.current = newValue}}/>
                  <Divider sx={{marginTop:1}}/> 
                  <GenderRow gender={userInfo.gender} update={(newValue)=>{
                    userInfo.gender = newValue;
                    setMadeChanges(true);
                    }}/>
                  <Divider sx={{marginTop:1}}/>
                  <Typography   Typography sx={{fontWeight:'bold', color:'colors.text', marginTop:5}}>Birthdate</Typography>
                  <BirthDateRow birthDate={userInfo.birthDate}  update={(newValue)=>{
                    userInfo.birthDate = newValue;
                    setMadeChanges(true);
                    }}/>
                  <Divider sx={{marginTop:1}}/>
              </Grid2> 
              </Grid2>
          </Box>
      </Box>
    </ThemeProvider>
  );
}

function FirstNameRow({firstName, update}) {
  const [edit,setEdit] = useState(false);
  const [value, setValue] = useState(firstName);
  console.log('firstnamerow render');

  const updateFirstName = (newFirstName) => {
    if(newFirstName !== value) {
      setValue(newFirstName);
      update(newFirstName);
    }
  };
  
  return (
    <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}>  
      <Box sx={{marginY:'auto'}}> 
      <FirstNameModal  edit={edit} closeModal={() => {setEdit(false); console.log('closing modal')} } oldValue={firstName} setFirstName={(newFirstName) =>{updateFirstName(newFirstName)} }/>
      <Typography sx={{fontWeight:'light', color:'colors.text'}}>{value}</Typography>
      </Box>  
      <Button type="button" 
      sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} 
      onClick={()=> {setEdit(true);}}> Edit </Button>
    </Box>
  );
}

function LastNameRow({lastName, update}) {
  const [edit,setEdit] = useState(false);
  const [value, setValue] = useState(lastName);

  const updateLastName = (newLastName) => {
    if(newLastName !== value) {
      setValue(newLastName);
      update(newLastName);
    }
  };

  return (
    <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}>  
      <Box sx={{marginY:'auto'}}> 
      <LastNameModal  edit={edit} closeModal={() => {setEdit(false)} } oldValue={lastName} setLastName={(newLastName) =>{updateLastName(newLastName)} }/>
      <Typography sx={{fontWeight:'light', color:'colors.text'}}>{value}</Typography>
      </Box>  
      <Button type="button" 
      sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} 
      onClick={()=> {setEdit(true);}}> Edit </Button>
    </Box>
  );
}

function PasswordRow({update}) {
  const [edit,setEdit] = useState(false);

  return (
    <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}>
        <Box sx={{marginY:'auto'}}> 
        <PasswordModal  edit={edit} closeModal={() => {setEdit(false)}} updatePassword={(newPassword) => {update(newPassword);} }/>
        <Typography   Typography sx={{fontWeight:'light', color:'colors.text', marginY:'auto'}}>*********</Typography>
        </Box> 
        <Button type="button" 
          sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} 
          onClick={()=> {setEdit(true);}}> Edit 
        </Button>
    </Box>
  );

}

function GenderRow({gender, update}) {
  const [edit,setEdit] = useState(false);
  const [value, setValue] = useState(gender);

  const updateGender = () => {
    setEdit(!edit)
    if( (gender !== value) && (edit) ) {
      console.log('gender updating');
      update(value);
    }
  };

  return (
  <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}>
    <GenderRadioButtons oldValue={gender} editProp={edit} setGender={(newValue) => {setValue(newValue)}} />
    <Button type="button" sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} onClick={()=>{updateGender();}}> {edit?"Save":"Edit"} </Button>
  </Box>);
}

function BirthDateRow({birthDate, update}) {
  const [edit,setEdit] = useState(false);
  const [invalidBirthDate, setInvalidBirthDate] = useState(false);
  const [value, setValue] = useState(birthDate);

  const updateBirthDate = () => {
    setEdit(!edit)
    if( (birthDate !== value) && 
        (!invalidBirthDate) &&
        (edit)) {
      update(value);
    }
  };

  return(
  <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', marginTop:1}}>
    <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'column'}}>
    <Birthdatepicker 
      editProp={edit} 
      valid={()=>{setInvalidBirthDate(false)}} 
      invalid={()=>{setInvalidBirthDate(true)}}
      oldValue={birthDate}
      setBirthDate={(newValue) => {setValue(newValue)}}
      />
    {invalidBirthDate? <Typography sx={{fonweight:'light', fontSize:15, color:'red'}}>*Invalid Birthdate*</Typography>:<></>}
    </Box>
    <Button type="button" disabled={invalidBirthDate} 
    sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }}
    onClick={() => {updateBirthDate()}}
    >{edit?"Save Changes": "Edit"} </Button>
  </Box>
)
}
export default Profile;