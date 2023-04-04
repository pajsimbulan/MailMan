import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useMediaQuery } from '@mui/material';

export default function GenderRadioButtons({ oldValue, editProp, setGender }) {
  const [value, setValue] = React.useState(oldValue);
  const [edit, setEdit] = React.useState(editProp);
  const isSmallScreen = useMediaQuery('(max-width:800px)');

  const handleChange = (event) => {
    setValue(event.target.value);
    setGender(event.target.value);
  };

  React.useEffect(() => { setEdit(editProp); }, [editProp]);

  return (
    <FormControl sx={{ marginY: 'auto', marginTop: 5 }}>
      <FormLabel
        id="demo-controlled-radio-buttons-group"
        sx={{
          fontWeight: 'bold',
          color: '#334155',
          '@media (max-width: 800px)': { fontSize: '13px' },
          '@media (max-width: 500px)': { fontSize: '11px' },
        }}
      >
        Gender
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          disabled={!edit}
          value="Female"
          control={<Radio size={isSmallScreen ? 'small' : 'medium'} />}
          label="Female"
          sx={{ '& .MuiTypography-root': { fontSize: isSmallScreen ? '10px' : 'initial' } }}
        />
        <FormControlLabel
          disabled={!edit}
          value="Male"
          control={<Radio size={isSmallScreen ? 'small' : 'medium'} />}
          label="Male"
          sx={{ '& .MuiTypography-root': { fontSize: isSmallScreen ? '10px' : 'initial' } }}
        />
        <FormControlLabel
          disabled={!edit}
          value="Other"
          control={<Radio size={isSmallScreen ? 'small' : 'medium'} />}
          label="Other"
          sx={{ '& .MuiTypography-root': { fontSize: isSmallScreen ? '10px' : 'initial' } }}
        />
      </RadioGroup>
    </FormControl>
  );
}
