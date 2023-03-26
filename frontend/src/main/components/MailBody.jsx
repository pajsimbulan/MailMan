import * as React from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Toolbar } from '@mui/material';
import {useNavigate} from 'react-router';
import { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../App';
import EmailPopOvers from './EmailPopOver';
import EmailDateFilterToggleButton from './EmailToggle';
import MailPagination from './MailPagination';
import EmailBlock from '../blocks/MailBodyEmailBlock';
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
const data3={"_id":"63ba603e72a3c87194d85501",
"from":"zaheer@avatar.com",
"to":"aang@avatar.com",
"subject":"I'm the real avatar!",
"contents":"Dear Aang, Im the real avatar and\n you arent.",
"createdAt":Date.now(),
"__v":{"$numberInt":"0"}};
const tempDatas= [data3,data1,data2,data1,data2,data1,data2,data1,data2,data1,data2,data1,data2,data1,data2];
const EmailPopOversStyle={color:'grey', height:20, width:20};

function MailBody({selectedInbox}) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const user = useContext(UserContext);
  const size = useRef(0);
  const [refresh, setRefresh] = useState(false);
  const [checkboxArray, setCheckBoxArray] = useState([]);
  const [openEmail, setOpenEmail] = React.useState(false);
  const [openedEmail, setOpenedEmail] = React.useState(undefined);
  const [dateFilter, setDateFilter] = useState('today');
  const [selected, setSelected] = useState([]);

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
      <ListItem sx={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>
        <Box sx={{ my:'auto',bgcolor:'#dceaf7', borderRadius:10, p:0.5}}>
            <Checkbox edge="start"  sx={{color:'grey',transform: "scale(0.8)", ml:0.5}} onChange={(event) => {
              setCheckBoxArray(new Array(size.current).fill(event.target.checked));
              setSelected(selected => { selected.push(1);console.log(selected); return selected;});
              }}/>
            <EmailPopOvers item={()=> {return <RefreshIcon sx={EmailPopOversStyle}/>}} name={"Refresh"}></EmailPopOvers>
            {selected.length > 0 ?  <>
              <EmailPopOvers item={()=> {return <DeleteForeverIcon sx={EmailPopOversStyle}/>}} name={"Delete"}></EmailPopOvers>
              <EmailPopOvers item={()=> {return <StarIcon sx={EmailPopOversStyle}/>}} name={"Starred"}></EmailPopOvers>
              <EmailPopOvers item={()=> {return <ReportGmailerrorredIcon sx={EmailPopOversStyle}/>}} name={"Spam"}></EmailPopOvers>
            </>
            : null}
        </Box>
        <MailPagination range={50} totalCount={11}/>
        <EmailDateFilterToggleButton setFilter={(filter) => {setDateFilter(filter)}}/>
      </ListItem> 
      {renderEmails}
    </List>
    </Box>
  );
}

export default MailBody;