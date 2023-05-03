import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar, Divider, TextField, useMediaQuery,
  Box, Button, IconButton, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import CircularProgress from '@mui/material/CircularProgress';
import { UserContext } from '../../App';
import { arrayBufferToBase64 } from '../../utils/DatatoBinary64';
import FileChip from '../components/FileChip';
import useEmail from '../../hooks/useEmail';

const iconButtonStyling = { height: 25, width: 25, '@media (max-width: 800px)': { height: 20, width: 20 } };
const MAX_FILE_SIZE = 13000000;

function EmailReplying({ emailId, submitReply, exitReply }) {
  const isLessThan800 = useMediaQuery('(max-width:800px)');
  const isLessThan1000 = useMediaQuery('(max-width:1000px)');
  const user = React.useContext(UserContext);
  const [value, setValue] = React.useState();
  const [binaryFiles, setBinaryFiles] = React.useState([]);
  const [binaryPhotos, setBinaryPhotos] = React.useState([]);
  const { replyEmail, loading, statusCode } = useEmail();

  const downloadFile = (file) => {
    const dataUrl = `data:application/octet-stream;base64,${file.data}`;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = file.name;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onSubmit = async () => {
    /**
     * userEmail,
    userFirstName,
    originalEmailId,
    contents,
    files,
    photos,
    accessToken,
     */
    //console.log('value: ', value);
    await replyEmail(user.userInfo.email, user.userInfo.firstName, emailId, value, binaryFiles, binaryPhotos, user.accessToken);
    //console.log('finish reply email');
    //console.log('value after: ', value);
    submitReply(value);
  };

  const handleFileChange = async (event) => {
    const { files } = event.target;

    const readFile = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const base64Data = arrayBufferToBase64(arrayBuffer);
        resolve({ name: file.name, data: base64Data, type: file.type });
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

    setBinaryFiles([...binaryFiles, ...tempFiles]);
  };

  const handlePhotosChange = async (event) => {
    const { files } = event.target;

    const readFile = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const base64Data = arrayBufferToBase64(arrayBuffer);
        resolve({ name: file.name, data: base64Data, type: file.type });
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

    setBinaryPhotos([...binaryPhotos, ...tempFiles]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Divider sx={{ my: 2 }} />
      <Box
        component="form"
        onSubmit={() => { onSubmit(); }}
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          bgcolor: '#ECEFF1',
          mx: 5,
          p: 2,
          borderRadius: 5,
          '@media (max-width: 500px)': { mx: 3 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <Avatar src={user.userInfo.avatar ? `data:image/jpeg;base64,${user.userInfo.avatar}` : null} />
            <Typography sx={{ fontWeight: 'bold', my: 'auto', '@media (max-width: 1000px)': { fontSize: '12px' } }}>
              You
            </Typography>
          </Box>
          <IconButton sx={iconButtonStyling} onClick={() => { exitReply(); }}>
            <CloseIcon sx={iconButtonStyling} />
          </IconButton>
        </Box>
        {loading ? <CircularProgress /> : (
          <TextField
            multiline
            onChange={(event) => { setValue(event.target.value); }}
            inputProps={{
              style: { fontSize: isLessThan800 ? '10px' : (isLessThan1000 ? '12px' : '14px') },
            }}
            autoFocus
            sx={{ '& fieldset': { border: 'none' } }}
          />
        )}
        {binaryPhotos.length <= 0 ? null : (
          binaryPhotos.map((photo, index) => (
            <Box sx={{ maxWidth: '100%', overflow: 'auto', padding: '20px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <IconButton
                  sx={{
                    height: 20, width: 20, '@media (max-width: 800px)': { height: 15, width: 15 }, position: 'relative', right: 0, bottom: 0,
                  }}
                  edge="start"
                  color="inherit"
                  onClick={() => {
                    setBinaryPhotos((files) => {
                      const toRemove = files[index].name;
                      const newFiles = files.filter((files) => files.name !== toRemove);
                      return newFiles;
                    });
                  }}
                  aria-label="close"
                >
                  <CloseIcon sx={{
                    color: 'grey', height: 20, width: 20, '@media (max-width: 800px)': { height: 15, width: 15 },
                  }}
                  />
                </IconButton>
              </Box>
              <img src={`data:image/jpeg;base64,${photo.data}`} style={{ maxWidth: '100%' }} />
            </Box>
          ))
        )}
        {binaryFiles.length > 0
          ? (
            <FileChip
              files={binaryFiles.map((file) => ({ name: file.name, type: file.type }))}
              fileType={binaryFiles.map((file) => file.type)}
              fileNames={binaryFiles.map((file) => file.name)}
              onClick={(index) => { downloadFile(binaryFiles[index]); }}
              onDelete={(index) => {
                setBinaryFiles((files) => {
                  const toRemove = files[index].name;
                  const newFiles = files.filter((files) => files.name !== toRemove);
                  return newFiles;
                });
              }}
            />
          ) : null}
      </Box>
      <Box sx={{
        display: 'flex', justifyContent: 'space-between', my: 1, mx: 5,
      }}
      >
        <Box sx={{
          display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1, '@media (max-width: 500px)': { flexDirection: 'column' }, m: 1,
        }}
        >
          <Button
            component="label"
            size="small"
            variant="outlined"
            endIcon={<AttachFileIcon />}
            sx={{
              border: 'solid', borderRadius: 4, borderWidth: 2, textTransform: 'none', color: '#2e7d32', '&:hover': { borderColor: '#2e7d32' },
            }}
          >
            Attach File
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              multiple
            />
          </Button>
          <Button
            component="label"
            size="small"
            variant="outlined"
            endIcon={<ImageIcon />}
            sx={{
              border: 'solid', borderRadius: 4, borderWidth: 2, textTransform: 'none', color: '#002159', '&:hover': { borderColor: '#002159' },
            }}
          >
            Insert Photo
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={handlePhotosChange}
              style={{ display: 'none' }}
              multiple
            />
          </Button>
        </Box>
        <Box>
          <Button
            size={isLessThan800 ? 'small' : 'medium'}
            type="submit"
            variant="contained"
            onClick={() => { onSubmit(); }}
            sx={{
              border: 'solid', borderRadius: 4, borderWidth: 0, textTransform: 'none',
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

EmailReplying.propTypes = {
  submitReply: PropTypes.func.isRequired,
  exitReply: PropTypes.func.isRequired,
};

export default EmailReplying;
