import * as React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ReplyIcon from '@mui/icons-material/Reply';
import formatDate from '../../utils/DateFormat';
import EmailReplying from '../blocks/EmailReplying';
import EmailReplyBlock from '../blocks/EmailReplyBlock';

function EmailContentWindow ({ closeEmail, email, onCLose}) {
    const [open, setOpen] = React.useState(true);
    const [starred, setStarred] = React.useState(false);
    const [reply, setReply] = React.useState(false);
    const replies = React.useRef([]);
    console.log(replies.current.length);
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
                      <Typography sx={{my:'auto', color:'#8e8080', fontSize:13}}>
                        {formatDate(email.createdAt)} 
                      </Typography>
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
                <Box sx={{ width:'100%' }}>
                    {/**Main Email*/}
                    <Box sx={{ display:'flex', flexGrow:1, flexDirection:'column',bgcolor:'#ECEFF1',mx:5, p:2, borderRadius:5, gap:2 }}>
                        <Typography>
                            {email.contents}
                        </Typography>
                        <Avatar sx={{width:200,height:200}}/>
                    </Box>
                    {replies.current.map((reply) => {return <EmailReplyBlock key={reply} contents={reply}/>})}
                    {reply? null :
                    <Box sx={{display:'flex', flexGrow:1, justifyContent:'end', my:1, mx:5,}}>
                        <Button variant='outlined' onClick={() => {setReply(true);}} endIcon={<ReplyIcon />} sx={{border:'solid', borderRadius:4, borderWidth:2,textTransform: 'none', color:'#338feb'}}>
                            Reply
                        </Button>
                    </Box> }
                     {/** END of Main Email*/}
                     {/** Reply Email */}
                     {reply? <EmailReplying submitReply={(value) => {setReply(false); replies.current.push(value)}}  exitReply={() => {setReply(false);}}/> : null}
                    {/** END of Reply Email */}
                    
                </Box>
        </Dialog>
    </Box>
    );
}

export default EmailContentWindow;