import * as React from 'react';
import { Button, Avatar, Box } from '@mui/material';
import PropTypes from 'prop-types';
import ProfilePictureModal from '../components/EditProfilePictureModal';

function ProfileBlock({ avatar, update }) {
  const [edit, setEdit] = React.useState(false);
  const [avatarValue, setAvatarValue] = React.useState(avatar);
  const updateAvatar = (newAvatar) => {
    setAvatarValue(newAvatar);
    update(newAvatar);
  };
  return (
    <>
      <ProfilePictureModal
        edit={edit}
        closeModal={() => { setEdit(false); }}
        oldAvatarValue={avatarValue}
        setAvatar={(newAvatar) => { updateAvatar(newAvatar); }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar
          sx={{
            height: 150,
            width: 150,
            border: 'solid',
            borderWidth: '3px',
            borderColor: '#F1F5F9',
            mx: 'auto',
            '@media (max-width: 800px)': { height: 135, width: 135 },
            '@media (max-width: 500px)': { height: 120, width: 120 },
          }}
          src={avatarValue ? `data:image/jpeg;base64,${avatarValue}` : null}
        />
      </Box>
      <Box sx={{
        display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 10,
      }}
      >
        <Button
          variant="outlined"
          size="small"
          sx={{
            border: 'solid',
            borderRadius: 10,
            borderWidth: 2,
            textTransform: 'none',
            overflow: 'hidden',
            color: '#338feb',
            '&:hover': { borderColor: '#338feb' },
            mx: 'auto',
            '@media (max-width: 800px)': { fontSize: '12px' },
            '@media (max-width: 500px)': { fontSize: '10px' },
          }}
          onClick={() => { setEdit(true); }}
        >
          Change Profile Picture
        </Button>
      </Box>
    </>
  );
}

ProfileBlock.propTypes = {
  avatar: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};

export default ProfileBlock;
