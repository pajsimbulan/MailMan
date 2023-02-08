import * as React from 'react';
import { Grid, Avatar} from '@mui/material';


function Profile() {

    return (
    <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}><Avatar src= "../public/logo192.png" sx={{ m: 1, bgcolor: 'secondary.main' }} /></Grid>
    </Grid>);
}

export default Profile;