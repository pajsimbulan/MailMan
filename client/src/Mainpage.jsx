import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@mui/material/Divider';
import PrimarySearchAppBar from './components/AppBar';
import SelectedListItem from './components/NavBar';
import AlignItemsList from './components/MailBody.jsx';
import {useNavigate} from 'react-router';
import ComposeEmail from './components/ComposeEmail';
export const GlobalContext = React.createContext();
function Mainpage() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  let temp = "asd";
  console.log("Mainpage rendering");
  return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PrimarySearchAppBar />
        </Grid>
        <GlobalContext.Provider value={{selectedIndex, setSelectedIndex}}>
        <Grid item xs={2} >
          <Paper elevation={8} square={false}>
            <SelectedListItem />
          </Paper>
        </Grid>
        </GlobalContext.Provider>
        <Grid item xs={10} >
          <Paper elevation={8}>
            <AlignItemsList value={{temp}}/>
          </Paper>
        </Grid>
      </Grid>

  );
}

export default Mainpage;
