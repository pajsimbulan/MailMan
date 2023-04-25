import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Avatar, Divider, Box } from '@mui/material';
import PropTypes from 'prop-types';
import parseDate from '../../utils/DateParser';
import formatDate from '../../utils/DateFormat';
import { intArrayToBase64String } from '../../utils/DatatoBinary64';
import FileChip from '../components/FileChip';
import getFileType from '../../utils/FileType';
import { UserContext } from '../../App';

function EmailReplyBlock({ reply}) {
  const user = React.useContext(UserContext);

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
            <Avatar src={reply.from && reply.from.avatar? `data:image/jpeg;base64,${intArrayToBase64String(reply.from.avatar.data)}`: null } sx={{ my: 'auto' }} />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              my: 'auto',
              '@media (max-width: 500px)': { whiteSpace: 'none', overflow: 'auto' },
            }}
            >
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                {reply.from.firstName}
              </Typography>
              <Typography sx={{ fontSize: '10px' }}>
                {`<${reply.from.email}>`}
              </Typography>
            </Box>
          </Box>
          <Typography sx={{
            my: 'auto', color: '#8e8080', fontSize: '13px', '@media (max-width: 1000px)': { fontSize: '10px' },
          }}
          >
            { `${formatDate(reply.createdAt)}` + ' ' + isWithinYesterday(reply.createdAt)}
          </Typography>
        </Box>
        <Typography sx={{ '@media (max-width: 1000px)': { fontSize: '12px' }, '@media (max-width: 800px)': { fontSize: '10px' }, wordWrap: 'break-word' }}>
          {reply.contents}
        </Typography>
        {reply.photos.length > 0 ? (
              reply.photos.map((photo) => (
                <Box sx={{ maxWidth: '100%', overflow: 'auto', padding: '20px' }}>
                  <img src={`data:image/jpeg;base64,${intArrayToBase64String(photo.data.data)}`} style={{ maxWidth: '100%' }} />
                </Box>
              ))
            ) : null}
            {reply.files.length > 0
              ? (
                <FileChip
                  files={reply.files.map((file) => ({ name: file.name, type: getFileType(file.name) }))}
                  onClick={(index) => { downloadFile(reply.files[index].name, reply.files[index].data); }}
                  deleteable={false}
                />
              ) : null}
      </Box>
    </Box>
  );
}

const isWithinYesterday = (date) => {
  if(parseDate(date) === 'Today') return '(Today)';
  if(parseDate(date) === 'Yesterday') return '(Yesterday)';
  return '';
}

EmailReplyBlock.propTypes = {
  contents: PropTypes.string.isRequired,
};

export default EmailReplyBlock;
