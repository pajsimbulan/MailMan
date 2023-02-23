import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import EmailAppBar from '../components/MailAppBar';
import EmailNavBar from '../components/MailNavBar';
import EmailBody from '../components/MailBody';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    colors: {
      bg:'#FBFBFB',
      color2:'#F1F5F9',
      text: '#334155',
      button: '#0F172A',
    }
  },
});



export const GlobalContext = React.createContext();
function Mainpage() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  console.log("Mainpage rendering");
  return ( 
    <Box sx = {{width: "100%", minHeight: '100vh', background:'repeating-radial-gradient(#EBF5FF,#FCFDFE)'}}>
      <Grid2 container>
        <GlobalContext.Provider value={{selectedIndex, setSelectedIndex}}>
        <Grid2  xs={2} >
            <EmailNavBar />
        </Grid2>
        </GlobalContext.Provider>
        <Grid2 xs={10} >
          <EmailAppBar />
          <EmailBody/>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Mainpage;
