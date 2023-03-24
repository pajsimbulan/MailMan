import * as React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar, Divider, TextField } from '@mui/material';

function EmailReplying ({submitReply, exitReply}) {
    const [value, setValue] = React.useState('');
    return (
    <Box>
        <Divider  sx={{my:2}}/>
        <Box component="form" onSubmit={() => {submitReply(value);}} sx={{ display:'flex', flexGrow:1, flexDirection:'column',bgcolor:'#ECEFF1',mx:5, p:2, borderRadius:5, gap:2}}>   
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Box sx={{display:'flex', flexDirection:'row', gap:1}}>
                    <Avatar />
                    <Typography sx={{fontWeight:'bold', my:'auto'}}>
                        You
                    </Typography>
                </Box>
                <IconButton onClick={() => {exitReply();}}>
                    <CloseIcon/>
                </IconButton>
            </Box>
            <TextField onChange={(event) => {setValue(event.target.value)}} autoFocus sx={{"& fieldset": { border: 'none' }}}/>
        </Box>
        <Box sx={{display:'flex', justifyContent:'end', my:1, mx:5,}}>
            <Button type="submit" variant='contained' onClick={() => {submitReply(value);}} sx={{border:'solid', borderRadius:4, borderWidth:0,textTransform: 'none', }}>
                Send
            </Button>
        </Box> 
    </Box>);
}

export default EmailReplying;