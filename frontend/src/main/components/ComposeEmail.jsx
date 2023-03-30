import * as React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Avatar, Divider } from '@mui/material';
import { UserContext } from '../../App';
import FileChip from './FileChip';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const MAX_FILE_SIZE = 13000000;
function ComposeEmail ({closeComposeEmail}) {
    const user = React.useContext(UserContext);
    const [open, setOpen] = React.useState(true);
    const toRef = React.useRef();
    const subjectRef = React.useRef();
    const contentsRef = React.useRef();
    const [binaryFiles, setBinaryFiles] = React.useState([]);
    console.log(`rendering ComposeEmail ${binaryFiles.length}`);
    console.log(`tempFiles: ${binaryFiles.forEach((file) => console.log(`${file.name} -> ${file.type}`))}`);
    const submitSend = () => {
        setOpen(false);
        closeComposeEmail('success');
    }
    const handleClose = () => {
        setOpen(false);
        closeComposeEmail('none');
    };  

    const downloadFile = (file) => {
        const dataUrl = `data:application/octet-stream;base64,${file.data}`;
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = file.name;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      
    const handleFileChange = async (event) => {
        const files = event.target.files;
      
        const readFile = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const arrayBuffer = reader.result;
              const base64Data = arrayBufferToBase64(arrayBuffer);
              console.log(`file type: ${file.type}`);
              resolve({ name: file.name, data: base64Data, type: file.type });
            };
            reader.onerror = (error) => {
              console.error(`Error reading file ${file.name}:`, error);
              reject(error);
            };
            reader.readAsArrayBuffer(file);
          });
        };
      
        const tempFiles = await Promise.all(
          Array.from(files)
            .filter((file) => {
              if (file.size <= MAX_FILE_SIZE) {
                return true;
              } else {
                alert('File size is too large. Limit files to 13MB');
                return false;
              }
            })
            .map((file) => readFile(file))
        );
            
        setBinaryFiles([...binaryFiles, ...tempFiles]);
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
                <Box sx={{display:'flex', flexDirection:'row', flexWrap:'wrap', p:1,bgcolor:'#eceff1'}}>
                    <Box sx={{width:'33.33%', display:'flex', flexDirection:'row',}}>   
                        <Avatar  sx={{mr:2, height:40, width:40}} src={user.userInfo.avatar?`data:image/jpeg;base64,${user.userInfo.avatar}`:null}/>
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
                    <Box sx={{width:'33.33%', display:'flex', justifyContent:'end',}}>
                        <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => {
                            console.log('Close button clicked');
                            handleClose();
                          }}
                        aria-label="close"
                        >
                        <CloseIcon sx={{color:'#002159'}}/>
                        </IconButton>   
                    </Box>
                    </Box>    
                    <Box component="form" onSubmit={submitSend} noValidate sx={{ width:'100%' }}>
                    {/**Text Fields*/}
                    <Box sx={{ display:'flex', flexGrow:1, flexDirection:'column',mx:5, px:5, py:2, borderRadius:5, gap:1, }}>
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
                        <Box sx={{display:'flex', flexGrow:1, flexDirection:'column',bgcolor:'#ECEFF1', borderRadius:5,p:2 }}>
                            <TextField name="contents" id="contents" inputRef={contentsRef} fullWidth multiline rows={12} sx={{  "& fieldset": { border: 'none'}}}/>
                            {binaryFiles.length > 0 ?
                        <FileChip
                            files={binaryFiles.map(file => {return {name:file.name, type:file.type}})}
                            fileType={binaryFiles.map(file => file.type)}
                            fileNames={binaryFiles.map(file => file.name)} 
                            onClick={(index) => {downloadFile(binaryFiles[index])}} 
                            onDelete={(index) => {setBinaryFiles(files => {
                                const toRemove = files[index].name;
                                const newFiles = files.filter(files => files.name !== toRemove);
                                return newFiles;
                            })}} /> : null}
                        </Box>
                        
                        
                        <Box sx={{display:'flex', flexGrow:1, justifyContent:'space-between', my:1, }}>
                            <Button component="label"  size="small" variant='outlined' endIcon={<AttachFileIcon />} sx={{border:'solid', borderRadius:4, borderWidth:2,textTransform: 'none', color:'#2e7d32', '&:hover':{ borderColor:'#2e7d32'}}}>
                            Attach File
                            <input
                                    type="file"
                                    onChange={handleFileChange} 
                                    style={{ display: "none" }}
                                    multiple
                            />
                            </Button>
                            <Box sx={{display:'flex', flexDirection:'row', flexWrap:'wrap', gap:1}}>
                            <Button variant='outlined' size="small" onClick={handleClose} startIcon={<DeleteOutlineIcon />} sx={{border:'solid', borderRadius:4, borderWidth:2,textTransform: 'none', color:'#002159', '&:hover':{ borderColor:'#002159'}}}>
                                Discard
                            </Button>
                            <Button variant='outlined' size="small" onClick={submitSend} endIcon={<SendOutlinedIcon />} sx={{border:'solid', borderRadius:4, borderWidth:2,textTransform: 'none', color:'#338feb'}}>
                                Send
                            </Button>
                            </Box>
                        </Box>
                    </Box> 
    
                    {/** END Text Fields*/}
                    
                </Box>
        </Dialog>
    </Box>
    );
}

const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer).reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return btoa(binary);
  };

export default ComposeEmail;
