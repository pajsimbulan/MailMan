import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    colors: {
      bg_default:'#FFFFFF',
      color2:'#F1F5F9',
      text: '#334155',
      button: '#0F172A'
    }
  },
});

export default function GenderRadioButtons({gender, editProp}) {
  const [value, setValue] = React.useState(gender);
  const [edit, setEdit] = React.useState(editProp);
  console.log(value);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  React.useEffect(()=>{setEdit(editProp)},[editProp]);

  return (
    <ThemeProvider theme={theme}>
      <FormControl sx={{marginY:'auto', marginTop:5}}>
        <FormLabel id="demo-controlled-radio-buttons-group" sx={{fontWeight:'bold', color:'colors.text'}}>Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel disabled={edit?false:true} value="Female" control={<Radio />} label="Female" />
          <FormControlLabel disabled={edit?false:true} value="Male" control={<Radio />} label="Male" />
          <FormControlLabel disabled={edit?false:true} value="Other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
    </ThemeProvider>
  );
}
