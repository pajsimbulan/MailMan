import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Avatar, Divider, Box } from '@mui/material';
import PropTypes from 'prop-types';
import parseDate from '../../utils/DateParser';
import formatDate from '../../utils/DateFormat';
import { intArrayToBase64String } from '../../utils/DatatoBinary64';
import FileChip from '../components/FileChip';
import getFileType from '../../utils/FileType';

function EmailReplyBlock({ fromFirstName, fromEmail, replyEmailContents, replyFiles, replyPhotos}) {

  const downloadFile = (name, data) => {
    console.log(`downloadFile called with name: ${name} and data: ${intArrayToBase64String(data)}`);
    const base64String = intArrayToBase64String(data.data);
    const dataUrl = `data:application/octet-stream;base64,${base64String}`;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = name;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  
  return (
    <Box sx={{ width: '100%' }}>
      <Divider sx={{ my: 2 }} />
      <Box
        component="form"
        sx={{
          bgcolor: '#ECEFF1',
          mx: 5,
          p: 2,
          borderRadius: 5,
          '@media (max-width: 500px)': { mx: 3 },
          overflow: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{
            display: 'flex', flexDirection: 'row', gap: 1, mr: 1,
          }}
          >
            <Avatar sx={{ my: 'auto' }} />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              my: 'auto',
              '@media (max-width: 500px)': { whiteSpace: 'none', overflow: 'auto' },
            }}
            >
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                {fromFirstName}
              </Typography>
              <Typography sx={{ fontSize: '10px' }}>
                {`<${fromEmail}>`}
              </Typography>
            </Box>
          </Box>
          <Typography sx={{
            my: 'auto', color: '#8e8080', fontSize: '13px', '@media (max-width: 1000px)': { fontSize: '10px' },
          }}
          >
            { `${formatDate(new Date())} (${parseDate(new Date())})`}
          </Typography>
        </Box>
        <Typography sx={{ '@media (max-width: 1000px)': { fontSize: '12px' }, '@media (max-width: 800px)': { fontSize: '10px' }, wordWrap: 'break-word' }}>
          {replyEmailContents}
        </Typography>
        {replyPhotos.length > 0 ? (
              replyPhotos.map((photo) => (
                <Box sx={{ maxWidth: '100%', overflow: 'auto', padding: '20px' }}>
                  <img src={`data:image/jpeg;base64,${intArrayToBase64String(photo.data.data)}`} style={{ maxWidth: '100%' }} />
                </Box>
              ))
            ) : null}
            {replyFiles.length > 0
              ? (
                <FileChip
                  files={replyFiles.map((file) => ({ name: file.name, type: getFileType(file.name) }))}
                  onClick={(index) => { downloadFile(replyFiles[index].name, replyFiles[index].data); }}
                  onDelete={() => {}}
                />
              ) : null}
      </Box>
    </Box>
  );
}

EmailReplyBlock.propTypes = {
  contents: PropTypes.string.isRequired,
};

export default EmailReplyBlock;
