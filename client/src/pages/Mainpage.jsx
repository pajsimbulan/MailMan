import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EmailAppBar from '../components/MailAppBar';
import EmailNavBar from '../components/MailNavBar';
import EmailBody from '../components/MailBody';


export const GlobalContext = React.createContext();
function Mainpage() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  console.log("Mainpage rendering");
  return (
      <Grid container spacing={2}>
        <GlobalContext.Provider value={{selectedIndex, setSelectedIndex}}>
        <Grid item xs={2} >
          <Paper elevation={8} square={false}>
            <EmailNavBar sx={{height:"full"}} />
          </Paper>
        </Grid>
        </GlobalContext.Provider>
        <Grid item xs={10}>
          <EmailAppBar />
          <Paper elevation={8}>
            <EmailBody/>
          </Paper>
        </Grid>
      </Grid>

  );
}

export default Mainpage;
