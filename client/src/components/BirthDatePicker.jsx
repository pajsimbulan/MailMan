import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Birthdatepicker({editProp, valid, invalid, oldValue}) {
  const [value, setValue] = React.useState(new Date(oldValue));
  const [edit, setEdit] = React.useState(editProp);
  React.useEffect(()=>{setEdit(editProp)},[editProp]);
  
  
  if( (value!=null) && (edit) ) {
        let today = new Date();
        let localDate = today.toLocaleDateString();
        let localDateTimestamp = Date.parse(localDate);
        let localDateObject = new Date(localDateTimestamp);
        if(value <= localDateObject) {
            valid();
        }
        else {
            invalid();
        }
    }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disabled={!edit}
        label="mm/dd/yyyy"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField sx={{marginTop:1}} {...params}  />
        )}
      />
    </LocalizationProvider>
  );
}
