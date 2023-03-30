import * as React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import MailAppBar from '../components/MailAppBar';
import MailNavBar from '../components/MailNavBar';
import MailBody from '../components/MailBody';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import MailDrawerNavigation from '../components/MailDrawerNavigation';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480, // custom breakpoint value
      md: 800, // custom breakpoint value
      lg: 1024, // custom breakpoint value
      xl: 1280, // custom breakpoint value
    },
  },
});

function Mainpage() {
  const [inbox, setSelectedInbox] = React.useState("inbox");
  const isSmallScreen = useMediaQuery('(max-width:800px)');
  return ( 
    <ThemeProvider theme={theme}>
      <Box sx = {{width: "100%", minHeight: '100vh', background:'repeating-radial-gradient(#EBF5FF,#FCFDFE)'}}>
        <Grid2 container>
          <Grid2  xs={0} md={2} >
            {isSmallScreen? null : <MailNavBar selectedInbox={(selectedInbox) => {setSelectedInbox(selectedInbox)}}/>}
          </Grid2>
          <Grid2 xs={12} md={10}  >
            <MailAppBar drawerNavigation={<MailNavBar selectedInbox={(selectedInbox) => {setSelectedInbox(selectedInbox)}}/>}/>
            <MailBody selectedInbox={inbox}/>
          </Grid2>
        </Grid2>
      </Box>
    </ThemeProvider>
  );
}

export default Mainpage;
