import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Divider } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Birthdatepicker from '../components/BirthDatePicker';


function BirthDateRow({birthDate, update}) {
    const [edit,setEdit] = useState(false);
    const [invalidBirthDate, setInvalidBirthDate] = useState(false);
    const [value, setValue] = useState(birthDate);
  
    const updateBirthDate = () => {
      setEdit(!edit)
      if( (birthDate !== value) && 
          (!invalidBirthDate) &&
          (edit)) {
        update(value);
      }
    };
  
    return(
    <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', marginTop:1}}>
      <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'column'}}>
      <Birthdatepicker 
        editProp={edit} 
        valid={()=>{setInvalidBirthDate(false)}} 
        invalid={()=>{setInvalidBirthDate(true)}}
        oldValue={birthDate}
        setBirthDate={(newValue) => {setValue(newValue)}}
        />
      {invalidBirthDate? <Typography sx={{fonweight:'light', fontSize:15, color:'red'}}>*Invalid Birthdate*</Typography>:<></>}
      </Box>
      <Button type="button" disabled={invalidBirthDate} 
      sx={{marginTop:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:'20%', height:'20%',marginY:'auto' }}
      onClick={() => {updateBirthDate()}}
      >{edit?"Save Changes": "Edit"} </Button>
    </Box>
  )
}

export default BirthDateRow;