import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

function PasswordChangedSuccesful ({onButtonPress}) {
    return( 
    <Box sx={{marginX:10, mt:5, mb:10,display: 'flex', flexDirection:'column', gap:1, alignItems:'center' }} >
        <Avatar src="approval.svg" sx={{width:50, height:50}}/>
    
        <Typography sx={{fontSize:20, fontWeight:'bold'}}>Password Changed!</Typography>
        <Typography sx={{fontSize:13, color:'colors.text'}}>Your password was successfully changed</Typography>
        <Typography sx={{fontSize:13, }}>Try logging in with your new password</Typography>
        <Box sx={{width:'100%', borderTop:'solid', borderTopWidth:1, borderTopColor:'#E8E8E8', my:2}}/>
        <Button 
        type="button" 
        variant="outlined" 
        sx={{borderRadius:1, textTransform: 'none', width:"100%", height:55, fontWeight:'bold', width:'100%'}} 
        onClick={() => {onButtonPress();}}>
        Back to Sign In
        </Button>
    </Box>);

}
export default PasswordChangedSuccesful;