import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@mui/material/Divider';
import PrimarySearchAppBar from './components/AppBar';
import SelectedListItem from './components/NavBar';
import AlignItemsList from './components/MailBody.jsx';
import {useNavigate} from 'react-router';

function Mainpage() {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
       <Grid item xs={12}>
        <PrimarySearchAppBar />
       </Grid>
       <Grid item sm={2}>
        <Paper elevation={8} square={false}>
          <SelectedListItem />
        </Paper>
       </Grid>
       <Divider orientation="vertical" flexItem />
       <Grid item xs={12} sm={9}>
        <Paper elevation={8}>
          <AlignItemsList />
        </Paper>
        
      </Grid>
    </Grid>
  );
}

export default Mainpage;
