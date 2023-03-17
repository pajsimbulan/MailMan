import * as React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function EmailContentWindow ({ closeEmail, email, onCLose}) {
    const [open, setOpen] = React.useState(true);
    const [starred, setStarred] = React.useState(false);

    const handleClose = () => {
        console.log('handleClose called');
        setOpen(false);
        closeEmail();
        //onClose(starred);
    };  
    return (     
        <Box>
            <Dialog 
                PaperProps={{ style: {
                        minHeight: '90%',
                        maxHeight: '90%',
                        minWidth: '90%',
                        maxWidth: '90%',
                        borderRadius:10,
                    }}}  open={open} onClose={() => {
                        console.log('Modal closed');
                        handleClose();
                      }}>
                <Box sx={{display:'flex', flexDirection:'row', flexWrap:'wrap', p:2}}>
                    <Box sx={{width:'33.33%', display:'flex', flexDirection:'row',}}>   
                        <Avatar  sx={{mr:2, height:60, width:60}} />
                    <Box sx={{display:'flex', flexDirection:'column', my:'auto'}}>
                        <Typography variant="body2" sx={{fontSize: 15, fontWeight:'bold'}}>
                            {'Zaheer'}
                        </Typography>
                        <Typography variant="body2" sx={{fontSize: 12}}>
                            {'<'+ email.from + '>'}
                        </Typography>
                    </Box>
                    </Box>
                    <Box sx={{width:'33.33%', display:'flex', justifyContent:'center'}}>
                        <Typography sx={{fontWeight:"bold", my:'auto'}}>  
                            {email.subject} 
                        </Typography>
                    </Box>    
                    <Box sx={{width:'33.33%', display:'flex', justifyContent:'end'}}>
                    <IconButton  sx={{height:40, width:40, my:'auto', mx:1}} onClick={(event) => {event.stopPropagation();setStarred(!starred); console.log('star');}}>
                        {starred? <StarIcon sx={{height:25, width:25,}}/> : <StarBorderIcon sx={{height:25, width:25,}}/>}
                    </IconButton>
                        <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => {
                            console.log('Close button clicked');
                            handleClose();
                          }}
                        aria-label="close"
                        sx={{mr:1}}
                        >
                        <CloseIcon />
                        </IconButton>   
                    </Box>    
                </Box>
                    <DialogContent>
                    
                    </DialogContent>
                </Dialog>
            </Box>
    );
}
