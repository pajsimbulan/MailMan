import * as React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import PropTypes from 'prop-types';
import GenderRadioButtons from '../components/GenderRadioButton';

function GenderRow({ gender, update }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(gender);

  const updateGender = () => {
    setEdit(!edit);
    if ((gender !== value) && (edit)) {
      update(value);
    }
  };

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    }}
    >
      <GenderRadioButtons
        oldValue={gender}
        editProp={edit}
        setGender={(newValue) => { setValue(newValue); }}
      />
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
        onClick={() => { updateGender(); }}
      >
        {' '}
        {edit ? 'Save' : 'Edit'}
        {' '}
      </Button>
    </Box>
  );
}

GenderRow.propTypes = {
  gender: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};

export default GenderRow;
