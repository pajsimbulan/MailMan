import * as React from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
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
import EmailDateFilterToggleButton from './EmailToggle';
import MailPagination from './MailPagination';
import EmailBlock from './MailBodyEmailBlock';
import EmailContentWindow from './EmailContents';

const data1={"_id":"63ba4964742a1ea687c54c43",
"from":"zaheer@avatar.com",
"to":"aang@avatar.com",
"subject":"I'm the real avatar!",
"contents":"Dear Aang, Im the real avatar and\n ","createdAt":'2023-01-08T04:41:08.635+00:00',
"__v":{"$numberInt":"0"}};
const data2={"_id":"63ba603e72a3c87194d8550f",
"from":"zaheer@avatar.com",
"to":"aang@avatar.com",
"subject":"I'm the real avatar!",
"contents":"Dear Aang, Im the real avatar and\n you arent.",
"createdAt":'2023-01-08T04:41:08.635+00:00',
"__v":{"$numberInt":"0"}};
const tempDatas= [data1,data2,data1,data2,data1,data2,data1,data2,data1,data2,data1,data2,data1,data2];


function EmailBody() {  
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const user = useContext(UserContext);
  const size = useRef(0);
  const [refresh, setRefresh] = useState(false);
  const [checkboxArray, setCheckBoxArray] = useState([]);
  const [openEmail, setOpenEmail] = React.useState(false);
  const [openedEmail, setOpenedEmail] = React.useState(undefined);

  const renderEmails = React.useMemo(() => {
    return (tempDatas.map((email) => (
      <ListItem
      sx={{width:'100%'}} 
      key = {email._id}
       >  
        <EmailBlock email={email} selected={(email) => {
          setOpenEmail(true);
          setOpenedEmail(email);
          }}/>
       </ListItem >)))
  },[data])


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

  return (
    <Box sx = {{width: "100%", maxHeight:'100%', display:'flex', margin:0, borderRadius:10, alignItems:'center', justifyContent:'center', overflow:'scroll'}} >
       {openEmail? <EmailContentWindow closeEmail={() => {setOpenEmail(false)}} email={openedEmail}/> : null}
    <List sx={{ width:'100%', maxWidth: "95%", borderRadius:10, bgcolor:'#edf4fb', mt:2, px:2}}>
      <ListItem sx={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between',gap:2}}>
        <Toolbar position="static" sx={{ my:'auto',bgcolor:'#dceaf7', borderRadius:5}}>
            <Checkbox edge="start"  sx={{color:'grey'}} onChange={(event) => {setCheckBoxArray(new Array(size.current).fill(event.target.checked));}}/>
            <EmailPopOvers item={()=> {return <RefreshIcon sx={{color:'grey'}}/>}} name={"Refresh"}></EmailPopOvers>
            <EmailPopOvers item={()=> {return <DeleteForeverIcon sx={{color:'grey'}}/>}} name={"Delete"}></EmailPopOvers>
            <EmailPopOvers item={()=> {return <StarIcon sx={{color:'grey'}}/>}} name={"Starred"}></EmailPopOvers>
            <EmailPopOvers item={()=> {return <ReportGmailerrorredIcon sx={{color:'grey'}}/>}} name={"Spam"}></EmailPopOvers>
        </Toolbar>
        <MailPagination range={50} totalCount={11}/>
        <EmailDateFilterToggleButton />
      </ListItem> 
      {renderEmails}
    </List>
    </Box>
  );
}

export default EmailBody;