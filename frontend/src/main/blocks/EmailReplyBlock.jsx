import * as React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar, Divider, TextField } from '@mui/material';
import { parseDate } from '../../utils/DateParser';

function EmailReplyBlock ({contents}) {
    const [value, setValue] = React.useState('');
    return (
    <Box>
        <Divider  sx={{my:2}}/>
        <Box component="form" sx={{ display:'flex', flexGrow:1, flexDirection:'column',bgcolor:'#ECEFF1',mx:5, p:2, borderRadius:5, gap:2}}>   
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Box sx={{display:'flex', flexDirection:'row', gap:1}}>
                    <Avatar />
                    <Typography sx={{fontWeight:'bold', my:'auto'}}>
                        You
                    </Typography>
                </Box>
                <Typography>
                    {parseDate(new Date())}
                </Typography>
            </Box>
            <Typography>
            {contents}
           </Typography>
        </Box>
    </Box>);
}

export default EmailReplyBlock;