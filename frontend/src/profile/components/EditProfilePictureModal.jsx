/* global alert */
/* global FileReader */
import * as React from 'react';
import {
  Box, Button, Typography, Modal, Avatar,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

const MAX_FILE_SIZE = 13000000;

const arrayBufferToBase64 = (buffer) => {
  const binary = new Uint8Array(buffer).reduce(
    (acc, byte) => acc + String.fromCharCode(byte),
    '',
  );
  return btoa(binary);
};

function ProfilePictureModal({
  edit, closeModal, oldAvatarValue, setAvatar,
}) {
  const [avatarValue, setAvatarValue] = React.useState(oldAvatarValue);

  React.useEffect(() => { setAvatarValue(oldAvatarValue); }, [oldAvatarValue, edit]);

  const handleClose = () => {
    closeModal();
  };

  const submitHandler = () => {
    setAvatar(avatarValue);
    closeModal();
  };

  const handleFileChange = async (event) => {
    const { files } = event.target;

    const readFile = (file) => new Promise((resolve, reject) => {
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

    const tempFiles = await Promise.all(
      Array.from(files)
        .filter((file) => {
          if (file.size <= MAX_FILE_SIZE) {
            return true;
          }
          alert('File size is too large. Limit files to 13MB');
          return false;
        })
        .map((file) => readFile(file)),
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
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 10,
          bgcolor: 'background.paper',
          border: 'solid',
          borderWidth: '16px',
          borderColor: '#deedfd',
          p: 4,
        }}
        onKeyPress={(event) => {
          event.preventDefault();
          if (event.key === 'Enter') {
            submitHandler();
          }
        }}
      >
        <Box sx={{
          display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap',
        }}
        >
          <Typography sx={{
            fontWeight: 'bold',
            color: '#334155',
            fontSize: '25px',
            mx: 10,
            textAlign: 'center',
            mb: 0.5,
            '@media (max-width: 800px)': { fontSize: '20px' },
            '@media (max-width: 500px)': { fontSize: '16px' },
          }}
          >
            Edit Profile Picture
          </Typography>
          <Typography sx={{
            fontWeight: 'light',
            color: '#334155',
            fontSize: '15px',
            mb: 1,
            textAlign: 'center',
            '@media (max-width: 800px)': { fontSize: '12px' },
            '@media (max-width: 500px)': { fontSize: '10px' },
          }}
          >
            Help people recognize your account by uploading a profile picture.
          </Typography>
          <Avatar
            sx={{
              my: 1,
              height: 150,
              width: 150,
              border: 'solid',
              borderWidth: '3px',
              borderColor: '#F1F5F9',
              '@media (max-width: 800px)': { height: 135, width: 135 },
              '@media (max-width: 500px)': { height: 120, width: 120 },
            }}
            src={`data:image/jpeg;base64,${avatarValue}`}
          />
          <Button
            component="label"
            size="small"
            variant="outlined"
            endIcon={(
              <UploadIcon sx={{ height: 20, width: 20, '@media (max-width: 800px)': { height: 16, width: 16 } }} />
)}
            sx={{
              my: 1,
              border: 'solid',
              borderRadius: 2,
              borderWidth: 2,
              textTransform: 'none',
              color: '#0f172a',
              '&:hover': { borderColor: '#0f172a' },
              '@media (max-width: 800px)': { fontSize: '12px' },
              '@media (max-width: 500px)': { fontSize: '10px' },
            }}
          >
            {' '}
            Upload Picture
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </Button>
        </Box>
        <Box sx={{
          display: 'flex', flexDirection: 'row', flexGrow: 1, justifyContent: 'end', marginTop: 2,
        }}
        >
          <Button
            type="button"
            size="small"
            sx={{
              marginTop: 3,
              color: 'black',
              borderRadius: 1,
              bgcolor: 'whitesmoke',
              textTransform: 'none',
              width: '20%',
              height: '20%',
              marginY: 'auto',
              marginRight: 4,
              '@media (max-width: 800px)': { fontSize: '12px' },
              '@media (max-width: 500px)': { fontSize: '10px' },
            }}
            onClick={() => { handleClose(); }}
          >
            {' '}
            Cancel
          </Button>
          <Button
            type="button"
            size="small"
            sx={{
              marginTop: 3,
              color: 'white',
              borderRadius: 1,
              bgcolor: '#0f172a',
              textTransform: 'none',
              width: '20%',
              height: '20%',
              marginY: 'auto',
              '@media (max-width: 800px)': { fontSize: '12px' },
              '@media (max-width: 500px)': { fontSize: '10px' },
            }}
            onClick={() => { submitHandler(); }}
          >
            {' '}
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ProfilePictureModal;
