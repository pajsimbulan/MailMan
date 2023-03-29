import * as React from 'react';
import { Button, Avatar, Box } from '@mui/material';
import ProfilePictureModal from '../components/EditProfilePictureModal';
function ProfileBlock ({avatar, update}) {
    const [edit,setEdit] = React.useState(false);
    const [avatarValue, setAvatarValue] = React.useState(avatar);
    const  updateAvatar = (newAvatar) => {
        setAvatarValue(newAvatar);
        update(newAvatar);
    };
    return (
        <>
            <ProfilePictureModal edit={edit} closeModal={() => {setEdit(false);} } oldAvatarValue={avatarValue} setAvatar={(newAvatar) =>{updateAvatar(newAvatar)} }/>
            <Box sx={{display:'flex', justifyContent:'center'}}> 
                <Avatar sx={{height:150, width:150, border:'solid', borderWidth:'3px', borderColor:'colors.color2'}} src={avatarValue?`data:image/jpeg;base64,${avatarValue}`:null} />
            </Box>
            <Box sx={{display:'flex', justifyContent:'center', marginTop:2, marginBottom:10}}> 
                <Button variant="outlined" size="small" 
                sx={{border:'solid', borderRadius:10, borderWidth:2,textTransform: 'none',overflow:'hidden', color:'#338feb', '&:hover':{ borderColor:'#338feb'}}}
               
                onClick={() => {setEdit(true);}}> Change Profile Picture</Button>
            </Box>
        </>
    );
}

export default ProfileBlock;