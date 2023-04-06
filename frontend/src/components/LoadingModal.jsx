import React from 'react';
import { Modal, Box, CircularProgress, Typography } from '@mui/material';

function LoadingModal({ open }) {
  return (
    <Modal
      open={open}
      aria-labelledby="loading-modal-title"
      aria-describedby="loading-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 10,
          bgcolor: 'background.paper',
          border: 'solid',
          borderWidth: '16px',
          borderColor: '#deedfd',
          boxShadow: 10,
          p: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <CircularProgress />
        <Box mt={2}>
          <Typography>
          Loading, please wait...
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}

export default LoadingModal;
