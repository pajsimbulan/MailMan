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
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from '@material-ui/styles';
import { Avatar } from '@mui/material';
import { light } from '@mui/material/styles/createPalette';

const ComposeEmailContext = React.createContext();

const useStyles = makeStyles( theme => ({
    dialog: {
       width: '100%',
       height: '90%',
     },
 }));

export default function EmailContentWindow ({ closeWindow, email}) {
    const [open, setOpen] = React.useState(true);
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
        closeWindow();
    };  
    const handleOpen = () => {
        setOpen(true);
    }    
    return (     
        <Box>
                <Dialog PaperProps={{ style: {
                        minHeight: '50%',
                        maxHeight: '50%',
                        minWidth: '50%',
                        maxWidth: '50%',
                        borderRadius:10,

                    }}}  open={open} onClose={handleClose}>
                <AppBar elevation={0} sx={{ position: 'relative'}}>
                    <Toolbar sx={{justifyContent:'space-evenly'}}>
                        <Avatar sx={{marginRight: '4px'}}>
                        </Avatar>
                        <Typography variant="body2" sx={{fontSize: 15}}>
                            {email.to}
                        </Typography>
                        <Box flexGrow={1}></Box>
                        <Typography sx={{fontWeight:"bold"}}>  
                            {email.subject}
                        </Typography>
                        <Box sx={{ flex: 1 }}></Box>
                        
                        <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        >
                        <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
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
