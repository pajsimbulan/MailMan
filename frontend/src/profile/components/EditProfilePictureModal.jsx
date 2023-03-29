import * as React from 'react';
import { Box, Button, Typography, Modal, TextField, Avatar, Divider } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

const MAX_FILE_SIZE = 13000000;

export default function ProfilePictureModal({edit, closeModal, oldAvatarValue, setAvatar}) {
    const [avatarValue, setAvatarValue] = React.useState(oldAvatarValue);

    React.useEffect(() => {setAvatarValue(oldAvatarValue)},[oldAvatarValue,edit]);

    const handleClose = () => { 
        closeModal();
    };
      
    const submitHandler = () => {
        setAvatar(avatarValue);
        closeModal();
    }

    const handleFileChange = async (event) => {
        const files = event.target.files;
      
        const readFile = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const arrayBuffer = reader.result;
              const base64Data = arrayBufferToBase64(arrayBuffer);
              resolve({ name: file.name, data: base64Data });
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
        setAvatarValue(tempFiles[0].data);
      };

  return (
      <Modal
        open={edit}
        onClose={handleClose}
      >
        <Box 
            sx={{
            display:'flex',
            flexDirection:'column',
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            borderRadius: 10,
            bgcolor: 'background.paper',
            border: 'solid',
            borderWidth:'16px',
            borderColor: '#deedfd',
            p: 4,
            }}
            onKeyPress={(event)=> {
                if(event.key == 'Enter') {
                    submitHandler();
            }}}>
          <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center',flexWrap:'wrap'}}>
            <Typography sx={{fontWeight:'bold', color:'colors.text', fontSize:25}}>
              Edit Profile Picture
            </Typography>
            <Typography sx={{fontWeight:'light', color:'colors.text', fontSize:15, mb:0.5   }}>
              Help people recognize your account by uploading a profile picture.
            </Typography>
          <Avatar sx={{my:1,height:150, width:150, border:'solid', borderWidth:'3px', borderColor:'colors.color2'}} 
            src={`data:image/jpeg;base64,${avatarValue}`}
           />
            <Button 
                component="label"  size="small" variant='outlined' endIcon={<UploadIcon />} sx={{my:1,border:'solid', borderRadius:2, borderWidth:2,textTransform: 'none', color:'#0f172a', '&:hover':{ borderColor:'#0f172a'}}}
                > Upload Picture 
                 <input
                    type="file"
                    onChange={handleFileChange} 
                    style={{ display: "none" }}
                 />
            </Button>
          </Box>
          <Box sx={{display:'flex', flexDirection:'row', flexGrow:1, justifyContent:'end', marginTop:2}}>
            <Button type="button" 
            size="small"
              sx={{marginTop:3, color:'black', borderRadius:1, bgcolor:'whitesmoke', textTransform: 'none', width:'20%', height:'20%',marginY:'auto',marginRight:4 }} 
              onClick={()=> {handleClose();}}> Cancel
            </Button>
              <Button type="submit"
                size="small"
                sx={{marginTop:3, color:'white', borderRadius:1, bgcolor:'#0f172a', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} 
                onClick={()=> {submitHandler();}}> Submit 
              </Button>
          </Box>
        </Box>
      </Modal>
  );
}

const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer).reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return btoa(binary);
  };
