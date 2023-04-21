import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';

function EmailPopOvers({ item, name, onClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <IconButton
      sx={{
        height: 25,
        width: 25,
        mx: 0.5,
      }}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      onClick={onClick}
    >

      {item()}
      <Popover
        PaperProps={{
          style: {
            backgroundColor: '#1e1e1e',
            borderRadius: 10,
            p: 5,
          },
        }}
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
          p: 4,
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
        <Typography variant="caption" sx={{ m: 2, color: 'white' }}>{name}</Typography>
      </Popover>
    </IconButton>
  );
}

EmailPopOvers.propTypes = {
  item: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EmailPopOvers;
