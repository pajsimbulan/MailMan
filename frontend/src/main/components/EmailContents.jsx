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


export default function EmailContentWindow ({ closeEmail, email}) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        console.log('handleClose called');
        setOpen(false);
        closeEmail();
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
                        <Avatar sx={{mr:2, height:60, width:60}} />
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="To"
                        type="email"
                        fullWidth
                        variant="filled"
                    />
                     <TextField
                        autoFocus
                        margin="dense"
                        id="subject"
                        label="Subject"
                        fullWidth
                        variant="filled"
                    />
                     <TextField
                        autoFocus
                        label="Content"
                        id="content"
                        multiline
                        rows={10}   
                        fullWidth
                        variant="filled"
                    />
                    </DialogContent>
                </Dialog>
            </Box>
    );
}
