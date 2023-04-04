import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

function AccountCreationSuccessful({ onButtonPress }) {
  return (
    <Box sx={{
      marginX: 10, mt: 5, mb: 10, display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center',
    }}
    >
      <Avatar src="approval.svg" sx={{ width: 50, height: 50 }} />

      <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>Account Created!</Typography>
      <Typography sx={{ fontSize: 13, color: '#334155' }}>Congratulations! You&apos;ve succesfully created an account.</Typography>
      <Typography sx={{ fontSize: 13 }}>Try logging in with your new account</Typography>
      <Box sx={{
        width: '100%', borderTop: 'solid', borderTopWidth: 1, borderTopColor: '#E8E8E8', my: 2,
      }}
      />
      <Button
        type="button"
        variant="outlined"
        sx={{
          borderRadius: 1, textTransform: 'none', height: 55, fontWeight: 'bold', width: '100%',
        }}
        onClick={() => { onButtonPress(); }}
      >
        Back to Sign In
      </Button>
    </Box>
  );
}

AccountCreationSuccessful.propTypes = {
  onButtonPress: PropTypes.func.isRequired,
};

export default AccountCreationSuccessful;
