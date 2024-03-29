import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';

function Birthdatepicker({
  editProp, valid, invalid, oldValue, setBirthDate,
}) {
  const [value, setValue] = React.useState(new Date(oldValue));
  const [edit, setEdit] = React.useState(editProp);
  React.useEffect(() => { setEdit(editProp); }, [editProp]);

  if ((value != null) && (edit)) {
    const today = new Date();
    const localDate = today.toLocaleDateString();
    const localDateTimestamp = Date.parse(localDate);
    const localDateObject = new Date(localDateTimestamp);
    setBirthDate(value);
    if (value <= localDateObject) {
      valid();
    } else {
      invalid();
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slotProp={<TextField size="small" />}
        disabled={!edit}
        label="mm/dd/yyyy"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField sx={{ marginTop: 1 }} {...params} />
        )}
      />
    </LocalizationProvider>
  );
}

Birthdatepicker.propTypes = {
  editProp: PropTypes.bool.isRequired,
  valid: PropTypes.func.isRequired,
  invalid: PropTypes.func.isRequired,
  oldValue: PropTypes.string.isRequired,
  setBirthDate: PropTypes.func.isRequired,
};

export default Birthdatepicker;
