import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

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
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
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
        <Typography variant="caption" sx={{'m':2}}>{name}</Typography>
      </Popover>
    </IconButton>
  );
}