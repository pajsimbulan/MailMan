import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Divider } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Birthdatepicker from '../components/BirthDatePicker';

function BirthDateRow({ birthDate, update }) {
  const theme = useTheme();
  const [edit, setEdit] = useState(false);
  const [invalidBirthDate, setInvalidBirthDate] = useState(false);
  const [value, setValue] = useState(birthDate);

  const updateBirthDate = () => {
    setEdit(!edit);
    if ((birthDate !== value)
          && (!invalidBirthDate)
          && (edit)) {
      update(value);
    }
  };

  return (
    <Box sx={{
      width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 1, flexWrap: 'wrap', alignContent: 'center',
    }}
    >
      <Box sx={{
        display: 'flex', justifyContent: 'space-between', flexDirection: 'column', mb: 2,
      }}
      >
        <Birthdatepicker
          editProp={edit}
          valid={() => { setInvalidBirthDate(false); }}
          invalid={() => { setInvalidBirthDate(true); }}
          oldValue={birthDate}
          setBirthDate={(newValue) => { setValue(newValue); }}
        />
        {invalidBirthDate ? (
          <Typography sx={{
            fonweight: 'light',
            fontSize: 15,
            color: 'red',
            '@media (max-width: 800px)': { fontSize: '12px' },
            '@media (max-width: 500px)': { fontSize: '10px' },
          }}
          >
            *Invalid Birthdate*
          </Typography>
        ) : null}
      </Box>
      <Button
        type="button"
        disabled={invalidBirthDate}
        size="small"
        sx={{
          my: 'auto',
          bgcolor: 'grey',
          color: 'white',
          borderRadius: 10,
          bgcolor: 'colors.button',
          textTransform: 'none',
          marginY: 'auto',
          '@media (max-width: 800px)': { fontSize: '12px' },
          '@media (max-width: 500px)': { fontSize: '10px' },
        }}
        onClick={() => { updateBirthDate(); }}
      >
        {edit ? 'Save Changes' : 'Edit'}
        {' '}

      </Button>
    </Box>
  );
}

export default BirthDateRow;
