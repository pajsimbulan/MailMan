import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { IconButton, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import hourOfDay from '../../utils/DateHOD';
import parseDate from '../../utils/DateParser';

function EmailBlock({email, avatarUrl, selected}) {
    const [starred, setStarred] = React.useState(false);
    const [openEmail, setOpenEmail] = React.useState(false);

    return(
    <Box onClick={() => {selected(email)}} sx={{width:'100%', border:'solid', mt:-0.5,borderWidth:0,display:'flex', flexDirection:'row', boxShadow:2,bgcolor:'white', borderRadius:3,py:1,'&:hover':{borderWidth:1,boxShadow:5, cursor:'pointer', borderColor:'#338FEB',}  }}>
        <Checkbox onClick={(event) => {event.stopPropagation();}} onChange={(event) => {event.stopPropagation();} } sx={{my:'auto',transform: "scale(0.8)",ml:2,  mr:0.5}} />
        <IconButton  sx={{height:20, width:20, my:'auto', mr:0.5}} onClick={(event) => {event.stopPropagation();setStarred(!starred); console.log('star');}}>
            {starred? <StarIcon sx={{height:20, width:20,}}/> : <StarBorderIcon sx={{height:20, width:20,}}/>}
        </IconButton>
        <Avatar alt={email.from} src={avatarUrl} sx={{my:'auto', height:40, width:40}}/>
        <Box component="div" sx={{display:'flex', flexDirection:'column', flexGrow:1, overflow: 'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis', m:1 }}>
        <Typography sx={{fontWeight:'bold', fontSize:'14px'}}>
            {email.subject}
        </Typography>    
        <Box sx={{maxWidth:'100%'}}>
        <Typography sx={{fontSize:'12px'}}>
            {email.contents}
        </Typography>
        </Box>
        </Box>
        <Box sx={{minWidth:100, my:'auto', display:'flex', justifyContent:'center', }}>
        <Typography sx={{color:'grey', fontWeight:'bold',fontSize:'12px'}}>
        {parseDate(email.createdAt).toLowerCase() == 'today'?hourOfDay(email.createdAt):parseDate(email.createdAt)}
        </Typography>
        </Box>
    </Box>)
}

export default EmailBlock;