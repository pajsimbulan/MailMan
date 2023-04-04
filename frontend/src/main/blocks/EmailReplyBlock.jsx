import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Avatar, Divider, Box } from '@mui/material';
import PropTypes from 'prop-types';
import parseDate from '../../utils/DateParser';
import formatDate from '../../utils/DateFormat';

function EmailReplyBlock({ contents }) {
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
            <Typography sx={{ fontWeight: 'bold', my: 'auto', '@media (max-width: 1000px)': { fontSize: '12px' } }}>
              You
            </Typography>
          </Box>
          <Typography sx={{
            my: 'auto', color: '#8e8080', fontSize: '13px', '@media (max-width: 1000px)': { fontSize: '10px' },
          }}
          >
            { `${formatDate(new Date())} (${parseDate(new Date())})`}
          </Typography>
        </Box>
        <Typography sx={{ '@media (max-width: 1000px)': { fontSize: '12px' }, '@media (max-width: 800px)': { fontSize: '10px' }, wordWrap: 'break-word' }}>
          {contents}
        </Typography>
      </Box>
    </Box>
  );
}

EmailReplyBlock.propTypes = {
  contents: PropTypes.string.isRequired,
};

export default EmailReplyBlock;
