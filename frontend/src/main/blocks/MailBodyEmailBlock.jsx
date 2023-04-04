import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { IconButton, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import hourOfDay from '../../utils/DateHOD';
import parseDate from '../../utils/DateParser';

function EmailBlock({ email, avatarUrl, selected }) {
  const [starred, setStarred] = React.useState(false);

  return (
    <Box
      onClick={() => { selected(email); }}
      sx={{
        width: '100%',
        border: 'solid',
        mt: -0.5,
        borderWidth: 0,
        display: 'flex',
        flexDirection: 'row',
        boxShadow: 2,
        bgcolor: 'white',
        borderRadius: 3,
        py: 1,
        '&:hover': {
          borderWidth: 1, boxShadow: 5, cursor: 'pointer', borderColor: '#338FEB',
        },
      }}
    >
      <Checkbox
        onClick={(event) => { event.stopPropagation(); }}
        onChange={(event) => { event.stopPropagation(); }}
        sx={{
          my: 'auto',
          transform: 'scale(0.8)',
          ml: 1,
          '@media (max-width: 800px)': { transform: 'scale(0.65)', mr: -1 },
        }}
      />
      <IconButton
        sx={{
          height: 25, width: 25, my: 'auto', mr: 0.5, '@media (max-width: 800px)': { height: 20, width: 20 },
        }}
        onClick={(event) => { event.stopPropagation(); setStarred(!starred); console.log('star'); }}
      >
        {starred ? <StarIcon sx={{ height: 25, width: 25, '@media (max-width: 800px)': { height: 20, width: 20 } }} /> : <StarBorderIcon sx={{ height: 25, width: 25, '@media (max-width: 800px)': { height: 20, width: 20 } }} />}
      </IconButton>
      <Avatar alt={email.from} src={avatarUrl} sx={{ my: 'auto', height: 30, width: 30 }} />
      <Box
        component="div"
        sx={{
          display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', m: 1,
        }}
      >
        <Typography sx={{
          fontWeight: 'bold', fontSize: '14px', '@media (max-width: 800px)': { fontSize: '12px' }, '@media (max-width: 500px)': { fontSize: '10px' },
        }}
        >
          {email.subject}
        </Typography>
        <Box sx={{ maxWidth: '100%' }}>
          <Typography sx={{ fontSize: '12px', '@media (max-width: 800px)': { fontSize: '10px' }, '@media (max-width: 500px)': { fontSize: '8px' } }}>
            {email.contents}
          </Typography>
        </Box>
      </Box>
      <Box sx={{
        minWidth: 100, my: 'auto', display: 'flex', justifyContent: 'center', '@media (max-width: 800px)': { fontSize: '10px', minWidth: 75 }, '@media (max-width: 500px)': { fontSize: '8px', minWidth: 50 },
      }}
      >
        <Typography sx={{
          color: 'grey', fontWeight: 'bold', fontSize: '12px', '@media (max-width: 800px)': { fontSize: '10px' }, '@media (max-width: 500px)': { fontSize: '8px' },
        }}
        >
          {parseDate(email.createdAt).toLowerCase() === 'today' ? hourOfDay(email.createdAt) : parseDate(email.createdAt)}
        </Typography>
      </Box>
    </Box>
  );
}

export default EmailBlock;
