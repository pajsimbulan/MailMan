import * as React from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Experimental_CssVarsProvider, IconButton, ListItemButton, Toolbar } from '@mui/material';
import {useNavigate} from 'react-router';
import { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../App';


export default function AlignItemsList() {
  const [data, setData] = useState([]);
  const user = useContext(UserContext);
  const emailRef = useRef([]);
  const size = useRef(0);
  const [refresh, setRefresh] = useState(false);
  const [checkboxArray, setCheckBoxArray] = useState([]);
  console.log('rendering mailbody');
  useEffect(() => {
    console.log('mailbody fetching data');
    fetch('http://localhost:4000/v0/email', {
            method: 'GET',
            headers: {'Content-Type': 'application/json ', 'Authorization': ('jwt ' + user.accessToken.toString())},      
        }).then((res) => {
          return res.json();
        }).then((jsondata) => {

          size.current = jsondata.length;
          setData(jsondata);
          setCheckBoxArray(new Array(size.current).fill(false));
        }).catch((error) => {alert(error.message)}); 
      
    },[refresh]);

  return (
    <List sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}>

      
      <ListItem >
        <Toolbar position="static">
            <Checkbox edge="start"  onChange={(event) => {setCheckBoxArray(new Array(size.current).fill(event.target.checked));}}/>
            <IconButton onClick={() => {}}>
                <RefreshIcon />
            </IconButton>
            <IconButton>
                <DeleteForeverIcon />
            </IconButton>
            <IconButton>
                <StarIcon/>
            </IconButton>
            <IconButton>
                <ReportGmailerrorredIcon />
            </IconButton> 
            <IconButton>
                <DriveFileMoveIcon />
            </IconButton>
        </Toolbar>
      </ListItem>
      <Divider component="li" />


      {data.map((email, index) => (
        <ListItem 
        key = {email._id}
        ref={(el) => {
          emailRef.current[index] = el;
        }}
        secondaryAction={
          <IconButton edge="start"  aria-label="Trash"  onClick={()=>{}}>
            <DeleteForeverIcon />
          </IconButton>
        } divider>
          <ListItemButton onClick={()=> {}}>
            <IconButton>
              <Checkbox  checked={checkboxArray[index]} edge="start" disableRipple={true} onClick={() => {setCheckBoxArray(prevArray => {
                  const tempArray = [...prevArray];
                  tempArray[index] = (!prevArray[index]);
                  return tempArray;
                })}}/>
            </IconButton>
            <ListItemAvatar>
              <Avatar alt={email.from.toString().toUpperCase()} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={email.subject}
              secondary={
                  stringTruncate(email.contents)}
            />
          </ListItemButton>
         </ListItem >))
      }
    </List>
  );
}


function stringTruncate(input) {
  let maxChar = 160;
  if(input.length > maxChar) {
    return (input.substring(0,(maxChar-3)) + '...');
  } else {
    return input;
  }
}