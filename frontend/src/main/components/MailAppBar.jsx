import * as React from 'react';
import { styled, alpha, useTheme  } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useNavigate} from 'react-router';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Avatar, Divider } from '@mui/material';
import { UserContext } from '../../App';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useMediaQuery } from '@mui/material';
import MailDrawerNavigation from './MailDrawerNavigation';

function MailAppBar({currentInbox, selectedInbox}) {
  const {userInfo} = React.useContext(UserContext);
  const isSmallScreen = useMediaQuery('(max-width:800px)');
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [darkMode, setDarkMode] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  console.log(`app bar render inbpx: ${currentInbox}`);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      PaperProps={{style:{
        borderRadius:10,
        border:'solid',
        borderWidth:3,
        borderColor:'#e6f6ff',
      }}}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{mx:2,mb:2,mt:1, display:'flex',flexDirection:'column',}}>
        <Box sx={{display:'flex', flexGrow:1, justifyContent:'end'}}>
          <Typography 
            sx={{color:'#0067b8', '&:hover':{ cursor:'pointer', color:'#338feb'}}}
            onClick={() => {
              handleMenuClose();
              navigate('/'); }}> Sign Out </Typography>
        </Box>
        <Box sx={{display:'flex', flexDirection:'row',mt:1 }}>
          <Avatar sx={{width: 60, height: 60, '&:hover':{ cursor:'pointer'}}} 
            alt={userInfo.name} 
            src={userInfo.avatar?`data:image/jpeg;base64,${userInfo.avatar}`:null}
            onClick={() => {
              handleMenuClose();
              navigate('/profile'); }}/>
          <Box sx={{ml:4}}>
            <Typography sx={{ fontWeight:'bold'}}>{userInfo.firstName + ' ' + userInfo.lastName}</Typography>
            <Typography>{userInfo.email}</Typography>
            <Typography 
            sx={{fontWeight:'bold', fontSize:'15px', color:'#0067b8', my:'auto', overflow:'hidden', '&:hover':{ cursor:'pointer', color:'#338feb'}}}
            onClick={() => {
              handleMenuClose();
              navigate('/profile'); }}
            >Manage Profile</Typography>
          </Box>
        </Box>
      </Box>
    </Menu>
  );


  return (
    <Box sx={{  borderBottom: 'solid', borderWidth:'1px', borderColor:'#C6CED6', borderBottomLeftRadius:40, borderWidth:5, bgcolor:'white',}}>
        <Toolbar >
          <Box sx={{flexGrow: 1, display:'flex', flexDirection:'row'}}>
            {isSmallScreen? <MailDrawerNavigation currentInbox={currentInbox} selectedInbox={selectedInbox}/> : null}
            <TextField
            size={isSmallScreen?'small':'medium'}
            sx={{ my: 1.5, ml:2,width: '80%', borderRadius:3, bgcolor:'#EBF5FF', mr:1, maxWidth:700 , fieldset:{borderWidth:0, m:0, }, input: { color: '#002159'},  "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": {
          borderRadius:3, borderColor:'#338FEB',
      }
    }  }}
            InputProps={{
              startAdornment: <InputAdornment position="start"> <SearchIcon sx={{color:'#002159'}}/> </InputAdornment>,
            }}
            />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'flex' }, gap:2}}>
          <IconButton
          size="large"
          aria-label="set light mode or dark mode"
          aria-haspopup="true"
          color="inherit"
          onClick={() => {setDarkMode(!darkMode);}}
          sx={{border:'solid', borderWidth:2, borderColor:'#EBF5FF', height:50, width:50, my:'auto'}}
        >
          {darkMode?<LightModeOutlinedIcon sx={{color:'#002159'}}/> : <DarkModeOutlinedIcon sx={{color:'#002159'}}/>}
        </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{height:50, width:50, border:'solid', borderWidth:2, borderColor:'#EBF5FF',}}
            >
              <Avatar src={userInfo.avatar?`data:image/jpeg;base64,${userInfo.avatar}`:null}/>
            </IconButton>
          </Box>
          
        </Toolbar>  
      {renderMenu}
    </Box>
  );
}

export default MailAppBar;