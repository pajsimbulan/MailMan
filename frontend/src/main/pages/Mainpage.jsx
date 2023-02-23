import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
      <Grid container >
        <GlobalContext.Provider value={{selectedIndex, setSelectedIndex}}>
        <Grid item  xs={2} >
            <EmailNavBar />
        </Grid>
        </GlobalContext.Provider>
        <Grid item xs={10} sx={{width:'100%', height:'100%'}}>
          <EmailAppBar />
          <EmailBody/>
        </Grid>
      </Grid>
      </Box>
    

  );
}

export default Mainpage;
