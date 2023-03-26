import * as React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Divider } from '@mui/material';
import { UserContext } from '../../App';
import SuccessActionAlert from '../../components/ErrorAlert';
import ErrorActionAlert from '../../components/ErrorAlert';

function ComposeEmail ({closeComposeEmail}) {
    const user = React.useContext(UserContext);
    const [open, setOpen] = React.useState(true);
    const toRef = React.useRef();
    const subjectRef = React.useRef();
    const contentsRef = React.useRef();
   
    const submitSend = () => {
        setOpen(false);
        closeComposeEmail('success');
    }
    const handleClose = () => {
        setOpen(false);
        closeComposeEmail('none');
    };  

    return (     
        <Box>
            <Dialog 
                PaperProps={{ style: {
                        minHeight: '70%',
                        maxHeight: '70%',
                        minWidth: '70%',
                        maxWidth: '70%',
                        border:'solid',
                        borderWidth:5,
                        borderRadius:10,
                        borderColor:'#edf4fb'
                        
                    }}}  open={open} onClose={() => {
                        console.log('Modal closed');
                        handleClose();
                      }}>
                <Box sx={{display:'flex', flexDirection:'row', flexWrap:'wrap', p:2,}}>
                    <Box sx={{width:'33.33%', display:'flex', flexDirection:'row',}}>   
                        <Avatar  sx={{mr:2, height:40, width:40}} />
                    <Box sx={{display:'flex', flexDirection:'column', my:'auto'}}>
                        <Typography variant="body2" sx={{fontSize: 12, fontWeight:'bold'}}>
                            {user.userInfo.firstName}
                        </Typography>
                        <Typography variant="body2" sx={{fontSize: 10}}>
                            {'<'+ user.userInfo.email + '>'}
                        </Typography>
                    </Box>
                    </Box>
                    <Box sx={{width:'33.33%', display:'flex', justifyContent:'center'}}>
                        <Typography sx={{fontWeight:"bold", my:'auto'}}>  
                            New Email 
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
                    <Box component="form" onSubmit={submitSend} noValidate sx={{ width:'100%' }}>
                    {/**Text Fields*/}
                    <Box sx={{ display:'flex', flexGrow:1, flexDirection:'column',mx:5, p:5, borderRadius:5, gap:1, }}>
                        <Box sx={{display:'flex', flexGrow:1, flexDirection:'row',bgcolor:'#ECEFF1', borderRadius:5, p:2 }}>
                            <Typography sx={{my:'auto', mx:1,width:60, color:'grey', fontSize:14 }}>
                                To:
                            </Typography>
                            <TextField name="to" id="to" fullWidth inputRef={toRef} sx={{  "& fieldset": { border: 'none'}}}/>
                        </Box>
                        <Divider />
                        <Box sx={{display:'flex', flexGrow:1, flexDirection:'row',bgcolor:'#ECEFF1', borderRadius:5,p:2 }}>
                            <Typography sx={{my:'auto', mx:1, width:60, color:'grey', fontSize:14 }}>
                                Subject:
                            </Typography>
                            <TextField name="subject" id="subject" fullWidth inputRef={subjectRef} sx={{  "& fieldset": { border: 'none'}}}/>
                        </Box>
                        <Divider />
                        <Box sx={{display:'flex', flexGrow:1, flexDirection:'row',bgcolor:'#ECEFF1', borderRadius:5,p:2 }}>
                            <TextField name="contents" id="contents" inputRef={contentsRef} fullWidth multiline rows={12} sx={{  "& fieldset": { border: 'none'}}}/>
                        </Box>
                        <Box sx={{display:'flex', flexGrow:1, justifyContent:'end', my:1, }}>
                            <Button variant='outlined' onClick={submitSend} endIcon={<SendIcon />} sx={{border:'solid', borderRadius:4, borderWidth:2,textTransform: 'none', color:'#338feb'}}>
                                Send
                            </Button>
                        </Box>
                    </Box> 
    
                    {/** END Text Fields*/}
                    
                </Box>
                </Box>
        </Dialog>
    </Box>
    );
}

export default ComposeEmail;
