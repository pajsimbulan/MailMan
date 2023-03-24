import * as React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import MailAppBar from '../components/MailAppBar';
import MailNavBar from '../components/MailNavBar';
import MailBody from '../components/MailBody';

function Mainpage() {
  const [inbox, setSelectedInbox] = React.useState("inbox");
  return ( 
    <Box sx = {{width: "100%", minHeight: '100vh', background:'repeating-radial-gradient(#EBF5FF,#FCFDFE)'}}>
      <Grid2 container>
        <Grid2  xs={2} >
            <MailNavBar selectedInbox={(selectedInbox) => {setSelectedInbox(selectedInbox)}}/>
        </Grid2>
        <Grid2 xs={10} >
          <MailAppBar />
          <MailBody selectedInbox={inbox}/>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Mainpage;
