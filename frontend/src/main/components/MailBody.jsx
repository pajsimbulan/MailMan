import * as React from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton, ListItemButton, Toolbar } from '@mui/material';
import {useNavigate} from 'react-router';
import { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../App';
import EmailPopOvers from './EmailPopOver';
import EmailContentWindow from './EmailContents';
import EmailDateFilterToggleButton from './EmailToggle';


export default function EmailBody() {
  
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const user = useContext(UserContext);
  const [email, setEmail] = useState();
  const size = useRef(0);
  const [refresh, setRefresh] = useState(false);
  const [checkboxArray, setCheckBoxArray] = useState([]);
  const [openEmailWindow, setOpenEmailWindow] = useState();
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
        }).catch((error) => {alert(error);
         // navigate("/");
        }); 
      
    },[refresh]);

  const renderOpenEmailWindow = (email) => {
    console.log("here");
    console.log(email.subject);
    setOpenEmailWindow(true);
    setEmail(email);
  }

  return (
    <Box sx = {{width: "100%", display:'flex', margin:0, borderRadius:10, alignItems:'center', justifyContent:'center'}} >
      {openEmailWindow? <EmailContentWindow closeWindow={() => {setOpenEmailWindow(false)}} email={email}/> :<Box/>}

    <List sx={{ width:'100%', maxWidth: "95%", borderRadius:10 }}>
      <ListItem sx={{display:'flex', justifyContent:'space-between'}}>
        <Toolbar position="static" sx={{bgcolor:'white', borderRadius:5, my:'auto'}}>
            <Checkbox edge="start"  onChange={(event) => {setCheckBoxArray(new Array(size.current).fill(event.target.checked));}}/>
            <EmailPopOvers item={()=> {return <RefreshIcon />}} name={"Refresh"}></EmailPopOvers>
            <EmailPopOvers item={()=> {return <DeleteForeverIcon />}} name={"Delete"}></EmailPopOvers>
            <EmailPopOvers item={()=> {return <StarIcon/>}} name={"Starred"}></EmailPopOvers>
            <EmailPopOvers item={()=> {return <ReportGmailerrorredIcon />}} name={"Spam"}></EmailPopOvers>
        </Toolbar>
        <EmailDateFilterToggleButton />
      </ListItem> 

      {data.map((email, index) => (
        <ListItem
        sx={{width:'99%',borderRadius:5, margin:1, bgcolor:'white', marginBottom:3}} 
        key = {email._id}
        secondaryAction={
          <IconButton edge="start"  aria-label="Trash"  onClick={()=>{}}>
            <DeleteForeverIcon />
          </IconButton>
        } divider>
          <ListItemButton onClick={()=> {renderOpenEmailWindow(email);}}>
            <IconButton>
              <Checkbox  checked={checkboxArray[index]} edge="start" onClick={(event) => { event.stopPropagation();
              setCheckBoxArray(prevArray => {
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
    </Box>
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