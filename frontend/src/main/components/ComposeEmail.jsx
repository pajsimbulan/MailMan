import * as React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from '@material-ui/styles';

const ComposeEmailContext = React.createContext();

const useStyles = makeStyles( theme => ({
    dialog: {
       width: '100%',
       height: '100%',
     },
 }));

export default function ComposeEmail () {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };  
    const handleOpen = () => {
        setOpen(true);
    }    
    return (     
        <Box sx = {{ width: '100%'}}>
            <Button variant="contained" sx = {{ width: '100%', backgroundColor: 'black'}} onClick={handleOpen}>
                <Typography variant="overline">
                    Compose
                </Typography>
            </Button>    
            <Box component="form">
                <Dialog 
                    open={open} onClose={handleClose}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography variant="overline">
                            New Message
                        </Typography>
                        <Box sx={{ ml: 2, flex: 1 }}></Box>
                        
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
                    <DialogActions>
                    <Button variant="outlined" onClick={handleClose} endIcon={<SendIcon />}>Send</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
           
    );
}
