import React from 'react';
import { Modal, Box, CircularProgress } from '@mui/material';

const LoadingModal = ({ open }) => {
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
          <span id="loading-modal-description">Loading, please wait...</span>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoadingModal;
