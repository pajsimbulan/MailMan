import * as React from 'react';
import { Box, Chip, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function FileChip({fileNames, onClick, onDelete}) {

  return (
    <Box sx={{display:'flex', flexDirection:'row',flexWrap: 'wrap', p:1, }}>
        {fileNames.map((file,index) => (
        <Chip
            label={file}
            deleteIcon={<CloseIcon sx={{width:15, '&:hover': { color:'red'}}}/>}
            onClick={() => onClick(index)}
            onDelete={() => onDelete(index)}
            
            sx={{bgcolor:'transparent', color:'grey',boxShadow:'1', fontSize:10, m:0.5}}
        />))}
    </Box>
  );
}

export default FileChip;