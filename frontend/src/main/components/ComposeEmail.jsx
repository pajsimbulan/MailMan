/* global document */
/* global FileReader */
/* global alert */
import * as React from 'react';
import {
  Avatar, Divider, useMediaQuery,
  Zoom, Box, Button, TextField, Dialog, IconButton, Typography, CircularProgress, Skeleton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import PropTypes from 'prop-types';
import { UserContext } from '../../App';
import FileChip from './FileChip';
import { arrayBufferToBase64, intArrayToBase64String } from '../../utils/DatatoBinary64';
import getFileType from '../../utils/FileType';
import useDraft from '../../hooks/useDraft';
import useEmail from '../../hooks/useEmail';

const MAX_FILE_SIZE = 13000000;

function ComposeEmail({ openComposeEmail, closeComposeEmail, draftId = '' }) {
  const isLessThan800 = useMediaQuery('(max-width:800px)');
  const isLessThan1000 = useMediaQuery('(max-width:1000px)');
  const user = React.useContext(UserContext);
  const [open, setOpen] = React.useState(openComposeEmail);
  const [toValue, setToValue] = React.useState('');
  const [subjectValue, setSubjectValue] = React.useState('');
  const [contentsValue, setContentsValue] = React.useState('');
  const [binaryFiles, setBinaryFiles] = React.useState([]);
  const [binaryPhotos, setBinaryPhotos] = React.useState([]);
  const [exit, setExit] = React.useState(false);

  const {
    createDraft,
    updateDraft,
    postDraft,
    getDraft,
    loading,
    draft: fetchedDraft,
    statusCode: statusCodeDraft,
    errorMessage: errorMessageDraft,
  } = useDraft();
  const {
    sendEmail,
    statusCode: statusCodeEmail,
    errorMessage: errorMessageEmail,
  } = useEmail();

  React.useEffect(() => {
    if (fetchedDraft != null) {
      setToValue(fetchedDraft.to);
      setSubjectValue(fetchedDraft.subject);
      setContentsValue(fetchedDraft.contents);
      if (binaryFiles.length <= 0) {
        setBinaryFiles(fetchedDraft.files.map((file) => { if (file && file.data) { return { name: file.name, data: intArrayToBase64String(file.data.data), type: getFileType(file.name) }; } }));
      }
      if (binaryPhotos.length <= 0) {
        setBinaryPhotos(fetchedDraft.photos.map((file) => { if (file && file.data) { return { name: file.name, data: intArrayToBase64String(file.data.data), type: getFileType(file.name) }; } }));
      }
    }
  }, [fetchedDraft]);

  React.useEffect(() => {
    setOpen(openComposeEmail);
    getDraft(draftId, user.accessToken);
  }, [openComposeEmail, draftId]);

  const submitSend = async () => {
    //console.log(`submitSend: ${toValue} ${subjectValue} ${contentsValue} ${binaryFiles} ${binaryPhotos}`);
    if (toValue !== '' && subjectValue !== '' && (contentsValue !== '' || binaryFiles.length !== 0 || binaryPhotos.length !== 0) ) {
      if (draftId !== '' && fetchedDraft !== null) {
        await postDraft(
          user.userInfo._id,
          draftId,
          user.userInfo.email,
          user.userInfo.firstName,
          toValue,
          subjectValue,
          contentsValue,
          binaryFiles,
          binaryPhotos,
          user.accessToken,
        );
      } else {
        //console.log(`submitSend22: ${toValue} ${subjectValue} ${contentsValue} ${binaryFiles} ${binaryPhotos}`);
        await sendEmail(
          user.userInfo._id,
          user.userInfo.email,
          user.userInfo.firstName,
          toValue,
          subjectValue,
          contentsValue,
          binaryFiles,
          binaryPhotos,
          user.accessToken,
        );
      }
      setExit(true);
    } else {
      setOpen(false);
      closeComposeEmail('none', 'No changes made');
    }
  };

  React.useEffect(() => {
    if (!exit) {
      return;
    }
    if (statusCodeEmail >= 400) {
      setOpen(false);
      closeComposeEmail('fail', errorMessageEmail);
    }
    if (statusCodeEmail >= 200 && statusCodeEmail < 400) {
      setOpen(false);
      closeComposeEmail('success', 'Email sent');
    }
  }, [statusCodeEmail, errorMessageEmail]);

  const handleClose = async () => {
    if (toValue !== '' || subjectValue !== '' || contentsValue !== '' || binaryFiles.length !== 0) {
      if (draftId !== '' && fetchedDraft !== null) {
        await updateDraft(draftId, toValue, subjectValue, contentsValue, binaryFiles, binaryPhotos, user.accessToken);
      } else {
        await createDraft(user.userInfo._id, toValue, subjectValue, contentsValue, binaryFiles, binaryPhotos, user.accessToken);
      }
      setExit(true);
    } else {
      setOpen(false);
      closeComposeEmail('none', 'No changes made');
    }
  };

  React.useEffect(() => {
    if (!exit) {
      return;
    }
    if (statusCodeDraft >= 400) {
      setOpen(false);
      closeComposeEmail('fail', errorMessageDraft);
    }
    if (statusCodeDraft >= 200 && statusCodeDraft < 400) {
      setOpen(false);
      closeComposeEmail('success', 'Draft saved');
    }
  });

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
    <Box>
      <Dialog
        TransitionComponent={Zoom}
        transitionDuration={1000}
        PaperProps={{
          style: {
            minHeight: '80%',
            maxHeight: '80%',
            minWidth: '90%',
            maxWidth: '90%',
            border: 'solid',
            borderWidth: 5,
            borderRadius: 10,
            borderColor: '#edf4fb',

          },
        }}
        open={open}
        onClose={() => {
          handleClose();
        }}

      >
        <Box sx={{
          display: 'flex', flexDirection: 'row', flexWrap: 'wrap', p: 1, bgcolor: '#eceff1',
        }}
        >
          <Box sx={{ width: '33.33%', display: 'flex', flexDirection: 'row' }}>
            <Avatar
              sx={{
                mr: 1, height: 40, width: 40, my: 'auto',
              }}
              src={user.userInfo.avatar ? `data:image/jpeg;base64,${user.userInfo.avatar}` : null}
            />
            <Box sx={{
              display: 'flex', flexDirection: 'column', my: 'auto', overflow: 'auto', py: 1, pr: 1,
            }}
            >
              <Typography sx={{
                fontSize: '14px',
                fontWeight: 'bold',
                '@media (max-width: 800px)': { fontSize: '12px' },
              }}
              >
                {user.userInfo.firstName}
              </Typography>
              <Typography sx={{
                fontSize: '12px',
                '@media (max-width: 800px)': { fontSize: '10px' },
              }}
              >
                {`<${user.userInfo.email}>`}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: '33.33%', display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{
              fontWeight: 'bold', my: 'auto', '@media (max-width: 800px)': { fontSize: '12px' }, '@media (max-width: 500px)': { fontSize: '10px' }, textAlign: 'center',
            }}
            >
              New Email
            </Typography>
          </Box>
          <Box sx={{ width: '33.33%', display: 'flex', justifyContent: 'end' }}>
            <IconButton
              sx={{
                height: 25, width: 25, '@media (max-width: 800px)': { height: 20, width: 20 }, position: 'fixed',
              }}
              edge="start"
              color="inherit"
              onClick={() => {
                handleClose();
              }}
              aria-label="close"
            >
              <CloseIcon sx={{
                color: '#002159', height: 25, width: 25, '@media (max-width: 800px)': { height: 20, width: 20 },
              }}
              />
            </IconButton>
          </Box>
        </Box>
        <Box component="form" onSubmit={submitSend} noValidate sx={{ width: '100%' }}>
          {/** Text Fields */}
          <Box sx={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            mx: 5,
            px: 2,
            py: 2,
            borderRadius: 5,
            gap: 1,
            '@media (max-width: 500px)': { mx: 1, px: 0, py: 1 },
          }}
          >
            <Box sx={{
              display: 'flex', flexGrow: 1, flexDirection: 'row', bgcolor: '#ECEFF1', borderRadius: 5, p: 2,
            }}
            >
              <Typography sx={{
                my: 'auto',
                mx: 1,
                width: 60,
                color: 'grey',
                fontSize: 14,
                '@media (max-width: 800px)': { fontSize: '12px' },
                '@media (max-width: 500px)': { fontSize: '10px' },
              }}
              >
                To:
              </Typography>
              {draftId && loading ? <Skeleton animation="wave" />
                : (
                  <TextField
                    name="to"
                    id="to"
                    fullWidth
                    value={toValue}
                    onChange={(event) => {
                      setToValue(event.target.value);
                    }}
                    inputProps={{
                      style: { fontSize: isLessThan800 ? '10px' : (isLessThan1000 ? '12px' : '14px') },
                    }}
                    sx={{ '& fieldset': { border: 'none' } }}
                  />
                ) }
            </Box>
            <Divider />
            <Box sx={{
              display: 'flex', flexGrow: 1, flexDirection: 'row', bgcolor: '#ECEFF1', borderRadius: 5, p: 2,
            }}
            >
              <Typography sx={{
                my: 'auto',
                mx: 1,
                width: 60,
                color: 'grey',
                fontSize: 14,
                '@media (max-width: 800px)': { fontSize: '12px' },
                '@media (max-width: 500px)': { fontSize: '10px' },
              }}
              >
                Subject:
              </Typography>
              {draftId && loading ? <Skeleton animation="wave" /> : (
                <TextField
                  inputProps={{
                    style: { fontSize: isLessThan800 ? '10px' : (isLessThan1000 ? '12px' : '14px') },
                  }}
                  name="subject"
                  id="subject"
                  fullWidth
                  value={subjectValue}
                  onChange={(event) => {
                    setSubjectValue(event.target.value);
                  }}
                  sx={{ '& fieldset': { border: 'none' } }}
                />
              )}
            </Box>
            <Divider />
            <Box sx={{
              display: 'flex', flexGrow: 1, flexDirection: 'column', bgcolor: '#ECEFF1', borderRadius: 5, p: 2, overflow: 'auto',
            }}
            >
              {' '}
              {draftId && loading ? <CircularProgress sx={{ alignSelf: 'center' }} />
                : (
                  <TextField
                    inputProps={{
                      style: { fontSize: isLessThan800 ? '10px' : (isLessThan1000 ? '12px' : '14px') },
                    }}
                    name="contents"
                    id="contents"
                    value={contentsValue}
                    onChange={(event) => {
                      setContentsValue(event.target.value);
                    }}
                    fullWidth
                    multiline
                    rows={12}
                    sx={{ '& fieldset': { border: 'none' } }}
                  />
                ) }
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
              display: 'flex', flexGrow: 1, justifyContent: 'space-between', my: 1, '@media (max-width: 300px)': { flexDirection: 'column' },
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

              <Box sx={{
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1, '@media (max-width: 500px)': { flexDirection: 'column' }, m: 1,
              }}
              >
                <Button
                  component="button"
                  variant="outlined"
                  size="small"
                  onClick={() => { closeComposeEmail('none', 'No changes made'); }}
                  startIcon={<DeleteOutlineIcon />}
                  sx={{
                    border: 'solid', borderRadius: 4, borderWidth: 2, textTransform: 'none', color: '#002159', '&:hover': { borderColor: '#002159' },
                  }}
                >
                  Discard
                </Button>
                <Button
                  component="button"
                  variant="outlined"
                  size="small"
                  onClick={submitSend}
                  endIcon={<SendOutlinedIcon />}
                  sx={{
                    border: 'solid', borderRadius: 4, borderWidth: 2, textTransform: 'none', color: '#338feb',
                  }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
          {/** END Text Fields */}
        </Box>
      </Dialog>
    </Box>
  );
}

ComposeEmail.propTypes = {
  openComposeEmail: PropTypes.bool.isRequired,
  closeComposeEmail: PropTypes.func.isRequired,
};

export default ComposeEmail;
