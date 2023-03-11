import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { IconButton, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
const starredStyling = {height:30, width:30,};

function EmailBlock({email, avatarUrl}) {
    const [starred, setStarred] = React.useState(false);
    return(
    <Button component="button" sx={{width:'100%', border:'solid', borderWidth:0,display:'flex', flexDirection:'row', boxShadow:4,bgcolor:'white', borderRadius:3,py:1}}>
        <Checkbox sx={{my:'auto', height:40, width:40,ml:2}} />
        <IconButton sx={{height:40, width:40, my:'auto',}} onClick={() => setStarred(!starred)}>
            {starred? <StarIcon sx={{height:25, width:25,}}/> : <StarBorderIcon sx={{height:25, width:25,}}/>}
        </IconButton>
        <Avatar alt={email.from} src={avatarUrl} sx={{my:'auto', height:50, width:50}}/>
        <Box component="div" sx={{display:'flex', flexDirection:'column', flexGrow:1, overflow: 'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis', m:2 }}>
        <Typography sx={{fontWeight:'bold'}}>
            {email.subject}
        </Typography>    
        <Box sx={{maxWidth:'100%'}}>
        <Typography>
            {email.contents}
        </Typography>
        </Box>
        </Box>
        <Box sx={{minWidth:100, my:'auto', display:'flex', justifyContent:'center', }}>
        <Typography sx={{color:'grey', fontWeight:'bold',fontSize:'14px'}}>
        {'Today'}
        </Typography>
        </Box>
    </Button>)
}

export default EmailBlock;