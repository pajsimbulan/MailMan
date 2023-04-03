import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CircularProgress from '@mui/material/CircularProgress';
function UhOh() {
  const navigate = useNavigate();


  React.useEffect(() => {
    // start the hand wave animation after 3 seconds (adjust as needed)
    setTimeout(() => {
     
    }, 3000);
  }, []);

  const handleAnimationEnd = () => {
    // display the greetingText2 text after the fadeIn animation has completed
    setShowGreeting2(true);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'repeating-radial-gradient(#CCE3FA,#EDF6FF)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >   
      <Box sx={{ my: 'auto', position: 'absolute', top: '30%',textAlign:'center',  }}>
      <EngineeringIcon sx={{fontSize:100, color:'#047481', height: 150, width: 150, ml:4, '@media (max-width: 800px)': { height: 135, width: 135, }, '@media (max-width: 500px)': { height: 120, width: 120, }}}/>
        <Typography sx={{fontSize:'35px', fontWeight:'bold', '@media (max-width: 800px)': { fontSize: '30px' }, '@media (max-width: 500px)': { fontSize: '25px' }}}>
            Uh oh! 
        </Typography>
        <Typography sx={{'@media (max-width: 800px)': { fontSize: '14px' }, '@media (max-width: 500px)': { fontSize: '13px' }}}>
            Something went wrong. <span style={{fontWeight:'bold', color:'#047481'}}>Handyman</span> is on the way to fix it.
        </Typography>
        <Typography sx={{fontSize:'14px', fontWeight:'bold','@media (max-width: 800px)': { fontSize: '13px' }, '@media (max-width: 500px)': { fontSize: '12px' }}}>
            You'll be redirected to the sign in page in 5 seconds.
        </Typography>
        <CircularProgress sx={{color:'#047481', mt:2}}/>
        </Box>
      </Box>
  );
}

export default UhOh;
