import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PrimarySearchAppBar from './components/AppBar';
import SelectedListItem from './components/NavBar';
import AlignItemsList from './components/MailBody.jsx';


export const GlobalContext = React.createContext();
function Mainpage() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  console.log("Mainpage rendering");
  return (
      <Grid container spacing={2}>
        <GlobalContext.Provider value={{selectedIndex, setSelectedIndex}}>
        <Grid item xs={2} >
          <Paper elevation={8} square={false}>
            <SelectedListItem sx={{height:"full"}} />
          </Paper>
        </Grid>
        </GlobalContext.Provider>
        <Grid item xs={10}>
          <PrimarySearchAppBar />
          <Paper elevation={8}>
            <AlignItemsList/>
          </Paper>
        </Grid>
      </Grid>

  );
}

export default Mainpage;
