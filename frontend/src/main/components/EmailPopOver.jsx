import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';

export default function EmailPopOvers({item,name}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <IconButton onMouseEnter={handlePopoverOpen}
    onMouseLeave={handlePopoverClose}>
      {item()}
      <Popover
        PaperProps={{
          style:{
            backgroundColor:'#1e1e1e',
            borderRadius:10,
            p:5
          }
        }}
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
          p:4,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography variant="caption" sx={{'m':2, color:'white'}}>{name}</Typography>
      </Popover>
    </IconButton>
  );
}