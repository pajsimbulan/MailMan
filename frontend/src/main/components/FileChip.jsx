import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function FileChip({fileNames, onClick, onDelete}) {

  return (
    <Stack direction="row" spacing={1}>
        {fileNames.map((file,index) => (
        <Chip
            label={file}
            onClick={() => onClick(index)}
            onDelete={() => onDelete(index)}
        />))}
    </Stack>
  );
}

export default FileChip;