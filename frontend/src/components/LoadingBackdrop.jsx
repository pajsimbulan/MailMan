import * as React from 'react';
import {Box, Backdrop, CircularProgress} from '@mui/material';
import { Typography } from '@mui/material';

function LoadingBackdrop({show, message = ""}) {

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={show}
      >
        <Box sx={{display:'flex', flexDirection:'column', gap:3, justifyContent:'center', alignItems:'center'}}>  
            {message?
            <Typography>
                {message}
            </Typography>
            :null}
            <CircularProgress color="inherit" />
        </Box>
      </Backdrop>
    </div>
  );
}

export default LoadingBackdrop;