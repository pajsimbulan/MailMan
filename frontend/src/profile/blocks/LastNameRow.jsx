import * as React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import PropTypes from 'prop-types';
import LastNameModal from '../components/EditLastNameModal';

function LastNameRow({ lastName, update }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(lastName);

  const updateLastName = (newLastName) => {
    if (newLastName !== value) {
      setValue(newLastName);
      update(newLastName);
    }
  };

  return (
    <Box sx={{
      width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
    }}
    >
      <Box sx={{ marginY: 'auto' }}>
        <LastNameModal
          edit={edit}
          closeModal={() => { setEdit(false); }}
          oldValue={lastName}
          setLastName={(newLastName) => { updateLastName(newLastName); }}
        />
        <Typography sx={{
          fontWeight: 'light',
          color: '#334155',
          '@media (max-width: 800px)': { fontSize: '12px' },
          '@media (max-width: 500px)': { fontSize: '10px' },
        }}
        >
          {value}
        </Typography>
      </Box>
      <Button
        type="button"
        size="small"
        sx={{
          my: 'auto',
          color: 'white',
          borderRadius: 10,
          bgcolor: '#338feb',
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

LastNameRow.propTypes = {
  lastName: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};

export default LastNameRow;
