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
        <PasswordModal edit={edit} closeModal={() => { setEdit(false); }} updatePassword={(newPassword) => { update(newPassword); }} />
        <Typography Typography sx={{ fontWeight: 'light', color: 'colors.text', marginY: 'auto' }}>*********</Typography>
      </Box>
      <Button
        type="button"
        size="small"
        sx={{
          marginTop: 3, bgcolor: 'grey', color: 'white', borderRadius: 10, bgcolor: 'colors.button', textTransform: 'none', marginY: 'auto',
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
