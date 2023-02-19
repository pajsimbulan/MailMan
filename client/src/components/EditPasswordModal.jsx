import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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

export default function PasswordModal({edit, closeModal, updatePassword}) {
  const [value, setValue]= React.useState("");

  const handleClose = () => { 
    closeModal();};
  
  const submitHandler = () => {
    updatePassword(value);
    closeModal();
  }
  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={edit}
        onClose={handleClose}
      >
        <Box 
          component="form"
          onSubmit={()=> {submitHandler();}}
          sx={{
            display:'flex',
            flexDirection:'column',
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            borderRadius:10,
            bgcolor: 'background.paper',
            border: 'solid',
            borderWidth:'16px',
            borderColor: 'colors.color2',
            p: 4,
        }}>
        <Box component="form" sx={{display:'flex',justifyContent:'center', width:'100%'}}>
            <Typography sx={{fontWeight:'bold', color:'colors.text', fontSize:25}}>
              Change Password
            </Typography>
          </Box>
          <Box sx={{display:'flex',justifyContent:'center', width:'100%', marginY:2}}>
            <Typography sx={{fontWeight:'light', color:'colors.text', fontSize:15}}>
              Enter a new password
            </Typography>
          </Box>
              <Typography sx={{mt:2, fontWeight:'bold', color:'colors.text'}}>New Password</Typography>
              <TextField
                margin="normal"
                name="password"
                type="password"
                id="password"
                onChange={(event) => {setValue(event.target.value);}}
              />
             <Box sx={{display:'flex', flexDirection:'row', flexGrow:1, justifyContent:'end', marginTop:5}}>
            <Button type="button" 
              sx={{marginTop:3, bgcolor:'grey', color:'black', borderRadius:1, bgcolor:'whitesmoke', textTransform: 'none', width:'20%', height:'20%',marginY:'auto',marginRight:4 }} 
              onClick={handleClose}> Cancel
            </Button>
              <Button type="submit"
              sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} 
              onSubmit={()=> {submitHandler();}}> Submit 
              </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
