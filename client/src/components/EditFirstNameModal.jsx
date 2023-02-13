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

export default function ProfileModal({edit, closeModal, oldValue}) {
  const [value, setValue]= React.useState(oldValue);
  console.log(`value=${value}`);

  React.useEffect(() => {setValue(oldValue)},[oldValue]);
  const handleClose = () => { 
    setValue(oldValue);
    closeModal();};
  
  const submitHandler = () => {
    if(value.length >= 3) {
      alert(`input = ${value}`);
    }
    else {
      alert('Input at least 3 characters');
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={edit}
        onClose={handleClose}
      >
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            
            borderRadius:3,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        }}>
          <Box sx={{display:'flex',justifyContent:'center', width:'100%'}}>
            <Typography sx={{fontWeight:'bold', color:'colors.text', fontSize:25}}>
              Change First Name
            </Typography>
          </Box>
          <Box sx={{display:'flex',justifyContent:'center', width:'100%', marginY:2}}>
            <Typography sx={{fontWeight:'light', color:'colors.text', fontSize:15}}>
              Enter a new first name and submit
            </Typography>
          </Box>
          <TextField defaultValue={value}  onChange={(event) => {setValue(event.target.value);}} type="text" name="firstName" id="firstName"/>
          <Box sx={{display:'flex', flexDirection:'row', flexGrow:1, justifyContent:'end', marginTop:5}}>
            <Button type="button" 
              sx={{marginTop:3, bgcolor:'grey', color:'black', borderRadius:1, bgcolor:'whitesmoke', textTransform: 'none', width:'20%', height:'20%',marginY:'auto',marginRight:4 }} 
              onClick={()=> {handleClose();}}> Cancel
            </Button>
              <Button type="button"
              sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} 
              onClick={()=> {submitHandler();}}> Submit 
              </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
