import * as React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import GenderRadioButtons from '../components/GenderRadioButton';

function GenderRow({gender, update}) {
    const [edit,setEdit] = useState(false);
    const [value, setValue] = useState(gender);
  
    const updateGender = () => {
      setEdit(!edit)
      if( (gender !== value) && (edit) ) {
        update(value);
      }
    };
  
    return (
    <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
      <GenderRadioButtons oldValue={gender} editProp={edit} setGender={(newValue) => {setValue(newValue)}} />
      <Button type="button" sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }} onClick={()=>{updateGender();}}> {edit?"Save":"Edit"} </Button>
    </Box>);
}

export default GenderRow;