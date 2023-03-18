import * as React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import MailAppBar from '../components/MailAppBar';
import MailNavBar from '../components/MailNavBar';
import MailBody from '../components/MailBody';

export const GlobalContext = React.createContext();
function Mainpage() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  console.log("Mainpage rendering");
  return ( 
    <Box sx = {{width: "100%", minHeight: '100vh', background:'repeating-radial-gradient(#EBF5FF,#FCFDFE)'}}>
      <Grid2 container>
        <GlobalContext.Provider value={{selectedIndex, setSelectedIndex}}>
        <Grid2  xs={2} >
            <MailNavBar />
        </Grid2>
        </GlobalContext.Provider>
        <Grid2 xs={10} >
          <MailAppBar />
          <MailBody/>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Mainpage;
