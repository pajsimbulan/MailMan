import * as React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import PasswordModal from '../components/EditPasswordModal';

function PasswordRow({ update }) {
  const [edit, setEdit] = useState(false);

  return (
    <Box sx={{
      width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
    }}
    >
      <Box sx={{ marginY: 'auto' }}>
        <PasswordModal
          edit={edit}
          closeModal={() => { setEdit(false); }}
          updatePassword={(newPassword) => { update(newPassword); }}
        />
        <Typography
          Typography
          sx={{
            fontWeight: 'light',
            color: '#334155',
            marginY: 'auto',
            '@media (max-width: 800px)': { fontSize: '12px' },
            '@media (max-width: 500px)': { fontSize: '10px' },
          }}
        >
          *********
        </Typography>
      </Box>
      <Button
        type="button"
        size="small"
        sx={{
          my: 'auto',
          color: 'white',
          borderRadius: 10,
          bgcolor: 'colors.button',
          textTransform: 'none',
          marginY: 'auto',
          '@media (max-width: 800px)': { fontSize: '12px' },
          '@media (max-width: 500px)': { fontSize: '10px' },
        }}
        onClick={() => { setEdit(true); }}
      >
        {' '}
        Edit
      </Button>
    </Box>
  );
}

export default PasswordRow;
